# RT-Stack 

## Background

The RT-stack is a [turborepo](https://turbo.build/repo/docs) template that drew many inspirations from
[t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo). It contains the following apps, packages and shared tooling configs:

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
  |   └─ Drizzle ORM + Postgresql
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
- 

## Getting Started

### Prerequisites

Ensure the following tools are available on your system:
1. [node](https://nodejs.org/en/download) (version 22+)
1. [pnpm](https://pnpm.io/installation)
1. [postgres](https://www.postgresql.org) database, e.g. using one of
    - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
    - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)

### Setup Instructions

1. Install dependencies for all apps and packages
    ```sh
    pnpm install
    ```

1. Set up environment variables
    ```sh
    cp .env.example .env
    ```

1. Start a local postgres instance, e.g.
    ```sh
    # Remove --detach to run it in the foreground
    docker compose -f ./packages/db/postgres.local.yaml up --detach
    ```
    If you use use an external database, modify the `POSTGRES_URL` in your `.env` file accordingly.

1. Apply database migrations
    ```sh
    pnpm db:push
    ```

1. Start all applications in development mode:
    ```sh
    pnpm dev
    ```
