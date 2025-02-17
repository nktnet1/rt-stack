RT stack is a modern [turborepo](https://turbo.build/repo/docs) template for developing fullstack projects with modular components, shared configs and full type-safety.

- [About](#about)
  - [Stack overview](#stack-overview)
  - [Base Functionalities](#base-functionalities)
  - [Inspirations & Goals](#inspirations--goals)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Development](#development)
  - [Working with a single component](#working-with-a-single-component)
  - [Other QOL Scripts:](#other-qol-scripts)

# About

## Stack overview

Below is an overview of all the components in the stack:

```
apps
  ├─ web
  |   ├─ react (vite)
  |   ├─ tailwindcss
  |   └─ tanstack (router, query, form)
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
configs
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

View all catalog dependencies in [pnpm-workspace.yaml](pnpm-workspace.yaml).

## Base Functionalities

The following features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password))
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([trpc](https://trpc.io/docs/quickstart) API example for creating/listing posts)

## Inspirations & Goals

Many aspects of the RT Stack were derived from the [t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).
However, there is a strong preference for:

- [tanstack router](https://tanstack.com/router/latest) (web) + [hono](https://hono.dev) (server) instead of [nextjs](https://nextjs.org) (fullstack)
- [better auth](https://www.better-auth.com) for authentication instead [auth.js (next auth)](https://authjs.dev)
- [valibot](https://valibot.dev) for input validation instead of [zod](https://zod.dev)

Additionally, the aim of this project is to always adopting the latest releases of dependencies and tools. For example:

- react v19
- tailwindcss v4 & shadcn-ui (canary)
- trpc v11
- eslint v9
- pnpm v10

# Quick Start

## Prerequisites

Ensure the following tools are available on your system:

1. [node](https://nodejs.org/en/download) (version 22+)
1. [pnpm](https://pnpm.io/installation) (version 10+)
1. [postgres](https://www.postgresql.org) database, e.g. using one of
   - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
   - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)

## Setup

```sh
# Install all dependencies for apps and packages
pnpm install

# Set up environment variables by copying the example file
cp .env.example .env

# Start a local postgres instance in the background (e.g. using docker)
docker compose --file ./packages/db/postgres.local.yaml up --detach

# Push drizzle schema to your database
pnpm db:push
```

# Development

```sh
# Start all applications in development mode
pnpm dev
```

## Working with a single component

Use [pnpm --filter=<name>](https://pnpm.io/filtering) (where `<name>` is defined in the `package.json` of each component).

You can get a list of all package names using the command:

```sh
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

Example usage:

```sh
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the UI package:
pnpm --filter=@repo/ui format
```

## Other QOL Scripts:

All scripts are defined in [package.json](package.json) and [turbo.json](turbo.json):

```sh
pnpm typecheck              # repot typescript isses

pnpm format                 # report prettier issues
pnpm format:fix             # auto-fix prettier issues

pnpm lint                   # report eslint issues
pnpm lint:fix               # auto-fix eslint issues

pnpm clean                  # remove all .cache, .turbo, dist, node_modules

pnpx codemod pnpm/catalog   # migrate dependencies to pnpm-workspace.yaml
```
