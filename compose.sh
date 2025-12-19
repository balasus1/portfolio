#!/bin/bash

# Docker Compose wrapper script
# Simplifies switching between local and production modes
#
# Usage:
#   ./compose.sh local up -d      # Build and start locally
#   ./compose.sh prod up -d       # Pull from registry and start
#   ./compose.sh local down       # Stop local
#   ./compose.sh prod logs -f     # View production logs

set -e

MODE=${1:-local}
shift

# Store all remaining arguments as an array
COMMAND_ARGS=("$@")

# Default command if none provided
if [ ${#COMMAND_ARGS[@]} -eq 0 ]; then
    COMMAND_ARGS=("up" "-d")
fi

# Detect Docker Compose command (V1: docker-compose or V2: docker compose)
if command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
elif docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
else
    echo "❌ Error: Docker Compose not found!"
    echo "Please install Docker Compose (V1: docker-compose or V2: docker compose plugin)"
    exit 1
fi

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

case "$MODE" in
    local|dev|development)
        echo -e "${BLUE}🏗️  Local mode: Building from source${NC}"
        export DEPLOY_MODE=local
        export IMAGE_NAME=portfolio:latest
        
        # Check if first argument is "up"
        if [ "${COMMAND_ARGS[0]}" = "up" ]; then
            # For "up" command, add --build flag before the rest of the arguments
            $COMPOSE_CMD up --build "${COMMAND_ARGS[@]:1}"
        else
            # For other commands, pass all arguments as-is
            $COMPOSE_CMD "${COMMAND_ARGS[@]}"
        fi
        ;;
    
    prod|production)
        echo -e "${GREEN}🚀 Production mode: Using registry image${NC}"
        
        # Check if IMAGE_NAME is set
        if [ -z "$IMAGE_NAME" ]; then
            if [ -f .env.prod ]; then
                echo -e "${YELLOW}📋 Loading .env.prod${NC}"
                export $(cat .env.prod | grep -v '^#' | xargs)
            else
                echo -e "${YELLOW}⚠️  IMAGE_NAME not set. Using default or .env file${NC}"
            fi
        fi
        
        # Use production override file
        # Handle --env-file: V2 supports it, but check if file exists
        if [ -f .env.prod ]; then
            $COMPOSE_CMD -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod "${COMMAND_ARGS[@]}"
        else
            $COMPOSE_CMD -f docker-compose.yml -f docker-compose.prod.yml "${COMMAND_ARGS[@]}"
        fi
        ;;
    
    help|--help|-h)
        echo "Docker Compose Mode Switcher"
        echo ""
        echo "Usage:"
        echo "  ./compose.sh <mode> <command>"
        echo ""
        echo "Modes:"
        echo "  local, dev     - Build from source (default)"
        echo "  prod, production - Pull from registry"
        echo ""
        echo "Commands:"
        echo "  up -d          - Start containers in detached mode"
        echo "  down           - Stop and remove containers"
        echo "  logs -f        - Follow logs"
        echo "  ps             - List containers"
        echo "  restart        - Restart containers"
        echo "  pull           - Pull latest images (prod only)"
        echo ""
        echo "Examples:"
        echo "  ./compose.sh local up -d"
        echo "  ./compose.sh prod up -d"
        echo "  ./compose.sh prod pull"
        echo "  ./compose.sh local logs -f"
        echo "  ./compose.sh prod down"
        echo ""
        echo "Detected Docker Compose: $COMPOSE_CMD"
        exit 0
        ;;
    
    *)
        echo "Unknown mode: $MODE"
        echo "Use: local, prod, or help"
        exit 1
        ;;
esac

