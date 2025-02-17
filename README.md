# RT Stack

RT stack is a modern [turborepo](https://turbo.build/repo/docs) template for developing fullstack projects with modular components, shared configs and full type-safety.

## About

Below is an overview of all the components in the stack:

```
apps
  ├─ web
  |   ├─ React (vite)
  |   ├─ Tailwindcss
  |   └─ Tanstack (router, query, form)
  ├─ server
  |   └─ Hono (wrapper for api & auth)
packages
  ├─ api
  |   └─ tRPC with valibot
  ├─ auth
  |   └─ Better Auth
  ├─ db
  |   └─ Drizzle ORM (Postgresql)
  ├─ env
  |   └─ @t3-oss/env-core (shared env with validation)
  └─ ui
      ├─ TailwindCSS
      └─ Shadcn & Radix UI
configs
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

Additionally, the following base features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password))
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([tRPC](https://trpc.io/docs/quickstart) API example for creating/listing posts)

View all catalog dependencies in [pnpm-workspace.yaml](pnpm-workspace.yaml).

### Inspirations

Many aspects of the RT Stack were derived [t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo), although there is a strong preference for

- [Valibot](https://valibot.dev) for input validation instead of [zod](https://zod.dev)
- [Tanstack Router](https://tanstack.com/router/latest) (web) + [Hono](https://hono.dev) (server) instead of [NextJS](https://nextjs.org) (fullstack)
- [Better Auth](https://www.better-auth.com) for authentication instead [Auth.js (Next Auth)](https://authjs.dev)

There is also a goal of always supporting the latest major releases of core dependencies, e.g.:

- React v19
- Tailwindcss v4 & Shadcn/UI (canary)
- tRPC V11
- Eslint v9

## Quick Start

### Prerequisites

Ensure the following tools are available on your system:

1. [node](https://nodejs.org/en/download) (version 22+)
1. [pnpm](https://pnpm.io/installation) (version 10+)
1. [postgres](https://www.postgresql.org) database, e.g. using one of
   - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
   - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)

### Setup

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

## Development

```sh
# Start all applications in development mode
pnpm dev
```

### Working with a single component

Use `pnpm --filter=<name>` (where `<name>` is defined in the `package.json` of each component).

Examples:

```sh
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the UI package:
pnpm --filter=@repo/ui format

# Get a list of all package names (for Linux/MacOS):
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

### QOL Scripts:

All scripts are defined in [package.json](package.json) and [turbo.json](turbo.json):

```sh
pnpm typecheck            # repot typescript isses

pnpm format               # report prettier issues
pnpm format:fix           # auto-fix prettier issues

pnpm lint                 # report eslint issues
pnpm lint:fix             # auto-fix eslint issues

pnpm clean                # remove all .cache, .turbo, dist, node_modules

# Migrate all dependencies to a shared catalog in pnpm-workspace.yaml
pnpx codemod pnpm/catalog
```
