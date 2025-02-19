FROM node:22 AS build

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN npm install -g pnpm
RUN && pnpm install

COPY . ./

RUN pnpm build

# =========================================================================== #

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

ENV WEB_PORT=80
ENV WEB_HOST=0.0.0.0
ENV PUBLIC_WEB_URL=http://localhost:8181

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
