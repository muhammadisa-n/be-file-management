FROM node:22-slim AS base

# Install timezone data
RUN apt-get update && apt-get install -y tzdata openssl

# Set timezone
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

# Create logs folder
RUN mkdir -p logs

# Install dependencies based on package-lock.json
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Generate key (sesuaikan dengan perintahmu)
RUN node craft key:generate

# Build project (jika ada)
RUN node craft build


# Build stage untuk copy hasil build
FROM base AS build

# Nothing extra, base sudah berisi semua

# Production image
FROM node:22-slim AS production

WORKDIR /usr/src/app

# Copy package files untuk install production dependencies
COPY package*.json ./

# Install production dependencies saja
RUN npm ci --omit=dev

# Copy hasil build dan file penting dari build stage
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/.env ./
COPY --from=build /usr/src/app/logs ./build/logs

EXPOSE 4444

CMD ["node", "build/main.js"]
