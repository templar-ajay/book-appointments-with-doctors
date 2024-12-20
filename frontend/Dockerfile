# Base image for Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install libc6-compat for compatibility with some packages
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app/frontend

# Copy package files for dependency installation
COPY ./package.json ./yarn.lock* ./package-lock.json* ./pnpm-lock.yaml* .npmrc* ./

# Install dependencies using the appropriate package manager
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build the application
FROM base AS builder
WORKDIR /usr/src/app/frontend

# Copy dependencies and source code for building the application
COPY --from=deps /usr/src/app/frontend/node_modules ./node_modules
COPY ./ .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies and build the Next.js application
RUN npm install
RUN npm run build

# Production image to run the application
FROM base AS runner
WORKDIR /usr/src/app/frontend

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files for runtime
COPY --from=builder /usr/src/app/frontend/public ./public
COPY --from=builder /usr/src/app/frontend/.next ./.next
COPY --from=builder /usr/src/app/frontend/node_modules ./node_modules

# Set the user to the non-root user
USER nextjs

# Expose the application port
EXPOSE 4000
ENV PORT=4000

# Run the application using npm
CMD ["npm", "start:prod"]