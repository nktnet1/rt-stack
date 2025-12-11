FROM node:24-alpine AS base

ENV NODE_ENV=production

WORKDIR /app

# =========================================================================== #

FROM base AS builder-base

ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=1

RUN corepack enable pnpm

# =========================================================================== #

FROM builder-base AS builder

RUN pnpm install --global turbo@^2

COPY . .

RUN turbo prune @repo/db --docker

# =========================================================================== #

FROM builder-base AS installer

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm --filter=db container:build

# =========================================================================== #

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 drizzle

COPY --from=installer --chown=drizzle:nodejs /app/packages/db/dist /app/dist

CMD ["/bin/sh"]
