# Traefik Setup Guide for portfolio.balashan.dev

This guide explains how to set up Traefik as a reverse proxy with automatic SSL certificate management using Let's Encrypt for your portfolio application.

## 🎯 Overview

Traefik is a modern reverse proxy and load balancer that automatically discovers services using Docker labels and handles SSL certificates automatically. This setup replaces direct Nginx port exposure with Traefik routing.

### Benefits

- ✅ **Automatic SSL certificates** via Let's Encrypt
- ✅ **Zero-downtime certificate renewal**
- ✅ **Automatic HTTP to HTTPS redirect**
- ✅ **Docker label-based configuration** (no need to edit config files)
- ✅ **Built-in security headers**
- ✅ **Easy to add more services**

## 📋 Prerequisites

- Docker and Docker Compose installed on VPS
- Domain `portfolio.balashan.dev` (and optionally `balashan.dev`) pointing to your VPS IP
- Ports 80 and 443 open in firewall
- Email address for Let's Encrypt notifications

## 🚀 Quick Setup

### Step 1: Update Configuration Files

1. **Update email in `traefik.yml`:**

   ```yaml
   certificatesResolvers:
     letsencrypt:
       acme:
         email: your-email@example.com  # ⚠️ CHANGE THIS
   ```

   Also update in `docker-compose.traefik.yml`:

   ```yaml
   - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"  # ⚠️ CHANGE THIS
   ```

2. **Verify domain names in `docker-compose.traefik.yml`:**

   The Traefik labels should match your domains:

   ```yaml
   - "traefik.http.routers.portfolio.rule=Host(`portfolio.balashan.dev`) || Host(`balashan.dev`) || Host(`www.balashan.dev`)"
   ```

### Step 2: Create Required Directories

```bash
# On your VPS
mkdir -p ~/portfolio/letsencrypt
chmod 600 ~/portfolio/letsencrypt  # Secure permissions for Let's Encrypt storage
```

### Step 3: Copy Configuration Files to VPS

From your local machine:

```bash
scp traefik.yml dynamic.yml docker-compose.traefik.yml ubuntu@148.113.44.73:~/portfolio/
```

Or create them directly on the VPS.

### Step 4: Update Nginx Configuration (Optional)

Since Traefik handles SSL termination, you can simplify `nginx.conf` by removing SSL-related configurations. However, the current configuration will work fine as-is - Traefik will just forward HTTP traffic to the container.

### Step 5: Deploy with Traefik

**Option A: Production (using registry image)**

```bash
cd ~/portfolio

# Create .env file if needed
cat > .env << EOF
NODE_ENV=production
IMAGE_NAME=ghcr.io/balasus1/portfolio:latest
EOF

# Pull latest image
docker pull ghcr.io/balasus1/portfolio:latest

# Start services
docker compose -f docker-compose.traefik.yml up -d
```

**Option B: With production override (if you have docker-compose.prod.yml)**

```bash
docker compose -f docker-compose.traefik.yml -f docker-compose.prod.yml up -d
```

### Step 6: Verify Deployment

```bash
# Check all containers are running
docker compose -f docker-compose.traefik.yml ps

# Check Traefik logs
docker compose -f docker-compose.traefik.yml logs traefik

# Check portfolio logs
docker compose -f docker-compose.traefik.yml logs portfolio

# Test health endpoint
curl http://localhost/health

# Test domain (should redirect to HTTPS)
curl -I http://portfolio.balashan.dev

# Test HTTPS (should return 200)
curl -I https://portfolio.balashan.dev
```

## 🔐 DNS Configuration

Ensure your DNS records are properly configured:

### Cloudflare DNS (Recommended)

1. **A Record:**
   ```
   Type: A
   Name: portfolio (or @ for root domain)
   Content: 148.113.44.73
   Proxy: Proxied (orange cloud ☁️☁️)
   ```

2. **CAA Record (for Let's Encrypt):**
   ```
   Type: CAA
   Name: portfolio.balashan.dev (or @)
   Content: 0 issue letsencrypt.org
   Proxy: DNS only (gray cloud ☁️)
   ```

### Direct DNS

If not using Cloudflare, ensure:
- A record for `portfolio.balashan.dev` points to your VPS IP
- A record for `balashan.dev` points to your VPS IP (if using)
- Ports 80 and 443 are accessible from the internet

## 🔧 Configuration Details

### Traefik Entry Points

- **web (port 80)**: HTTP traffic, automatically redirects to HTTPS
- **websecure (port 443)**: HTTPS traffic with SSL certificates

### SSL Certificate Management

- Certificates are automatically obtained from Let's Encrypt
- Stored in `./letsencrypt/acme.json`
- Automatically renewed before expiration
- Uses HTTP-01 challenge (requires port 80 to be accessible)

### Traefik Labels Explained

```yaml
# Enable Traefik for this container
traefik.enable=true

# HTTP router (handles HTTP requests)
traefik.http.routers.portfolio.rule=Host(`portfolio.balashan.dev`)
traefik.http.routers.portfolio.entrypoints=web

# HTTPS router (handles HTTPS requests)
traefik.http.routers.portfolio-secure.rule=Host(`portfolio.balashan.dev`)
traefik.http.routers.portfolio-secure.entrypoints=websecure
traefik.http.routers.portfolio-secure.tls.certresolver=letsencrypt

# Service configuration (where to forward requests)
traefik.http.services.portfolio.loadbalancer.server.port=80
```

## 🛡️ Security Features

### Automatic Security Headers

The `dynamic.yml` file includes security headers middleware:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Strict Transport Security (HSTS)

### HTTPS Enforcement

- All HTTP traffic automatically redirects to HTTPS
- HSTS enabled for 1 year
- Preload and includeSubdomains enabled

## 🔍 Monitoring & Debugging

### View Traefik Logs

```bash
# Real-time logs
docker compose -f docker-compose.traefik.yml logs -f traefik

# Last 100 lines
docker compose -f docker-compose.traefik.yml logs --tail=100 traefik
```

### View Portfolio Logs

```bash
docker compose -f docker-compose.traefik.yml logs -f portfolio
```

### Check Certificate Status

```bash
# List certificates stored by Traefik
docker compose -f docker-compose.traefik.yml exec traefik cat /letsencrypt/acme.json | jq '.letsencrypt.Certificates'

# Or check Traefik API (if enabled)
curl http://localhost:8080/api/http/routers | jq
```

### Test SSL Certificate

```bash
# Check certificate details
openssl s_client -connect portfolio.balashan.dev:443 -servername portfolio.balashan.dev < /dev/null

# Or use online tools:
# https://www.ssllabs.com/ssltest/
```

## 🔄 Updating the Application

When you update your portfolio application:

```bash
cd ~/portfolio

# Pull new image
docker pull ghcr.io/balasus1/portfolio:latest

# Restart portfolio service (Traefik will automatically detect changes)
docker compose -f docker-compose.traefik.yml up -d --no-deps portfolio

# Or restart everything
docker compose -f docker-compose.traefik.yml restart
```

Traefik automatically reconfigures when containers are restarted - no need to restart Traefik itself.

## 🌐 Traefik Dashboard (Optional)

To enable the Traefik dashboard for monitoring:

1. **Update `docker-compose.traefik.yml`:**

   Uncomment the dashboard labels in the Traefik service and add port mapping:

   ```yaml
   ports:
     - "80:80"
     - "443:443"
     - "8080:8080"  # Uncomment this
   
   command:
     - "--api.insecure=true"  # Change to true for development
   ```

2. **Add dashboard router labels:**

   Uncomment the dashboard labels section in `docker-compose.traefik.yml`.

3. **Access dashboard:**

   ```
   http://your-vps-ip:8080
   # or
   https://traefik.balashan.dev (if you configured the domain)
   ```

   **⚠️ Warning:** Setting `api.insecure=true` is only for development. For production, use basic auth or restrict access.

## 🚨 Troubleshooting

### Certificate Not Issued

**Issue:** Let's Encrypt certificate not being obtained

**Solutions:**
1. Check DNS records are correct and propagated
2. Ensure port 80 is accessible (required for HTTP-01 challenge)
3. Check Traefik logs: `docker compose -f docker-compose.traefik.yml logs traefik`
4. Verify email address in configuration
5. Check rate limits: Let's Encrypt has rate limits (50 certs/week/domain)

### 404 Not Found

**Issue:** Getting 404 when accessing domain

**Solutions:**
1. Verify Traefik labels are correct in `docker-compose.traefik.yml`
2. Check container is running: `docker compose -f docker-compose.traefik.yml ps`
3. Check Traefik logs for routing errors
4. Verify domain matches the Host rule in labels

### SSL Certificate Errors

**Issue:** Browser shows SSL certificate errors

**Solutions:**
1. Wait a few minutes for certificate to be issued
2. Check Traefik logs for certificate errors
3. Verify DNS is correct
4. Clear browser cache and try incognito mode
5. Check certificate with: `openssl s_client -connect portfolio.balashan.dev:443`

### Container Can't Connect

**Issue:** Portfolio container can't reach Traefik or vice versa

**Solutions:**
1. Ensure both containers are on the same network (`traefik-network`)
2. Check network exists: `docker network ls | grep traefik-network`
3. Verify network configuration in docker-compose file

### Port Already in Use

**Issue:** Error binding to port 80 or 443

**Solutions:**
1. Stop any existing web servers (Apache, Nginx, etc.)
   ```bash
   sudo systemctl stop nginx
   sudo systemctl stop apache2
   ```
2. Check what's using the port:
   ```bash
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   ```
3. If old portfolio container is running, stop it:
   ```bash
   docker compose down  # If using old compose file
   ```

## 📊 Migration from Direct Nginx Setup

If you're migrating from the direct Nginx setup:

1. **Stop old containers:**
   ```bash
   cd ~/portfolio
   docker compose down  # Stop old setup
   ```

2. **Remove old port mappings:**
   - The portfolio service no longer needs `ports` section
   - Traefik handles external access

3. **Deploy with Traefik:**
   ```bash
   docker compose -f docker-compose.traefik.yml up -d
   ```

4. **Verify:**
   ```bash
   # Old way (should fail if old container stopped)
   curl http://localhost:80
   
   # New way (should work)
   curl http://portfolio.balashan.dev
   curl https://portfolio.balashan.dev
   ```

## 🔐 Security Best Practices

1. **Keep Traefik updated:**
   ```bash
   docker pull traefik:latest
   docker compose -f docker-compose.traefik.yml up -d traefik
   ```

2. **Secure Let's Encrypt storage:**
   ```bash
   chmod 600 ~/portfolio/letsencrypt/acme.json
   ```

3. **Use strong passwords for dashboard** (if enabled)

4. **Monitor logs regularly:**
   ```bash
   docker compose -f docker-compose.traefik.yml logs -f
   ```

5. **Enable firewall:**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

## 📚 Additional Resources

- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Traefik Docker Provider](https://doc.traefik.io/traefik/providers/docker/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Traefik SSL Configuration](https://doc.traefik.io/traefik/https/acme/)

## ✅ Verification Checklist

After setup, verify:

- [ ] All containers are running: `docker compose -f docker-compose.traefik.yml ps`
- [ ] HTTP redirects to HTTPS: `curl -I http://portfolio.balashan.dev`
- [ ] HTTPS works: `curl -I https://portfolio.balashan.dev`
- [ ] SSL certificate is valid (check in browser)
- [ ] Health endpoint works: `curl https://portfolio.balashan.dev/health`
- [ ] Traefik logs show no errors
- [ ] Certificate is stored in `letsencrypt/acme.json`

## 🎉 Success!

Your portfolio is now running behind Traefik with automatic SSL certificates! 🚀

Any questions or issues? Check the troubleshooting section or Traefik logs.

