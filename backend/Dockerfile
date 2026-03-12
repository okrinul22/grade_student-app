# Backend Dockerfile - Node.js Express + Prisma
# Use Debian Bookworm (better Prisma compatibility than Alpine)
FROM node:20-bookworm-slim

# Install OpenSSL and other required dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    wget \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Copy Prisma schema before npm install
COPY prisma ./prisma/

# Install all dependencies
RUN npm ci

# Generate Prisma client for this platform
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start command - wait for DB, push schema, start server
CMD ["sh", "-c", "sleep 5 && npx prisma db push --skip-generate --accept-data-loss 2>/dev/null || true && node server.js"]
