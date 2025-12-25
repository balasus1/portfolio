# Docker Commands Reference for Portfolio Deployment

Quick reference guide for managing your portfolio application on VPS using Docker.

## 📍 Basic Navigation

```bash
# Navigate to portfolio directory
cd ~/portfolio
```

## 🔍 Check Status

### Container Status

```bash
# List all running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Check specific container status
docker ps | grep portfolio

# Detailed container information
docker inspect portfolio-app

# Check container resource usage
docker stats portfolio-app

# Check container health
docker inspect portfolio-app | grep -A 10 Health
```

### Docker Compose Status

```bash
# Check status of all services
docker compose ps

# Check status with details
docker compose ps -a
```

## 📝 View Logs

### Container Logs

```bash
# View real-time logs (follow)
docker logs -f portfolio-app

# View last 100 lines of logs
docker logs --tail=100 portfolio-app

# View logs from specific time
docker logs --since 30m portfolio-app
docker logs --since 2h portfolio-app
docker logs --since 2024-01-01T10:00:00 portfolio-app

# View logs with timestamps
docker logs -t portfolio-app

# View last 50 lines with timestamps
docker logs -t --tail=50 portfolio-app
```

### Docker Compose Logs

```bash
# View logs for all services
docker compose logs

# View real-time logs (follow)
docker compose logs -f

# View logs for specific service
docker compose logs portfolio

# View last 100 lines
docker compose logs --tail=100 portfolio

# View logs from specific time
docker compose logs --since 30m portfolio

# View logs with timestamps
docker compose logs -t portfolio
```

## 🚀 Start/Stop/Restart

### Start

```bash
# Start container (if stopped)
docker start portfolio-app

# Start using docker compose
docker compose up -d

# Start and rebuild
docker compose up -d --build
```

### Stop

```bash
# Stop container (graceful shutdown)
docker stop portfolio-app

# Stop using docker compose
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down -v
```

### Restart

```bash
# Restart container
docker restart portfolio-app

# Restart using docker compose
docker compose restart

# Restart specific service
docker compose restart portfolio
```

## 🔄 Update/Deploy

```bash
# Pull latest image
docker pull ghcr.io/balasus1/portfolio:latest

# Stop old container
docker compose down

# Start with new image
docker compose up -d

# Or in one command
docker pull ghcr.io/balasus1/portfolio:latest && docker compose down && docker compose up -d
```

## 🗑️ Remove/Clean

### Remove Containers

```bash
# Remove stopped container
docker rm portfolio-app

# Force remove running container
docker rm -f portfolio-app

# Remove all stopped containers
docker container prune -f

# Remove all containers (stopped and running)
docker rm -f $(docker ps -aq)
```

### Remove Images

```bash
# List images
docker images

# Remove specific image
docker rmi ghcr.io/balasus1/portfolio:latest

# Remove unused images
docker image prune -f

# Remove all unused images (including tagged)
docker image prune -a -f
```

### Clean Everything

```bash
# Clean up system (containers, networks, images, build cache)
docker system prune -a -f

# Clean up including volumes (⚠️ careful!)
docker system prune -a -f --volumes

# Clean up old images (older than 168 hours / 7 days)
docker image prune -af --filter "until=168h"
```

## 🔧 Execute Commands in Container

```bash
# Execute command in running container
docker exec portfolio-app <command>

# Open interactive shell (bash)
docker exec -it portfolio-app /bin/bash

# Open interactive shell (sh)
docker exec -it portfolio-app /bin/sh

# Check nginx configuration
docker exec portfolio-app nginx -t

# Reload nginx configuration
docker exec portfolio-app nginx -s reload

# Check processes inside container
docker exec portfolio-app ps aux

# Check network connections
docker exec portfolio-app netstat -tlnp
```

## 🌐 Network & Connectivity

```bash
# List networks
docker network ls

# Inspect network
docker network inspect portfolio-network

# Check container network
docker inspect portfolio-app | grep -A 20 NetworkSettings

# Test connectivity from container
docker exec portfolio-app curl http://localhost/health
docker exec portfolio-app wget -O- http://localhost/health
```

## 🏥 Health Checks

```bash
# Check health status
docker inspect portfolio-app | grep -A 5 Health

# Test health endpoint locally
curl http://localhost/health

# Test from inside container
docker exec portfolio-app curl http://localhost/health

# Test with verbose output
curl -v http://localhost/health
```

## 📊 Monitoring

### Resource Usage

```bash
# Real-time stats for all containers
docker stats

# Stats for specific container
docker stats portfolio-app

# Stats without streaming (one-time)
docker stats --no-stream portfolio-app
```

### System Information

```bash
# Docker system information
docker system df

# Docker version
docker version

# Docker info
docker info
```

## 🐛 Debugging

### Debug Container Issues

```bash
# View container configuration
docker inspect portfolio-app

# View container logs with timestamps
docker logs -t --tail=100 portfolio-app

# Check if container is actually running
docker ps -a | grep portfolio

# Check exit code
docker inspect portfolio-app | grep ExitCode

# View container events
docker events --filter container=portfolio-app

# Check port mappings
docker port portfolio-app

# View network settings
docker network inspect portfolio-network
```

### Debug Nginx Issues

```bash
# Test nginx configuration
docker exec portfolio-app nginx -t

# View nginx error logs (if mapped)
cat ~/portfolio/logs/error.log

# View nginx access logs
cat ~/portfolio/logs/access.log

# Follow nginx logs
tail -f ~/portfolio/logs/error.log
tail -f ~/portfolio/logs/access.log

# Check nginx processes
docker exec portfolio-app ps aux | grep nginx

# Reload nginx without restarting container
docker exec portfolio-app nginx -s reload
```

## 🔐 Testing Access

```bash
# Test from VPS
curl http://localhost
curl http://localhost/health

# Test domain
curl http://portfolio.balashan.dev
curl -I http://portfolio.balashan.dev

# Test with verbose
curl -v http://portfolio.balashan.dev

# Test from container
docker exec portfolio-app curl http://localhost
docker exec portfolio-app curl http://localhost/health
```

## 📦 Image Management

```bash
# List all images
docker images

# Search for image
docker images | grep portfolio

# Pull specific image
docker pull ghcr.io/balasus1/portfolio:latest

# Tag image
docker tag ghcr.io/balasus1/portfolio:latest portfolio:latest

# Remove image
docker rmi ghcr.io/balasus1/portfolio:latest

# Remove dangling images
docker image prune -f
```

## 🔄 Common Workflows

### Full Deployment

```bash
cd ~/portfolio
docker pull ghcr.io/balasus1/portfolio:latest
docker compose down
docker compose up -d
docker compose logs -f portfolio
```

### Quick Restart

```bash
cd ~/portfolio
docker compose restart
docker compose logs -f portfolio
```

### Check and Debug

```bash
cd ~/portfolio
docker compose ps
docker compose logs --tail=50 portfolio
curl http://localhost/health
```

### Clean Restart

```bash
cd ~/portfolio
docker compose down
docker compose up -d
sleep 10
docker compose ps
curl http://localhost/health
```

### Complete Cleanup and Redeploy

```bash
cd ~/portfolio
docker compose down
docker image prune -af --filter "until=168h"
docker pull ghcr.io/balasus1/portfolio:latest
docker compose up -d
docker compose logs -f portfolio
```

## 📋 Quick Reference Cheat Sheet

```bash
# Status
docker compose ps
docker ps -a | grep portfolio

# Logs
docker compose logs -f portfolio
docker logs -f portfolio-app

# Restart
docker compose restart
docker restart portfolio-app

# Stop
docker compose down
docker stop portfolio-app

# Start
docker compose up -d
docker start portfolio-app

# Update
docker pull ghcr.io/balasus1/portfolio:latest && docker compose down && docker compose up -d

# Shell access
docker exec -it portfolio-app /bin/bash

# Health check
curl http://localhost/health

# Clean up
docker system prune -af --filter "until=168h"
```

## 🚨 Troubleshooting Commands

```bash
# If container won't start
docker compose logs portfolio
docker inspect portfolio-app

# If port conflict
sudo netstat -tulpn | grep :80
sudo lsof -i :80

# If container keeps restarting
docker logs portfolio-app
docker inspect portfolio-app | grep -A 10 RestartCount

# If can't connect
docker network inspect portfolio-network
docker exec portfolio-app curl http://localhost/health

# If nginx issues
docker exec portfolio-app nginx -t
docker exec portfolio-app nginx -s reload
```

