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

COPY . .

RUN pnpm dlx turbo prune web --docker

# =========================================================================== #

FROM base AS installer

ARG PUBLIC_SERVER_URL
ENV PUBLIC_SERVER_URL=${PUBLIC_SERVER_URL}

ARG PUBLIC_SERVER_API_PATH
ENV PUBLIC_SERVER_API_PATH=${PUBLIC_SERVER_API_PATH}

ARG PUBLIC_BASE_PATH=/
ENV PUBLIC_BASE_PATH=${PUBLIC_BASE_PATH}

COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm build

# =========================================================================== #

FROM nginx:stable-alpine AS production

ARG PUBLIC_BASE_PATH=/
ENV PUBLIC_BASE_PATH=${PUBLIC_BASE_PATH}

WORKDIR /app

COPY apps/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=installer /app/apps/web/dist /tmp/web-dist
RUN set -eux; \
    cp -R /tmp/web-dist/. /usr/share/nginx/html/; \
    base_path="$(printf '%s' "$PUBLIC_BASE_PATH" | sed -e 's#//*#/#g' -e 's#^/##' -e 's#/$##')"; \
    if [ -n "$base_path" ]; then \
      mkdir -p "/usr/share/nginx/html/$base_path"; \
      cp -R /tmp/web-dist/. "/usr/share/nginx/html/$base_path/"; \
    fi; \
    rm -rf /tmp/web-dist

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail --silent http://0.0.0.0:80/healthcheck || exit 1

CMD ["nginx", "-g", "daemon off;"]
