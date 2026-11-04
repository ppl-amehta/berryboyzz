# ==============================================================================
# BERRYBOYZZ™ — Frontier Multi-Stage Container Packaging
# Hardened, Unprivileged Alpine Nginx Runtime with Security Headers & Asset Caching
# ==============================================================================

# STAGE 1: Build & Static Compilation
FROM node:26-alpine AS builder

WORKDIR /app

# Optimize layer caching
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .

# Run typecheck and production build
RUN npm run build

# STAGE 2: High-Performance Edge Production Server
FROM nginxinc/nginx-unprivileged:alpine-slim

# Copy hardened nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from SvelteKit builder
COPY --from=builder /app/.svelte-kit/output/client /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
