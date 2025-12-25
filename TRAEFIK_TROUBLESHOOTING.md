# Traefik 404 Troubleshooting Guide

If you're getting a 404 error when accessing https://portfolio.balashan.dev/, follow these steps:

## Quick Diagnostic Steps

### 1. Check if containers are running

```bash
ssh ubuntu@YOUR_VPS_IP
cd ~/portfolio
docker compose -f docker-compose.traefik.yml ps
```

Both `traefik` and `portfolio-app` should be running and healthy.

### 2. Check Traefik logs

```bash
docker compose -f docker-compose.traefik.yml logs traefik | tail -50
```

Look for:
- Router configuration errors
- Certificate issues
- Routing errors

### 3. Check Portfolio container logs

```bash
docker compose -f docker-compose.traefik.yml logs portfolio | tail -50
```

Verify the container is serving content on port 80 internally.

### 4. Test container connectivity

```bash
# Test if portfolio container is accessible on port 80
docker compose -f docker-compose.traefik.yml exec portfolio wget -O- http://localhost/health

# Test from Traefik container to portfolio
docker compose -f docker-compose.traefik.yml exec traefik wget -O- http://portfolio:80/health
```

### 5. Check Traefik routing configuration

```bash
# Check if Traefik sees the portfolio service
docker compose -f docker-compose.traefik.yml exec traefik wget -qO- http://localhost:8080/api/http/routers 2>/dev/null | grep -i portfolio

# Check services
docker compose -f docker-compose.traefik.yml exec traefik wget -qO- http://localhost:8080/api/http/services 2>/dev/null | grep -i portfolio
```

Note: You may need to enable the API dashboard temporarily to access these endpoints.

## Common Issues and Solutions

### Issue 1: Service not linked to router

**Symptom:** Router exists but service is not referenced

**Solution:** Ensure router has service reference:
```yaml
- "traefik.http.routers.portfolio-secure.service=portfolio"
```

### Issue 2: Wrong port configuration

**Symptom:** Container responds internally but not through Traefik

**Check:**
```bash
# Verify the container is listening on port 80
docker compose -f docker-compose.traefik.yml exec portfolio netstat -tlnp | grep :80
```

**Solution:** Ensure service port matches container port:
```yaml
- "traefik.http.services.portfolio.loadbalancer.server.port=80"
```

### Issue 3: Network connectivity

**Symptom:** Traefik can't reach portfolio container

**Check:**
```bash
# Verify both containers are on traefik-network
docker network inspect traefik-network | grep -A 10 portfolio
```

**Solution:** Ensure portfolio service has:
```yaml
networks:
  - traefik-network
```

### Issue 4: Host header mismatch

**Symptom:** Routing works but returns wrong content

**Check:** Verify Host rule matches your domain:
```yaml
- "traefik.http.routers.portfolio-secure.rule=Host(`portfolio.balashan.dev`)"
```

### Issue 5: SSL Certificate issues

**Symptom:** Can't establish HTTPS connection

**Check:**
```bash
# Check certificate status
docker compose -f docker-compose.traefik.yml logs traefik | grep -i certificate
docker compose -f docker-compose.traefik.yml logs traefik | grep -i acme
```

**Solution:** 
- Verify DNS is correctly configured
- Ensure port 80 is accessible for HTTP-01 challenge
- Check Let's Encrypt rate limits

## Enable Traefik API Dashboard (for debugging)

Temporarily enable the dashboard to inspect routing:

1. Edit `docker-compose.traefik.yml`:
   ```yaml
   ports:
     - "8080:8080"  # Uncomment this
   
   command:
     - "--api.insecure=true"  # Change to true
   ```

2. Restart:
   ```bash
   docker compose -f docker-compose.traefik.yml up -d
   ```

3. Access dashboard:
   ```
   http://YOUR_VPS_IP:8080
   ```

4. Check:
   - HTTP → Routers → Look for `portfolio-secure`
   - HTTP → Services → Look for `portfolio`
   - HTTP → Middlewares → Verify security-headers exists

5. **Remember to disable after debugging!**

## Manual Testing Commands

```bash
# Test HTTP (should redirect to HTTPS)
curl -I http://portfolio.balashan.dev

# Test HTTPS directly
curl -I https://portfolio.balashan.dev

# Test with verbose output
curl -v https://portfolio.balashan.dev

# Test from inside Traefik container
docker compose -f docker-compose.traefik.yml exec traefik curl -I http://portfolio:80

# Check if portfolio container is healthy
docker compose -f docker-compose.traefik.yml exec portfolio curl http://localhost/health
```

## Complete Configuration Checklist

Ensure all these are correct:

- [ ] `traefik.enable=true` label is set
- [ ] Router rule matches your domain
- [ ] Router has `service=portfolio` reference
- [ ] Service has correct port (80)
- [ ] Both containers are on `traefik-network`
- [ ] Portfolio container is running and healthy
- [ ] DNS points to your VPS IP
- [ ] Ports 80 and 443 are open in firewall
- [ ] SSL certificate is issued (check logs)

## Still Not Working?

1. **Compare with working config:**
   ```bash
   # View current labels
   docker inspect portfolio-app | jq '.[0].Config.Labels'
   ```

2. **Restart everything:**
   ```bash
   docker compose -f docker-compose.traefik.yml down
   docker compose -f docker-compose.traefik.yml up -d
   ```

3. **Check Traefik version compatibility:**
   ```bash
   docker compose -f docker-compose.traefik.yml exec traefik traefik version
   ```

4. **Review full logs:**
   ```bash
   docker compose -f docker-compose.traefik.yml logs > traefik-debug.log
   # Download and review the log file
   ```

