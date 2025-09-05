# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for health checks (if needed)
# RUN apk add --no-cache curl procps

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx-ultra-simple.conf /etc/nginx/conf.d/default.conf

# Copy health check script (temporarily disabled)
# COPY healthcheck.sh /usr/local/bin/healthcheck.sh
# RUN chmod +x /usr/local/bin/healthcheck.sh

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check (temporarily disabled for debugging)
# HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
#     CMD /usr/local/bin/healthcheck.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
