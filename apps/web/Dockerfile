FROM node:22-alpine AS build

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN npm i -g corepack@latest && corepack enable pnpm && pnpm i --frozen-lockfile

COPY . ./

RUN pnpm build

# =========================================================================== #

FROM node:22-alpine AS prod
WORKDIR /app

RUN npm i -g serve
COPY --from=build /app/apps/web/dist /app/dist

ENV WEB_PORT=3000
ENV WEB_HOST=0.0.0.0
ENV PUBLIC_WEB_URL=http://0.0.0.0:3000

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
