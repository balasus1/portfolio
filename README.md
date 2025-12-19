# 🎨 Portfolio Website

A modern, responsive portfolio website showcasing professional experience, projects, skills, and achievements. Built with React, TypeScript, and Vite for optimal performance and developer experience.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Radix UI components
- **Animations**: Framer Motion with scroll-triggered animations
- **Deployment**: Docker + Docker Compose with Nginx
- **CI/CD**: GitHub Actions with GitHub Container Registry

## ✨ Features

- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎭 Smooth scroll animations with toggle option
- 🌓 Dark/Light theme support
- ⚡ Optimized performance with lazy loading
- 🔍 SEO optimized with React Helmet
- 🐳 Containerized with Docker for easy deployment
- 🔄 Automated CI/CD pipeline
- 📊 Interactive sections: Hero, About, Skills, Experience, Projects, Testimonials, Contact

## 🏗️ Build & Deploy Architecture

### Local Development Flow

```text
┌─────────────────────┐
│   Developer Machine │
│                     │
│  1. git clone       │
│  2. ./compose.sh    │
│     local up -d     │
│                     │
│  ┌───────────────┐  │
│  │ Docker Build  │  │
│  │ (from source) │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │  Container    │  │
│  │  (Port 80)    │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │   Nginx       │  │
│  │   (Static)    │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────▼───────┐  │
│  │  http://      │  │
│  │  localhost    │  │
│  └───────────────┘  │
└─────────────────────┘
```

### Production VPS Deployment Flow

```text
┌──────────────────┐      ┌──────────────────┐      ┌──────────────┐
│   GitHub Repo    │      │ GitHub Actions   │      │    GHCR      │
│                  │ Push │                  │ Push │   Registry   │
│  (Source Code)   │─────>│  (CI/CD Build)   │─────>│  (Docker     │
│                  │      │                  │      │   Image)     │
└──────────────────┘      └──────────────────┘      └──────┬───────┘
                                                             │
                                                             │ Pull
                                                             │
                                                             ▼
┌────────────────────────────────────────────────────────────┐
│                        VPS Server                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │  docker-compose.yml + docker-compose.prod.yml     │   │
│  │  + nginx.conf (config files only)                 │   │
│  │                                                    │   │
│  │  1. docker pull ghcr.io/.../myportfolio:latest    │   │
│  │  2. docker compose up -d (with override)          │   │
│  │                                                    │   │
│  │  ┌──────────────┐                                 │   │
│  │  │  Container   │                                 │   │
│  │  │  (Port 80)   │                                 │   │
│  │  └──────┬───────┘                                 │   │
│  │         │                                          │   │
│  │  ┌──────▼───────┐                                 │   │
│  │  │   Nginx      │                                 │   │
│  │  │   (Static)   │                                 │   │
│  │  └──────┬───────┘                                 │   │
│  └─────────┼──────────────────────────────────────────┘   │
│            │                                               │
│  ┌─────────▼─────────┐                                    │
│  │  Port 80          │                                    │
│  │  (HTTP)           │                                    │
│  └─────────┬─────────┘                                    │
└────────────┼──────────────────────────────────────────────┘
             │
             │ CNAME: portfolio → balashan.dev
             ▼
┌────────────────────────────────────────────┐
│        Cloudflare (CDN + SSL)              │
│                                            │
│  CNAME: portfolio.balashan.dev             │
│         → balashan.dev → 148.113.44.73    │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │  https://                          │   │
│  │  portfolio.balashan.dev            │   │
│  │  (SSL + CDN)                       │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### Key Differences

| Aspect | Local Development | Production (VPS) |
|--------|------------------|------------------|
| **Build** | Built from source code | Pre-built image from registry |
| **Files Needed** | Full repository | Only config files (`docker-compose.yml`, `nginx.conf`) |
| **Command** | `./compose.sh local up -d` | `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d` |
| **Image Source** | Built locally | Pulled from GHCR registry |
| **Deployment** | Manual | Automated via GitHub Actions |
| **Access URL** | `http://localhost` | `https://portfolio.balashan.dev` (via Cloudflare CNAME) |

## 🐳 Docker Deployment

This portfolio uses Docker and Docker Compose for deployment. The project includes a unified docker-compose configuration that supports both local development and production deployment.

### Quick Start

**Local Development:**

```bash
# Using the convenience script (recommended)
./compose.sh local up -d

# OR direct docker compose
docker compose up -d --build
```

**Production Deployment:**

- See [COMPOSE_GUIDE.md](./COMPOSE_GUIDE.md) for detailed Docker Compose usage
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide
- See [VPS_SETUP.md](./VPS_SETUP.md) for VPS setup without Git repository
- See [README_DEPLOYMENT.md](./README_DEPLOYMENT.md) for quick deployment summary

### Docker Features

- **Unified Configuration**: Single `docker-compose.yml` for local and production
- **Mode Switching**: Use `./compose.sh local` or `./compose.sh prod` to switch modes
- **Registry-based Deployment**: No source code needed on VPS - pull pre-built images
- **CI/CD Ready**: GitHub Actions automates build and deployment
