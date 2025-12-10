FROM node:24-alpine AS base

WORKDIR /app

ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=1

RUN corepack enable pnpm

# =========================================================================== #

FROM base AS builder

RUN pnpm install --global turbo@^2

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune web --docker

# =========================================================================== #

FROM base AS installer

ARG PUBLIC_SERVER_URL
ENV PUBLIC_SERVER_URL=${PUBLIC_SERVER_URL}

ARG PUBLIC_SERVER_API_PATH
ENV PUBLIC_SERVER_API_PATH=${PUBLIC_SERVER_API_PATH}

COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm build

# =========================================================================== #

FROM nginx:stable-alpine AS production

WORKDIR /app

COPY apps/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/web/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail --silent http://0.0.0.0:80/healthcheck || exit 1

CMD ["nginx", "-g", "daemon off;"]
