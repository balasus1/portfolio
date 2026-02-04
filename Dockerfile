# Multi-stage build for React Portfolio
# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies needed for native modules (fixes esbuild issues)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies (all dependencies including devDependencies for build)
# Fix for esbuild ETXTBSY error: use npm install with specific flags
# The ETXTBSY error occurs when esbuild binary is being written and accessed simultaneously
RUN npm install --legacy-peer-deps --no-audit --no-fund

# Copy source code
COPY . .

# Build arguments for environment variables (passed from GitHub Actions)
ARG VITE_GEMINI_API_KEY
ARG VITE_GROQ_API_KEY

# Set environment variables for Vite build
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV VITE_GROQ_API_KEY=$VITE_GROQ_API_KEY

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

