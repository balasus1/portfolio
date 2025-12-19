# VPS Setup Guide (No Git Repository Required)

This guide explains how to set up the portfolio on your VPS **without cloning the GitHub repository**. The VPS only needs `docker-compose.yml` and `nginx.conf` files.

## 🎯 Overview

Instead of cloning the repo, we use a Docker registry:
1. Build image in GitHub Actions or locally
2. Push to GitHub Container Registry (ghcr.io) or Docker Hub
3. VPS pulls the image and runs docker-compose
4. **No source code needed on VPS!**

## 📋 Initial VPS Setup (One-time)

### Step 1: SSH into VPS

```bash
ssh ubuntu@148.113.44.73
# or
ssh balashan.dev
```

### Step 2: Create Project Directory

```bash
mkdir -p ~/portfolio
cd ~/portfolio
mkdir -p logs ssl
```

### Step 3: Create docker-compose.yml

Create `~/portfolio/docker-compose.yml`:

```yaml
version: '3.8'

services:
  portfolio:
    # Replace with your actual registry image
    image: ghcr.io/yourusername/myportfolio:latest
    # OR use Docker Hub:
    # image: yourusername/portfolio:latest
    
    container_name: portfolio-app
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./logs:/var/log/nginx
    networks:
      - portfolio-network
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 10s

networks:
  portfolio-network:
    driver: bridge
```

### Step 4: Create nginx.conf

Copy the `nginx.conf` file from your local repository to `~/portfolio/nginx.conf`:

```bash
# On your local machine
scp nginx.conf ubuntu@148.113.44.73:~/portfolio/
```

Or manually create it on VPS (copy content from the repository).

### Step 5: First Deployment

**Option A: If using GitHub Container Registry**

```bash
# On VPS, create a GitHub Personal Access Token and login
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# Pull and run
cd ~/portfolio
docker pull ghcr.io/yourusername/myportfolio:latest
docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest
docker-compose up -d
```

**Option B: If using Docker Hub**

```bash
# On VPS
docker login  # Enter your Docker Hub credentials

# Pull and run
cd ~/portfolio
docker pull yourusername/portfolio:latest
docker tag yourusername/portfolio:latest portfolio:latest
docker-compose up -d
```

### Step 7: Verify Deployment and DNS

**Verify Container:**

```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs portfolio

# Test health endpoint
curl http://localhost/health
```

## 🔄 Updating the Application

### Method 1: Using GitHub Actions (Automatic)

When you push to GitHub:
1. GitHub Actions builds the image
2. Pushes to registry (ghcr.io)
3. SSH into VPS and pulls new image
4. Restarts container

**On VPS, create update script:**

```bash
nano ~/portfolio/update.sh
```

Add:

```bash
#!/bin/bash
cd ~/portfolio

# Pull latest image
docker pull ghcr.io/yourusername/myportfolio:latest

# Tag for docker-compose
docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest

# Restart container
docker-compose down
docker-compose up -d

# Cleanup old images
docker image prune -af --filter "until=168h"

echo "✅ Update complete!"
docker-compose ps
```

Make it executable:

```bash
chmod +x ~/portfolio/update.sh
```

**Run update:**
```bash
~/portfolio/update.sh
```

### Method 2: Automatic Updates with Cron

Set up a cron job to automatically pull and update:

```bash
crontab -e
```

Add (runs every day at 2 AM):

```bash
0 2 * * * cd ~/portfolio && docker pull ghcr.io/yourusername/myportfolio:latest && docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest && docker-compose down && docker-compose up -d && docker image prune -af --filter "until=168h" >> /var/log/portfolio-update.log 2>&1
```

### Method 3: Manual Update

```bash
ssh ubuntu@148.113.44.73
cd ~/portfolio
docker pull ghcr.io/yourusername/myportfolio:latest
docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest
docker-compose down
docker-compose up -d
```

## 🔐 GitHub Container Registry Setup

### Create Personal Access Token (PAT)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `write:packages` permission
3. Copy the token

### Login from VPS

```bash
echo "YOUR_PAT_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### Make it persistent

Save credentials:

```bash
nano ~/.docker/config.json
```

Or use a credential helper (more secure).

## 🐳 Docker Hub Setup (Alternative)

If you prefer Docker Hub:

1. **Create account** at https://hub.docker.com
2. **Login from VPS:**
   ```bash
   docker login
   ```
3. **Update docker-compose.yml:**
   ```yaml
   image: yourusername/portfolio:latest
   ```
4. **Update GitHub Actions** to push to Docker Hub instead of ghcr.io

## ☁️ Cloudflare DNS Configuration

If you're using Cloudflare for your domain (recommended for DDoS protection and CDN), configure DNS records as follows:

### Step-by-Step Cloudflare Setup

1. **Login to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Select your domain: `balashan.dev`

2. **Go to DNS → Records**

3. **Add DNS Records** (click "Add record" for each):

   **Record 1: CAA (Certificate Authority Authorization)**
   ```
   Type: CAA
   Name: balashan.dev (or @)
   Content: 0 issue letsencrypt.org
   Proxy status: DNS only (gray cloud ☁️)
   TTL: Auto
   ```
   *Purpose: Allows Let's Encrypt to issue SSL certificates for your domain*

   **Record 2: A Record (Main Domain)**
   ```
   Type: A
   Name: balashan.dev (or @)
   Content: 148.113.44.73
   Proxy status: Proxied (orange cloud ☁️☁️)
   TTL: Auto
   ```
   *Purpose: Points your main domain to your VPS IP with Cloudflare CDN protection*

   **Record 3: CNAME (Subdomain)**
   ```
   Type: CNAME
   Name: portfolio
   Content: balashan.dev
   Proxy status: Proxied (orange cloud ☁️☁️)
   TTL: Auto
   ```
   *Purpose: Creates portfolio.balashan.dev subdomain pointing to main domain*

4. **Verify Records**

   After adding records, your DNS table should show:

   | Type | Name | Content | Proxy | TTL |
   |------|------|---------|-------|-----|
   | CAA | `balashan.dev` | `0 issue letsencrypt.org` | ☁️ DNS only | Auto |
   | A | `balashan.dev` | `148.113.44.73` | ☁️☁️ Proxied | Auto |
   | CNAME | `portfolio` | `balashan.dev` | ☁️☁️ Proxied | Auto |

5. **Update nginx.conf on VPS**

   ```bash
   nano ~/portfolio/nginx.conf
   ```

   Update `server_name` to include all domains:
   ```nginx
   server_name balashan.dev www.balashan.dev portfolio.balashan.dev;
   ```

6. **Restart Container**

   ```bash
   cd ~/portfolio
   docker-compose restart portfolio
   ```

7. **Test DNS Propagation**

   ```bash
   # Wait 5-10 minutes for DNS to propagate, then test:
   dig balashan.dev A
   dig portfolio.balashan.dev CNAME
   
   # Or use online tools:
   # https://dnschecker.org
   # https://www.whatsmydns.net
   ```

8. **Cloudflare SSL/TLS Settings** (Recommended)

   - Go to Cloudflare Dashboard → SSL/TLS
   - Set encryption mode to: **Full** or **Full (strict)**
   - This ensures encrypted connection between Cloudflare and your VPS

### Understanding Cloudflare Proxy Status

- **☁️☁️ Proxied (Orange Cloud)**: 
  - ✅ CDN enabled
  - ✅ DDoS protection
  - ✅ Hides real server IP
  - ✅ Better performance (cached content)
  - Use for: A records, CNAME records

- **☁️ DNS Only (Gray Cloud)**:
  - ✅ Direct connection to server
  - ✅ Faster for API endpoints
  - ❌ Exposes server IP
  - Use for: CAA records (required), specific subdomains if needed

### Troubleshooting Cloudflare

**Issue: Domain not resolving**
- Wait 5-10 minutes for DNS propagation
- Check Cloudflare SSL/TLS mode (should be "Full")
- Verify VPS firewall allows Cloudflare IPs

**Issue: SSL certificate errors**
- Ensure CAA record is set correctly
- Check Cloudflare SSL/TLS encryption mode
- Verify nginx.conf has correct domain names

**Issue: 502 Bad Gateway**
- Check if container is running: `docker-compose ps`
- Check VPS firewall: `sudo ufw status`
- Verify port 80 is open: `sudo ufw allow 80/tcp`

**To temporarily bypass Cloudflare proxy for testing:**
- Change A record proxy status to "DNS only" (gray cloud)
- Changes take effect immediately

## 📁 Files Needed on VPS

**Only 2 files required:**
- `~/portfolio/docker-compose.yml`
- `~/portfolio/nginx.conf`

**Directories created automatically:**
- `~/portfolio/logs/` (nginx logs)
- `~/portfolio/ssl/` (if using HTTPS)

**No need for:**
- ❌ Source code
- ❌ Dockerfile
- ❌ package.json
- ❌ node_modules
- ❌ Git repository

## 🚀 Quick Commands Reference

```bash
# Check status
cd ~/portfolio && docker-compose ps

# View logs
cd ~/portfolio && docker-compose logs -f portfolio

# Update application
cd ~/portfolio && docker pull ghcr.io/yourusername/myportfolio:latest && \
docker tag ghcr.io/yourusername/myportfolio:latest portfolio:latest && \
docker-compose down && docker-compose up -d

# Restart container
cd ~/portfolio && docker-compose restart portfolio

# Stop container
cd ~/portfolio && docker-compose down

# Start container
cd ~/portfolio && docker-compose up -d

# Clean up unused images
docker image prune -af
```

## 🔧 Troubleshooting

### Cloudflare DNS Issues

**Issue: Domain not resolving**
- Wait 5-10 minutes for DNS propagation after adding records
- Check Cloudflare SSL/TLS mode (should be "Full" or "Full (strict)")
- Verify VPS firewall allows Cloudflare IPs: `sudo ufw status`
- Test DNS propagation: https://dnschecker.org

**Issue: SSL certificate errors**
- Ensure CAA record is set correctly: `0 issue letsencrypt.org`
- Check Cloudflare SSL/TLS encryption mode in dashboard
- Verify nginx.conf has correct domain names in `server_name`
- Check if container is running: `docker-compose ps`

**Issue: 502 Bad Gateway from Cloudflare**
- Check if container is running: `docker-compose ps`
- Check VPS firewall allows Cloudflare IPs: `sudo ufw status`
- Verify port 80 is open: `sudo ufw allow 80/tcp`
- Check container logs: `docker-compose logs portfolio`
- Verify Cloudflare SSL/TLS mode is "Full" (not "Flexible")

**Issue: Site shows Cloudflare error page**
- Verify VPS is accessible directly: `curl http://148.113.44.73/health`
- Check if container is healthy: `docker-compose ps`
- Review Cloudflare firewall rules for any blocking rules

**To temporarily bypass Cloudflare proxy for testing:**
- Change A record proxy status to "DNS only" (gray cloud) in Cloudflare
- Changes take effect immediately
- Remember to change back to "Proxied" after testing

### Image not found

```bash
# Check if logged in to registry
docker login ghcr.io  # or docker login for Docker Hub

# Try pulling manually
docker pull ghcr.io/yourusername/myportfolio:latest
```

### Container won't start

```bash
# Check logs
docker-compose logs portfolio

# Check if image exists
docker images | grep portfolio

# Verify docker-compose.yml syntax
docker-compose config
```

### Permission denied

```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Logout and login again
```

## 📊 Benefits of This Approach

✅ **No source code on VPS** - Smaller footprint, more secure  
✅ **Faster deployments** - Just pull image, no build needed  
✅ **Version control** - Each image is tagged with version/sha  
✅ **Easy rollback** - Pull previous image version  
✅ **CI/CD ready** - GitHub Actions handles everything  
✅ **Scalable** - Easy to deploy to multiple servers  

## 🎯 Summary

1. **VPS has:** `docker-compose.yml` + `nginx.conf` only
2. **Images stored:** GitHub Container Registry or Docker Hub
3. **Updates:** Pull new image and restart container
4. **No Git needed** on VPS!

This is the modern, production-ready way to deploy containerized applications! 🚀

