#!/bin/bash

# Enhanced Deployment Script for Portfolio
# Usage: ./deploy.sh [local|remote|vps]

set -e

DEPLOY_MODE=${1:-local}
VPS_HOST="148.113.44.73"
VPS_USER="ubuntu"
PROJECT_DIR="portfolio"
COLOR_RESET='\033[0m'
COLOR_GREEN='\033[0;32m'
COLOR_YELLOW='\033[1;33m'
COLOR_BLUE='\033[0;34m'
COLOR_RED='\033[0;31m'

# Helper functions
info() {
    echo -e "${COLOR_BLUE}ℹ${COLOR_RESET} $1"
}

success() {
    echo -e "${COLOR_GREEN}✅${COLOR_RESET} $1"
}

warning() {
    echo -e "${COLOR_YELLOW}⚠️${COLOR_RESET} $1"
}

error() {
    echo -e "${COLOR_RED}❌${COLOR_RESET} $1"
}

title() {
    echo -e "\n${COLOR_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLOR_RESET}"
    echo -e "${COLOR_BLUE}  $1${COLOR_RESET}"
    echo -e "${COLOR_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${COLOR_RESET}\n"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        error "Docker is not running. Please start Docker first."
        exit 1
    fi
    success "Docker is running"
}

# Local deployment
deploy_local() {
    title "Local Deployment"
    check_docker
    
    info "Stopping existing containers..."
    docker-compose down || true
    
    info "Building Docker image..."
    docker-compose build --no-cache
    
    info "Starting containers..."
    docker-compose up -d
    
    info "Waiting for services to be healthy..."
    sleep 5
    
    # Check health
    if curl -f http://localhost/health > /dev/null 2>&1; then
        success "Local deployment completed!"
        info "Portfolio is running at http://localhost"
    else
        warning "Container started but health check failed. Check logs with: docker-compose logs portfolio"
    fi
    
    echo ""
    docker-compose ps
}

# Remote deployment via SSH (using registry)
deploy_remote() {
    title "Remote Deployment to VPS (Registry-based)"
    check_docker
    
    # Check if GITHUB_REPOSITORY is set or ask for image name
    if [ -z "$IMAGE_NAME" ]; then
        if [ -n "$GITHUB_REPOSITORY" ]; then
            IMAGE_NAME="ghcr.io/$GITHUB_REPOSITORY:latest"
        else
            warning "IMAGE_NAME not set. Please set it:"
            echo "  export IMAGE_NAME=ghcr.io/username/repo:latest"
            echo "  OR"
            echo "  export IMAGE_NAME=username/portfolio:latest  (for Docker Hub)"
            read -p "Enter image name (e.g., ghcr.io/username/repo:latest): " IMAGE_NAME
        fi
    fi
    
    info "Using image: $IMAGE_NAME"
    
    info "Building Docker image locally..."
    docker build -t portfolio:latest .
    
    # Option 1: Push to registry (recommended)
    info "Pushing image to registry..."
    docker tag portfolio:latest "$IMAGE_NAME"
    
    # Determine registry
    if [[ "$IMAGE_NAME" == ghcr.io/* ]]; then
        warning "For GitHub Container Registry, you need to:"
        warning "  1. Create a Personal Access Token (PAT) with 'write:packages' permission"
        warning "  2. Login: echo \$GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
        read -p "Push to registry now? (y/n): " PUSH_NOW
        if [[ "$PUSH_NOW" == "y" ]]; then
            docker push "$IMAGE_NAME" || {
                error "Failed to push. Make sure you're logged in to the registry."
                exit 1
            }
            success "Image pushed to registry"
        else
            warning "Skipping push. Using image save/load method instead..."
            DEPLOY_METHOD="save"
        fi
    elif [[ "$IMAGE_NAME" == docker.io/* ]] || [[ ! "$IMAGE_NAME" == */* ]]; then
        # Docker Hub
        docker push "$IMAGE_NAME" || {
            error "Failed to push to Docker Hub. Make sure you're logged in: docker login"
            exit 1
        }
        success "Image pushed to Docker Hub"
        DEPLOY_METHOD="registry"
    else
        DEPLOY_METHOD="save"
    fi
    
    info "Checking SSH connection..."
    if ! ssh -o ConnectTimeout=5 -o BatchMode=yes $VPS_USER@$VPS_HOST echo "Connection successful" > /dev/null 2>&1; then
        error "Cannot connect to VPS. Please check:"
        error "  1. SSH key is set up correctly"
        error "  2. VPS is accessible: ssh $VPS_USER@$VPS_HOST"
        exit 1
    fi
    success "SSH connection verified"
    
    info "Transferring configuration files to VPS..."
    scp docker-compose.yml nginx.conf \
        $VPS_USER@$VPS_HOST:/tmp/ || {
        error "Failed to transfer files"
        exit 1
    }
    
    if [[ "$DEPLOY_METHOD" == "save" ]]; then
        # Fallback: Save and transfer image
        info "Saving Docker image (fallback method)..."
        docker save portfolio:latest | gzip > /tmp/portfolio-$(date +%Y%m%d-%H%M%S).tar.gz
        IMAGE_FILE=$(ls -t /tmp/portfolio-*.tar.gz | head -1)
        
        info "Transferring image to VPS..."
        scp "$IMAGE_FILE" $VPS_USER@$VPS_HOST:/tmp/
        
        DEPLOY_SCRIPT=$(cat <<ENDSSH
            cd ~/$PROJECT_DIR
            cp /tmp/docker-compose.yml /tmp/nginx.conf ./
            docker load < /tmp/portfolio-*.tar.gz
            docker tag portfolio:latest portfolio:latest
            docker-compose down || true
            docker-compose up -d
            docker image prune -af --filter "until=168h" || true
            rm -f /tmp/portfolio-*.tar.gz
ENDSSH
        )
        rm -f "$IMAGE_FILE"
    else
        # Registry method
        DEPLOY_SCRIPT=$(cat <<ENDSSH
            cd ~/$PROJECT_DIR
            cp /tmp/docker-compose.yml /tmp/nginx.conf ./
            
            # Pull latest image from registry
            docker pull $IMAGE_NAME || {
                echo "⚠️ Failed to pull from registry. Using existing image if available."
            }
            
            # Tag for docker-compose
            docker tag $IMAGE_NAME portfolio:latest || true
            
            # Stop and start container
            docker-compose down || true
            docker-compose up -d
            
            # Cleanup
            docker image prune -af --filter "until=168h" || true
ENDSSH
        )
    fi
    
    info "Deploying on VPS..."
    ssh $VPS_USER@$VPS_HOST <<ENDSSH
        set -e
        echo "📁 Setting up project directory..."
        mkdir -p ~/$PROJECT_DIR
        mkdir -p ~/$PROJECT_DIR/logs
        
        $DEPLOY_SCRIPT
        
        echo "⏳ Waiting for container to be healthy..."
        sleep 10
        
        echo "✅ Deployment complete!"
        echo ""
        echo "📊 Container status:"
        docker-compose ps
        echo ""
        echo "📝 Recent logs:"
        docker-compose logs --tail=20 portfolio
ENDSSH
    
    success "Remote deployment completed!"
    info "Portfolio should be accessible at http://$VPS_HOST"
}

# Direct VPS deployment (when running from VPS)
deploy_vps() {
    title "VPS Deployment"
    
    info "Checking if running on VPS..."
    if [ ! -f "docker-compose.yml" ]; then
        error "docker-compose.yml not found. Are you in the project directory?"
        exit 1
    fi
    
    info "Pulling latest code..."
    git pull || warning "Could not pull from git. Continuing with current files..."
    
    info "Stopping existing containers..."
    docker-compose down || true
    
    info "Building new image..."
    docker-compose build --no-cache
    
    info "Starting containers..."
    docker-compose up -d
    
    info "Waiting for services..."
    sleep 10
    
    # Check health
    if curl -f http://localhost/health > /dev/null 2>&1; then
        success "VPS deployment completed!"
    else
        warning "Container started but health check failed. Check logs."
    fi
    
    echo ""
    docker-compose ps
    echo ""
    info "View logs: docker-compose logs -f portfolio"
}

# Main execution
case "$DEPLOY_MODE" in
    local)
        deploy_local
        ;;
    remote)
        deploy_remote
        ;;
    vps)
        deploy_vps
        ;;
    *)
        error "Invalid mode: $DEPLOY_MODE"
        echo ""
        echo "Usage: ./deploy.sh [local|remote|vps]"
        echo ""
        echo "  local   - Deploy locally using Docker Compose"
        echo "  remote  - Deploy to VPS from local machine"
        echo "  vps     - Deploy directly on VPS (run this on VPS)"
        exit 1
        ;;
esac
