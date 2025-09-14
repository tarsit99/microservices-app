# Use a small base image
FROM node:18-alpine

# App env (helps some libs)
ENV NODE_ENV=production
ENV PORT=3001

# Create non-root work dir
WORKDIR /app

# Install deps based on lockfile for reproducible builds
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Run as non-root user for security
USER node

# Document the port (container-side)
EXPOSE 3001

# Simple healthcheck (optional but nice to have)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD node -e "require('http').get('http://localhost:' + process.env.PORT, r => { if (r.statusCode !== 200) process.exit(1) }).on('error', () => process.exit(1))"

# IMPORTANT: Exec form with plain ASCII characters (no non-breaking spaces)
CMD ["node", "index.js"]