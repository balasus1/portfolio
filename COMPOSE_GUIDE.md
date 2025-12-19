# Docker Compose Mode Guide

This project uses a unified `docker-compose.yml` file that can operate in two modes:
- **Local/Development**: Builds from source code
- **Production**: Pulls pre-built image from registry

## 🎯 Quick Start

### Local Development (Build from Source)

```bash
# Method 1: Using the wrapper script (recommended)
./compose.sh local up -d

# Method 2: Direct docker-compose
docker-compose up -d --build

# Method 3: Using environment variable
DEPLOY_MODE=local docker-compose up -d
```

### Production (Pull from Registry)

```bash
# Method 1: Using the wrapper script (recommended)
./compose.sh prod up -d

# Method 2: Using production override file
docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d

# Method 3: Using environment variables
DEPLOY_MODE=prod IMAGE_NAME=ghcr.io/balasus1/myportfolio:latest docker-compose up -d
```

## 📋 Methods Overview

### Method 1: Wrapper Script (Easiest) ⭐ Recommended

Use the `compose.sh` script to easily switch between modes:

```bash
# Local mode
./compose.sh local up -d      # Build and start
./compose.sh local down       # Stop
./compose.sh local logs -f    # View logs
./compose.sh local ps         # List containers

# Production mode
./compose.sh prod up -d       # Pull and start
./compose.sh prod down        # Stop
./compose.sh prod logs -f     # View logs
./compose.sh prod pull        # Pull latest image
./compose.sh prod ps          # List containers
```

### Method 2: Docker Compose Override Files

Production uses `docker-compose.prod.yml` which extends the base config:

```bash
# Local (default)
docker-compose up -d

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Method 3: Environment Variables

Set variables in `.env` file or export them:

**Create `.env` file:**
```bash
# For local development
DEPLOY_MODE=local
IMAGE_NAME=portfolio:latest

# For production
DEPLOY_MODE=prod
IMAGE_NAME=ghcr.io/balasus1/myportfolio:latest
```

**Or use production env file:**
```bash
docker-compose --env-file .env.prod up -d
```

### Method 4: Inline Environment Variables

```bash
# Local
DEPLOY_MODE=local docker-compose up -d

# Production
DEPLOY_MODE=prod IMAGE_NAME=ghcr.io/balasus1/myportfolio:latest docker-compose up -d
```

## 🔧 Configuration Files

### docker-compose.yml
- **Purpose**: Base configuration (works for both modes)
- **Behavior**: 
  - If `IMAGE_NAME` is set: uses that image
  - Otherwise: builds from Dockerfile

### docker-compose.prod.yml
- **Purpose**: Production override file
- **Behavior**: 
  - Sets `build: null` (disables building)
  - Forces use of registry image
  - Optimized for production

### .env.prod
- **Purpose**: Production environment variables
- **Contains**: IMAGE_NAME, resource limits, ports

### .env (optional)
- **Purpose**: Local environment variables
- **Note**: Not committed to git (should be in .gitignore)

## 🚀 Common Commands

### Start Services

```bash
# Local development
./compose.sh local up -d

# Production
./compose.sh prod up -d
```

### Stop Services

```bash
# Local
./compose.sh local down

# Production
./compose.sh prod down
```

### View Logs

```bash
# Local
./compose.sh local logs -f

# Production
./compose.sh prod logs -f

# Or direct
docker-compose logs -f portfolio
```

### Restart Services

```bash
# Local
./compose.sh local restart

# Production
./compose.sh prod restart
```

### Pull Latest Image (Production Only)

```bash
./compose.sh prod pull
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Rebuild Local Image

```bash
./compose.sh local down
docker-compose build --no-cache
./compose.sh local up -d
```

## 🔍 How It Works

### Local Mode Flow

```
docker-compose.yml
  ↓
Checks: IMAGE_NAME not set or DEPLOY_MODE=local
  ↓
Uses: build: { context: ., dockerfile: Dockerfile }
  ↓
Builds image from source
  ↓
Runs container
```

### Production Mode Flow

```
docker-compose.yml + docker-compose.prod.yml
  ↓
Checks: IMAGE_NAME is set and DEPLOY_MODE=prod
  ↓
Uses: image: ghcr.io/... (from IMAGE_NAME)
  ↓
Sets: build: null (disables building)
  ↓
Pulls image from registry
  ↓
Runs container
```

## 📝 Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `DEPLOY_MODE` | `local` | Mode: `local` or `prod` |
| `IMAGE_NAME` | `portfolio:latest` | Docker image to use (prod mode) |
| `PORT_HTTP` | `80` | HTTP port mapping |
| `PORT_HTTPS` | `443` | HTTPS port mapping |
| `CPU_LIMIT` | `1` | CPU limit for container |
| `MEMORY_LIMIT` | `512M` | Memory limit for container |
| `CPU_RESERVATION` | `0.25` | CPU reservation |
| `MEMORY_RESERVATION` | `256M` | Memory reservation |
| `NODE_ENV` | `production` | Node environment |

## 🎯 Recommended Usage

### For Local Development

1. Use wrapper script:
   ```bash
   ./compose.sh local up -d
   ```

2. Or standard docker-compose:
   ```bash
   docker-compose up -d --build
   ```

### For VPS Production

1. Create `.env.prod` with your registry image:
   ```bash
   IMAGE_NAME=ghcr.io/balasus1/myportfolio:latest
   ```

2. Use wrapper script:
   ```bash
   ./compose.sh prod up -d
   ```

3. Or use override file:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

## 🐛 Troubleshooting

### Issue: "Build context not found"

**Solution**: Make sure you're running in local mode or have source code:
```bash
./compose.sh local up -d
```

### Issue: "Image not found" (Production)

**Solution**: 
1. Check IMAGE_NAME is set correctly
2. Login to registry:
   ```bash
   docker login ghcr.io
   ```
3. Pull image manually:
   ```bash
   docker pull ghcr.io/balasus1/myportfolio:latest
   ```

### Issue: Both build and image specified

**Solution**: In production mode, use override file:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

This sets `build: null` which disables building.

## 📚 Additional Resources

- See `DEPLOYMENT.md` for full deployment guide
- See `VPS_SETUP.md` for VPS-specific setup
- Docker Compose docs: https://docs.docker.com/compose/

