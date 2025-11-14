FROM node:18-alpine

# Install mysql client for database initialization
RUN apk add --no-cache mysql-client bash

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Make entrypoint script executable (if it exists)
RUN chmod +x docker-entrypoint.sh 2>/dev/null || true

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use entrypoint to initialize database and start server
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]

