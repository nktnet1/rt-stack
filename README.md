# RT Stack 

## Background

RT stack is a modern [turborepo](https://turbo.build/repo/docs) template that drew many inspirations from
[t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

```
apps
  ├─ web
  |   ├─ React V19 (vite)
  |   └─ Tanstack (router, query, form)
  ├─ server
  |   └─ Hono (wrapper for api & auth)
packages
  ├─ api
  |   ├─ tRPC v11
  |   └─ Valibot (zod, but lightweight)
  ├─ auth
  |   └─ Better Auth
  ├─ db
  |   └─ Drizzle ORM (Postgresql)
  ├─ env
  |   └─ @t3-oss/env-core (shared env with validation)
  └─ ui
      ├─ TailwindCSS V4
      └─ Shadcn & Radix UI
configs
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

For a full list of dependencies, see the [pnpm-workspace.yaml](pnpm-workspace.yaml) catalog.

Additionally, the following base features are implemented out-of-the-box:
- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password))
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server API integration (posts list/creation similar to create-t3-turbo)

## Getting Started

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

## Maintainence

The scripts below are set up in the project root's [package.json](package.json) and [turbo.json](turbo.json):

```sh
pnpm typecheck      # repot typescript isses

pnpm format         # report prettier issues
pnpm format:fix     # auto-fix prettier issues

pnpm lint           # report eslint issues
pnpm lint:fix       # auto-fix eslint issues

pnpm clean          # remove all .cache, .turbo, dist, node_modules
```
