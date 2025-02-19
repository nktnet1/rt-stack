> [!IMPORTANT]
> This branch contains old commits that were removed before the public release of this Github Repository.

# RT Stack

A modern [turborepo](https://turbo.build/repo/docs) template for building
fullstack projects with modular components, shared configs and 100% type-safety.

## About

### Stack overview

Below is an overview of all the components in the stack:

```
apps
  ├─ web
  |   ├─ react (vite)
  |   ├─ tanstack (router, query, form)
  |   └─ tailwindcss
  ├─ server
  |   └─ hono (wrapper for api & auth)
packages
  ├─ api
  |   └─ trpc with valibot
  ├─ auth
  |   └─ better auth
  ├─ db
  |   └─ drizzle orm (postgresql database)
  ├─ env
  |   └─ @t3-oss/env-core (shared, validated env)
  └─ ui
      ├─ tailwindcss
      └─ shadcn & radix ui
tools
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

View all catalog dependencies in [pnpm-workspace.yaml](pnpm-workspace.yaml).

### Base Functionalities

The following features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password))
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([trpc](https://trpc.io/docs/quickstart) API example for creating/listing posts)

### Inspirations & Goals

Many aspects of the RT Stack were derived from the
[t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo). However,
there is a preference for:

- [tanstack router](https://tanstack.com/router/latest) (web) + [hono](https://hono.dev) (server) instead of [nextjs](https://nextjs.org) (fullstack)
- [better auth](https://www.better-auth.com) for authentication instead [auth.js (next auth)](https://authjs.dev)
- [valibot](https://valibot.dev) for input validation instead of [zod](https://zod.dev)
- [tanstack form](https://tanstack.com/form/latest) instead of [react-hook-form](https://react-hook-form.com)

Additionally, the aim of this project is to always adopting the latest releases
of dependencies and tools. For example:

- react v19
- tailwindcss v4 & shadcn-ui (canary)
- trpc v11
- eslint v9
- pnpm v10

## Quick Start

### Prerequisites

Ensure the following tools are available on your system:

1. [node](https://nodejs.org/en/download) (version 22+)
1. [pnpm](https://pnpm.io/installation) (version 10+)
1. [postgres](https://www.postgresql.org) database, which you can easily run using tools like:
   - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
   - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)
   - [supabase](https://supabase.com)'s free tier cloud database

### Setup

```sh
# Create a repository using the rt-stack template
pnpm dlx create-turbo@latest -e https://github.com/nktnet1/rt-stack

# Install all dependencies for apps and packages
pnpm install

# Set up environment variables by copying the example file
cp .env.example .env

# Start a local postgres instance in the background (e.g. using docker)
docker compose --file ./packages/db/postgres.local.yaml up --detach

# Push drizzle schema to your database
pnpm db:push
```

If you use an external postgres database, modify the `DATABASE_URL` variable in your `.env` file accordingly.

You can then start all applications with

```sh
pnpm dev
```

By default the following URLs will be accesibile:

- web application: http://localhost:8085
- backend server: http://localhost:3035

## Developing

### Working with a single package

Use [pnpm --filter=<name>](https://pnpm.io/filtering) (where `<name>` is defined in the `package.json` of each package).

Example usage:

```sh
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the ui package:
pnpm --filter=@repo/ui format
```

You can get a list of all package names using the command below:

```sh
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

### Adding new shadcn components

To install a single Shadcn/UI component, e.g. `button`, use the command

```sh
pnpm ui-add button
```

You can also open an intera

```sh
pnpm ui-add
```

- press `i` to enter interactive mode on startup
- use `j/k` (or arrow keys) to navigate up and down.
- use `<Space>` to toggle select your desired component(s)
- hit `<Enter>` to install all selected components

### Tooling Scripts:

All scripts are defined in [package.json](package.json) and
[turbo.json](turbo.json):

```sh
pnpm typecheck              # repot typescript isses

pnpm format                 # report prettier issues
pnpm format:fix             # auto-fix prettier issues

pnpm lint                   # report eslint issues
pnpm lint:fix               # auto-fix eslint issues

pnpm clean                  # remove all .cache, .turbo, dist, node_modules

pnpx codemod pnpm/catalog   # migrate dependencies to pnpm-workspace.yaml
```

## Caveats

### Tanstack Router Layout

The following is configured in [vite.config.ts](apps/web/vite.config.ts) web application:

```ts
TanStackRouterVite({
  routeToken: 'layout',
}),
```

This is to allow for a `layout.tsx` file in each directory similar to NextJS.
You can read more about this
[here](https://github.com/TanStack/router/discussions/1102#discussioncomment-10946603).

### Server API

There is an artificial delay added in development mode to simulate API usage in
real-world environments. You can disable this by removing the `timingMiddleware`
in [./packages/api/src/server/trpc.ts](./packages/api/src/server/trpc.ts)
