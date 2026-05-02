# ---- build stage ----
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec prisma generate
RUN pnpm run build && pnpm run copyfiles

# ---- runtime stage ----
FROM node:20-alpine

RUN apk add --no-cache openssl
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/prisma ./prisma

# Full install so prisma CLI is available for generate, then prune dev deps
RUN pnpm install --frozen-lockfile && \
    pnpm exec prisma generate && \
    pnpm prune --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views
RUN mkdir -p /app/public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# DATABASE_URL must be a volume-mounted path, e.g. file:/app/data/db.sqlite
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/main.js"]
