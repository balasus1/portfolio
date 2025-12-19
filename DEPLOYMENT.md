# Portfolio Deployment Guide

This guide explains how to build, deploy, and run the portfolio application using Docker and Docker Compose on both local and VPS environments.

## 🎯 Deployment Strategy

**Modern Approach (Recommended):** Use Docker Registry (no Git repo on VPS)
- Build image in GitHub Actions or locally
- Push to GitHub Container Registry (ghcr.io) or Docker Hub
- VPS pulls image and runs docker-compose
- **VPS only needs:** `docker-compose.yml` + `nginx.conf` (see [VPS_SETUP.md](./VPS_SETUP.md))

**Traditional Approach:** Build on VPS from source code
- Clone repo on VPS
- Build image on VPS
- Run docker-compose

## 🏗️ Architecture

- **Frontend**: React + Vite + TypeScript
- **Web Server**: Nginx (serving static files)
- **Containerization**: Docker + Docker Compose
- **Registry**: GitHub Container Registry (ghcr.io) or Docker Hub
- **VPS**: Ubuntu Server (balashan.dev / 148.113.44.73)

## 📋 Prerequisites

### Local Development
- Docker Desktop (or Docker Engine + Docker Compose)
- Git

### VPS Requirements
- Ubuntu Server (20.04+)
- Docker installed
- Docker Compose installed
- SSH access to VPS
- Domain name configured (optional, but recommended)

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd myPortfolio
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application**
   - Open http://localhost in your browser

4. **View logs**
   ```bash
   docker-compose logs -f portfolio
   ```

5. **Stop the application**
   ```bash
   docker-compose down
   ```

### Option 2: Deploy to VPS (Registry-based, Recommended)

**👉 For detailed VPS setup without Git repository, see [VPS_SETUP.md](./VPS_SETUP.md)**

#### Quick Setup

1. **SSH into your VPS**
   ```bash
   ssh ubuntu@148.113.44.73
   # or
   ssh balashan.dev
   ```

2. **Create project directory**
   ```bash
   mkdir -p ~/portfolio
   cd ~/portfolio
   ```

3. **Transfer only config files** (no source code needed!)
   ```bash
   # From local machine:
   scp docker-compose.yml nginx.conf ubuntu@148.113.44.73:~/portfolio/
   ```

4. **Login to Docker Registry** (if using private images)
   ```bash
   # For GitHub Container Registry:
   echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_USERNAME --password-stdin
   
   # OR for Docker Hub:
   docker login
   ```

5. **Update docker-compose.yml** with your image name:
   ```yaml
   image: ghcr.io/yourusername/myportfolio:latest
   ```

6. **Pull and run**
   ```bash
   docker pull ghcr.io/yourusername/myportfolio:latest
   docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest
   docker-compose up -d
   ```

7. **Verify deployment**
   ```bash
   docker-compose ps
   curl http://localhost/health
   ```

**That's it! No Git clone needed on VPS!** 🎉

#### Configure Firewall (if needed)

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

#### Configure Domain (Optional)

If you have a domain name (e.g., balashan.dev):

1. **Update DNS records**
   - Add A record: `@` → `148.113.44.73`
   - Add A record: `www` → `148.113.44.73`

2. **Update nginx.conf** (if domain name differs)
   ```nginx
   server_name balashan.dev www.balashan.dev;
   ```

3. **Restart container**
   ```bash
   docker-compose restart portfolio
   ```

## 🔄 Updating the Application

### Manual Update Process

**Registry-based (Recommended - No Git needed on VPS):**

1. **Pull latest image and restart**
   ```bash
   cd ~/portfolio
   docker pull ghcr.io/yourusername/myportfolio:latest
   docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest
   docker-compose down
   docker-compose up -d
   ```

2. **Verify**
   ```bash
   docker-compose logs -f portfolio
   ```

**Alternative (If building on VPS from source):**

1. **Pull latest changes**
   ```bash
   cd ~/portfolio
   git pull origin main
   ```

2. **Rebuild and restart**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Using Deployment Script

1. **From local machine**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh remote
   ```

   This script will:
   - Build the Docker image locally
   - Transfer files to VPS
   - Deploy on VPS automatically

## 🤖 Automated Deployment with GitHub Actions

### Setup GitHub Secrets

1. Go to your GitHub repository → Settings → Secrets and variables → Actions

2. Add the following secrets:
   - `VPS_HOST`: `148.113.44.73` (or `balashan.dev`)
   - `VPS_USER`: `ubuntu`
   - `VPS_SSH_KEY`: Your private SSH key (content of `~/.ssh/id_rsa`)

### How to Generate SSH Key (if needed)

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy public key to VPS
ssh-copy-id ubuntu@148.113.44.73

# Copy private key content to GitHub Secrets
cat ~/.ssh/id_rsa  # Copy this entire content to VPS_SSH_KEY secret
```

### Enable GitHub Actions

1. Push to `main` branch
2. GitHub Actions will automatically:
   - Build the Docker image
   - Deploy to VPS
   - Restart the container

3. View deployment status in GitHub → Actions tab

## 📊 Monitoring & Maintenance

### View Logs

```bash
# Real-time logs
docker-compose logs -f portfolio

# Last 100 lines
docker-compose logs --tail=100 portfolio

# Logs from specific time
docker-compose logs --since 30m portfolio
```

### Check Container Status

```bash
# List running containers
docker-compose ps

# Container resource usage
docker stats portfolio-app

# Container health
docker-compose ps
# Look for "healthy" status in HEALTH column
```

### Restart Container

```bash
# Restart without rebuilding
docker-compose restart portfolio

# Rebuild and restart
docker-compose up -d --build portfolio
```

### Stop/Start Container

```bash
# Stop
docker-compose stop portfolio

# Start
docker-compose start portfolio

# Stop and remove
docker-compose down
```

## 🔧 Troubleshooting

### Container won't start

1. **Check logs**
   ```bash
   docker-compose logs portfolio
   ```

2. **Check if port 80 is available**
   ```bash
   sudo netstat -tulpn | grep :80
   # If another service is using it, stop it or change port in docker-compose.yml
   ```

3. **Rebuild from scratch**
   ```bash
   docker-compose down -v
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Application not accessible

1. **Check firewall**
   ```bash
   sudo ufw status
   ```

2. **Check container is running**
   ```bash
   docker-compose ps
   ```

3. **Test locally on VPS**
   ```bash
   curl http://localhost/health
   ```

4. **Check nginx configuration**
   ```bash
   docker-compose exec portfolio nginx -t
   ```

### Build fails

1. **Clear Docker cache**
   ```bash
   docker system prune -a
   ```

2. **Check Dockerfile syntax**
   ```bash
   docker build -t test .
   ```

3. **Check for memory issues**
   ```bash
   docker stats
   ```

## 🛡️ Security Best Practices

1. **Keep Docker updated**
   ```bash
   sudo apt update
   sudo apt upgrade docker.io docker-compose
   ```

2. **Use HTTPS** (recommended)
   - Set up Let's Encrypt with Certbot
   - Configure SSL certificates in nginx

3. **Regular backups**
   ```bash
   # Backup docker-compose.yml and nginx.conf
   cp docker-compose.yml docker-compose.yml.backup
   cp nginx.conf nginx.conf.backup
   ```

4. **Monitor resource usage**
   ```bash
   docker stats portfolio-app
   ```

5. **Keep dependencies updated**
   ```bash
   npm audit fix
   docker-compose build --no-cache
   ```

## 📝 Environment Variables

If you need environment variables:

1. Create `.env` file:
   ```bash
   touch .env
   ```

2. Add variables:
   ```env
   NODE_ENV=production
   API_URL=https://api.example.com
   ```

3. Update `docker-compose.yml`:
   ```yaml
   services:
     portfolio:
       env_file:
         - .env
   ```

## 🔄 Docker Compose as Process Manager

Docker Compose acts as your process manager (like PM2):

- **Automatic restarts**: `restart: unless-stopped` ensures container restarts if it crashes
- **Health checks**: Monitors container health and restarts if unhealthy
- **Resource limits**: Prevents container from consuming too many resources
- **Logging**: Centralized logging via Docker

### Restart Policies

- `unless-stopped`: Always restart unless manually stopped (recommended)
- `always`: Always restart, even if manually stopped
- `on-failure`: Restart only on failure
- `no`: Never restart automatically

## 📚 Useful Commands Reference

```bash
# Build and start
docker-compose up -d --build

# Stop
docker-compose down

# View logs
docker-compose logs -f portfolio

# Execute command in container
docker-compose exec portfolio sh

# Scale (if needed in future)
docker-compose up -d --scale portfolio=2

# Clean up unused images
docker image prune -af

# System cleanup
docker system prune -a --volumes

# Update application
git pull && docker-compose up -d --build

# Health check
curl http://localhost/health
```

## 🌐 Access Points

- **Local**: http://localhost
- **VPS IP**: http://148.113.44.73
- **Domain**: http://balashan.dev (if configured)
- **Health Check**: http://localhost/health

## 📞 Support

If you encounter issues:

1. Check logs: `docker-compose logs portfolio`
2. Verify container status: `docker-compose ps`
3. Test health endpoint: `curl http://localhost/health`
4. Review this documentation

---

**Note**: The container will automatically restart if it crashes, similar to PM2. Docker Compose manages the lifecycle of your application.

