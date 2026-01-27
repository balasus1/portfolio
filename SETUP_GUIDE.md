# Complete Setup Guide - Portfolio on OVH VPS

**Single source of truth for deploying portfolio.balashan.dev on OVH VPS with HTTPS.**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [One-Time VPS Setup](#one-time-vps-setup)
3. [GitHub Configuration](#github-configuration)
4. [SSL Certificate Setup](#ssl-certificate-setup)
5. [Deployment Flow](#deployment-flow)
6. [Access Your Site](#access-your-site)
7. [Troubleshooting](#troubleshooting)
8. [Common Commands](#common-commands)

---

## Prerequisites

- OVH VPS with Ubuntu Server
- Domain `portfolio.balashan.dev` pointing to your VPS IP
- GitHub repository with your portfolio code
- SSH access to VPS

---

## One-Time VPS Setup

### Step 1: SSH into OVH VPS

```bash
ssh ubuntu@YOUR_OVH_VPS_IP
# Replace YOUR_OVH_VPS_IP with your actual VPS IP address
```

### Step 2: Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version
```

### Step 3: Install Certbot (for SSL certificates)

```bash
sudo apt install certbot -y
```

### Step 4: Configure Firewall

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### Step 5: Create Project Directory

```bash
mkdir -p ~/portfolio/{logs,certbot/conf,certbot/www}
cd ~/portfolio
```

---

## GitHub Configuration

### Step 1: Generate SSH Key (if you don't have one)

**On your local machine:**

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/ovh_vps_key
```

### Step 2: Copy Public Key to VPS

```bash
ssh-copy-id -i ~/.ssh/ovh_vps_key.pub ubuntu@YOUR_OVH_VPS_IP
```

### Step 3: Add GitHub Secrets

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

Add these secrets:

1. **VPS_HOST**
   - Value: Your OVH VPS IP address (e.g., `148.113.44.73`)
   - ⚠️ Must be IP address, not domain name

2. **VPS_USER**
   - Value: `ubuntu` (or your SSH username)

3. **VPS_SSH_KEY**
   - Value: Content of your private key
   - Get it: `cat ~/.ssh/ovh_vps_key`
   - Copy **entire output** including `-----BEGIN` and `-----END` lines

---

## SSL Certificate Setup

### Step 1: Configure DNS

Point your domain to OVH VPS IP:

**A Record:**
```
Type: A
Name: portfolio
Content: YOUR_OVH_VPS_IP
TTL: 3600
```

**CAA Record (for Let's Encrypt):**
```
Type: CAA
Name: portfolio.balashan.dev (or @)
Content: 0 issue letsencrypt.org
TTL: 3600
```

Wait 5-10 minutes for DNS propagation.

### Step 2: Get SSL Certificate

**On your VPS:**

```bash
cd ~/portfolio

# Stop any existing web servers
sudo systemctl stop nginx apache2 2>/dev/null || true

# Get SSL certificate
sudo certbot certonly --standalone \
  -d portfolio.balashan.dev \
  --email bala.s0027@gmail.com \
  --agree-tos \
  --non-interactive

# Copy certificates to project directory
sudo cp -r /etc/letsencrypt/live/portfolio.balashan.dev ~/portfolio/certbot/conf/
sudo chown -R $USER:$USER ~/portfolio/certbot
```

### Step 3: Set Up Auto-Renewal

```bash
# Create renewal script
cat > ~/portfolio/renew-cert.sh << 'EOF'
#!/bin/bash
cd ~/portfolio
certbot renew --quiet --deploy-hook "docker compose restart portfolio"
EOF

chmod +x ~/portfolio/renew-cert.sh

# Add to crontab (runs daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/portfolio/renew-cert.sh") | crontab -
```

---

## Deployment Flow

### How It Works

When you push code to GitHub:

1. **GitHub Actions automatically:**
   - ✅ Builds Docker image (React app + Nginx)
   - ✅ Pushes to GitHub Container Registry
   - ✅ **SSH into OVH VPS** (no manual login needed!)
   - ✅ Copies `docker-compose.yml` and `nginx.conf` to VPS
   - ✅ Pulls latest Docker image
   - ✅ Starts container with Nginx on ports 80 and 443
   - ✅ Verifies deployment

2. **Nginx serves your site:**
   - HTTP (port 80) → Redirects to HTTPS
   - HTTPS (port 443) → Serves React app with SSL

### What You Do

```bash
# 1. Develop and test locally
npm run dev

# 2. Build and test
npm run build

# 3. Commit and push
git add .
git commit -m "Update portfolio"
git push origin main

# 4. GitHub Actions deploys automatically!
# Check GitHub → Actions tab for deployment status
```

**That's it!** No manual VPS login needed.

---

## Access Your Site

After deployment:

```
https://portfolio.balashan.dev
```

HTTP automatically redirects to HTTPS.

---

## Troubleshooting

### Container Not Starting

```bash
# SSH to VPS
ssh ubuntu@YOUR_OVH_VPS_IP
cd ~/portfolio

# Check container status
docker compose ps

# Check logs
docker compose logs portfolio

# Check Nginx config
docker exec portfolio-app nginx -t

# Restart container
docker compose restart portfolio
```

### SSL Certificate Issues

```bash
# Check if certificates exist
ls -la ~/portfolio/certbot/conf/

# If missing, get certificate again
sudo certbot certonly --standalone -d portfolio.balashan.dev --email bala.s0027@gmail.com --agree-tos --non-interactive
sudo cp -r /etc/letsencrypt/live/portfolio.balashan.dev ~/portfolio/certbot/conf/
sudo chown -R $USER:$USER ~/portfolio/certbot

# Restart container
docker compose restart portfolio
```

### Port Already in Use

```bash
# Check what's using ports 80/443
sudo netstat -tulpn | grep -E ':80|:443'

# Stop conflicting services
sudo systemctl stop nginx apache2 2>/dev/null || true

# Restart container
cd ~/portfolio && docker compose restart portfolio
```

### Site Not Accessible

```bash
# 1. Check DNS
dig portfolio.balashan.dev
# Should return your VPS IP

# 2. Check container is running
docker compose ps

# 3. Check port mapping
docker port portfolio-app
# Should show: 80/tcp -> 0.0.0.0:80 and 443/tcp -> 0.0.0.0:443

# 4. Test from VPS
curl http://localhost/health
curl https://localhost/health

# 5. Check firewall
sudo ufw status
```

### GitHub Actions Deployment Fails

1. **Check SSH connection:**
   - Verify VPS_HOST is IP address (not domain)
   - Verify VPS_SSH_KEY includes BEGIN/END lines
   - Test SSH manually: `ssh -i ~/.ssh/ovh_vps_key ubuntu@YOUR_VPS_IP`

2. **Check GitHub Actions logs:**
   - Go to GitHub → Actions → Latest workflow run
   - Check error messages in logs

3. **Verify secrets:**
   - GitHub → Settings → Secrets and variables → Actions
   - Ensure all three secrets are set correctly

---

## Common Commands

### Container Management

```bash
# Check status
docker compose ps

# View logs
docker compose logs -f portfolio

# Restart
docker compose restart portfolio

# Stop
docker compose down

# Start
docker compose up -d

# Update (pull new image and restart)
docker pull ghcr.io/balasus1/portfolio:latest
docker compose down && docker compose up -d
```

### SSL Certificate Management

```bash
# Check certificate expiration
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check certificate files
ls -la ~/portfolio/certbot/conf/portfolio.balashan.dev/
```

### Testing

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://portfolio.balashan.dev

# Test HTTPS
curl -I https://portfolio.balashan.dev

# Test health endpoint
curl https://portfolio.balashan.dev/health

# Check SSL certificate
openssl s_client -connect portfolio.balashan.dev:443 -servername portfolio.balashan.dev < /dev/null
```

### Debugging

```bash
# Check container logs
docker compose logs portfolio | tail -50

# Check Nginx config inside container
docker exec portfolio-app nginx -t

# Check what ports container is listening on
docker exec portfolio-app netstat -tlnp

# Check network
docker network inspect portfolio-network
```

---

## File Structure on VPS

```
~/portfolio/
├── docker-compose.yml      # Generated by GitHub Actions
├── nginx.conf              # Copied by GitHub Actions
├── logs/                   # Nginx logs (auto-created)
│   ├── access.log
│   └── error.log
└── certbot/
    ├── conf/               # SSL certificates
    │   └── portfolio.balashan.dev/
    │       ├── fullchain.pem
    │       └── privkey.pem
    └── www/                 # Certbot challenge files
```

---

## Quick Reference

### Initial Setup Checklist

- [ ] Install Docker and Docker Compose on VPS
- [ ] Install Certbot on VPS
- [ ] Configure firewall (ports 22, 80, 443)
- [ ] Create ~/portfolio directory
- [ ] Get SSL certificate
- [ ] Copy certificates to ~/portfolio/certbot/conf/
- [ ] Set up certificate auto-renewal
- [ ] Configure DNS (A record pointing to VPS IP)
- [ ] Generate SSH key pair
- [ ] Copy public key to VPS
- [ ] Add GitHub secrets (VPS_HOST, VPS_USER, VPS_SSH_KEY)

### Deployment Checklist

- [ ] Push code to GitHub main branch
- [ ] Check GitHub Actions workflow status
- [ ] Verify deployment in Actions logs
- [ ] Test https://portfolio.balashan.dev

### After Deployment

- [ ] Container is running: `docker compose ps`
- [ ] Health check passes: `curl https://portfolio.balashan.dev/health`
- [ ] Site loads in browser: `https://portfolio.balashan.dev`
- [ ] HTTP redirects to HTTPS: `http://portfolio.balashan.dev`

---

## Summary

**What's Automated:**
- ✅ Docker image build and push
- ✅ SSH connection to VPS
- ✅ File deployment
- ✅ Container management
- ✅ Health checks

**What You Do:**
1. One-time VPS setup (Docker, Certbot, SSL)
2. Configure GitHub secrets
3. Push code to GitHub
4. Access your site!

**No manual VPS login needed for deployments** - GitHub Actions handles everything automatically!

---

## Need Help?

1. Check GitHub Actions logs for errors
2. Check container logs: `docker compose logs portfolio`
3. Verify SSL certificates exist: `ls ~/portfolio/certbot/conf/`
4. Test connectivity: `curl https://portfolio.balashan.dev`

---

**That's everything in one place!** Follow this guide step by step and you'll have your portfolio running on https://portfolio.balashan.dev 🚀
