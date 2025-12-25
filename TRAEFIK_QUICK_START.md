# Traefik Quick Start Guide

Quick reference for setting up Traefik with portfolio.balashan.dev

## 🚀 Quick Setup (5 minutes)

### 1. Update Email Address

Edit `docker-compose.traefik.yml` and replace `your-email@example.com` with your actual email:

```yaml
- "--certificatesresolvers.letsencrypt.acme.email=your-actual-email@example.com"
```

Also update in `traefik.yml`:

```yaml
email: your-actual-email@example.com
```

### 2. Create Let's Encrypt Directory

```bash
mkdir -p ~/portfolio/letsencrypt
```

### 3. Deploy

```bash
cd ~/portfolio

# Pull latest portfolio image
docker pull ghcr.io/balasus1/portfolio:latest

# Start everything
docker compose -f docker-compose.traefik.yml up -d
```

### 4. Verify

```bash
# Check containers
docker compose -f docker-compose.traefik.yml ps

# Check logs
docker compose -f docker-compose.traefik.yml logs -f traefik

# Test (should redirect to HTTPS)
curl -I http://portfolio.balashan.dev

# Test HTTPS (should work)
curl -I https://portfolio.balashan.dev
```

## 📝 Important Files

- `docker-compose.traefik.yml` - Main compose file with Traefik + Portfolio
- `traefik.yml` - Traefik static configuration
- `dynamic.yml` - Traefik dynamic configuration (security headers, etc.)
- `TRAEFIK_SETUP.md` - Full detailed documentation

## 🔑 Key Configuration

### Domains

Edit the Host rules in `docker-compose.traefik.yml` to match your domains:

```yaml
- "traefik.http.routers.portfolio.rule=Host(`portfolio.balashan.dev`) || Host(`balashan.dev`)"
```

### SSL Certificates

- Automatically obtained from Let's Encrypt
- Stored in `./letsencrypt/acme.json`
- Auto-renewed before expiration
- Uses HTTP-01 challenge (requires port 80 accessible)

## 🛠️ Common Commands

```bash
# Start services
docker compose -f docker-compose.traefik.yml up -d

# Stop services
docker compose -f docker-compose.traefik.yml down

# View logs
docker compose -f docker-compose.traefik.yml logs -f

# Restart portfolio (after updating image)
docker compose -f docker-compose.traefik.yml up -d --no-deps portfolio

# Update portfolio image
docker pull ghcr.io/balasus1/portfolio:latest
docker compose -f docker-compose.traefik.yml up -d --no-deps portfolio
```

## 🔍 Troubleshooting

### Certificate Not Issuing

1. Check DNS: `dig portfolio.balashan.dev`
2. Check port 80 is open: `sudo ufw status`
3. Check Traefik logs: `docker compose -f docker-compose.traefik.yml logs traefik`

### Port Already in Use

Stop any existing web servers:
```bash
sudo systemctl stop nginx apache2
docker compose down  # Stop old portfolio setup
```

## 📚 Full Documentation

See [TRAEFIK_SETUP.md](./TRAEFIK_SETUP.md) for complete documentation.

