<table>
  <tr>
    <td>
      <a href="https://nktnet1.github.io/rt-stack" target="_blank">
        <img align="absmiddle" width="40" src="./apps/web/public/favicon.png">
      </a>
    </td>
    <td>
      <h1>
        <a href="https://nktnet1.github.io/rt-stack" target="_blank">RT Stack</a>
      </h1>
    </td>
  </tr>
</table>

A modern [turborepo](https://turbo.build/repo/docs) template for building
fullstack projects with modular components, shared configs, containerised
deployments and 100% type-safety.

- [About](#about)
  - [Stack overview](#stack-overview)
  - [Base Functionalities](#base-functionalities)
  - [Inspirations & Goals](#inspirations--goals)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Using an External Database](#using-an-external-database)
- [Developing](#developing)
  - [Working with a single package](#working-with-a-single-package)
  - [Adding new shadcn components](#adding-new-shadcn-components)
  - [Tooling Scripts](#tooling-scripts)
- [Containerisation (Docker/Podman)](#containerisation-dockerpodman)
- [Deployment](#deployment)
  - [Using Containers](#using-containers)
  - [Using Major Platforms](#using-major-platforms)
- [Other Notes](#other-notes)
  - [Tanstack Router Layout](#tanstack-router-layout)
  - [Server API Artificial Delays](#server-api-artificial-delays)
  - [Better Auth Plugins](#better-auth-plugins)
  - [Environment Variables](#environment-variables)

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
  ├─ ui
  |   ├─ tailwindcss
  |   └─ shadcn & radix ui
tools
  ├─ eslint
  ├─ prettier
  ├─ tailwind
  └─ typescript
```

View all catalog dependencies in [pnpm-workspace.yaml](pnpm-workspace.yaml).

### Base Functionalities

The following features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password)) credentials provider
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([trpc](https://trpc.io/docs/quickstart) API example for creating/listing posts)

You can visit the [live demo](https://nktnet1.github.io/rt-stack) to see these features in action.

### Inspirations & Goals

Many aspects of the RT Stack were derived from the
[t3-oss/create-t3-turbo](https://github.com/t3-oss/create-t3-turbo). However,
there is a preference for:

- [tanstack router](https://tanstack.com/router/latest) (web) + [hono](https://hono.dev) (server) instead of [nextjs](https://nextjs.org) (fullstack)
- [better auth](https://www.better-auth.com) for authentication instead [auth.js (next auth)](https://authjs.dev)
- [valibot](https://valibot.dev) for input validation instead of [zod](https://zod.dev)
- [tanstack form](https://tanstack.com/form/latest) instead of [react-hook-form](https://react-hook-form.com)
- using `.env` in each application/package instead of globally, as per [turborepo's recommendations](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#best-practices)

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

```bash
# Create a repository using the rt-stack template (replace YOUR_PROJECT)
pnpm dlx create-turbo@latest -m pnpm -e https://github.com/nktnet1/rt-stack YOUR_PROJECT

# Enter the directory or open in your IDE (replace YOUR_PROJECT)
cd YOUR_PROJECT

# Install all dependencies for apps and packages
pnpm install

# Copy .env.example to .env for all applications and the @repo/db package
pnpm env:copy-example

# Start a local postgres instance in the background (e.g. using docker)
docker compose up db --detach

# Push drizzle schema to your database
pnpm db:push
```

You can then start all applications with

```bash
pnpm dev
```

By default the following URLs will be accesibile:

- web application: http://localhost:8085
- backend server: http://localhost:3035

### Using an External Database

When using an external postgres database (e.g. from [supabase](https://supabase.com)), you can skip the step that spins up a local postgres instance with docker.

Instead, you will need to modify the following environment variables:

1. `SERVER_POSTGRES_URL` in the file `apps/server/.env`

   - used at runtime by the backend server in `pnpm dev`

1. `DB_POSTGRES_URL` in the file `packages/db/.env`
   - used in database schema migrations with `pnpm db:push`

## Developing

### Working with a single package

Use [`pnpm --filter=<name>`](https://pnpm.io/filtering) (where `<name>` is
defined in the `package.json` of each package).

Example usage:

```bash
# Install the nuqs package for our web application:
pnpm --filter=web install nuqs

# Format only the ui package:
pnpm --filter=@repo/ui format
```

You can get a list of all package names using the command below:

```bash
find . -maxdepth 3 -name "package.json" -exec grep '"name":' {} \;
```

### Adding new shadcn components

To install a single Shadcn/UI component, e.g. `button`, use the command

```bash
pnpm ui-add button
```

You can also open an interactive session to select components using a TUI by not passing any arguments

```bash
pnpm ui-add
```

- press `i` to enter interactive mode on startup
- use `j/k` (or arrow keys) to navigate up and down.
- use `<Space>` to toggle select your desired component(s)
- hit `<Enter>` to install all selected components

### Tooling Scripts

All scripts are defined in [package.json](package.json) and
[turbo.json](turbo.json):

```bash
pnpm typecheck              # repot typescript isses

pnpm format                 # report prettier issues
pnpm format:fix             # auto-fix prettier issues

pnpm lint                   # report eslint issues
pnpm lint:fix               # auto-fix eslint issues

pnpm clean                  # remove all .cache, .turbo, dist, node_modules

pnpx codemod pnpm/catalog   # migrate dependencies to pnpm-workspace.yaml
```

## Containerisation (Docker/Podman)

Both the `web` and `server` applications have been containerised. You can start
see this in action by running the commands:

```bash
# Start all applications
docker-compose up

# Push drizzle schema to your database - while you can use `pnpm db:push` on
# the host machine if you have installed all the required dependencies, it is
# also possible to do everything within docker.
# Open a second terminal and run the command:
docker compose run --rm drizzle

# Upon completion, you will be inside the `drizzle` docker container instead
# of the host machine. It is now possible to push the schema with:
pnpm db:push
```

You can then open the web link below in your browser:

- http://localhost:8085

Please note that these containers are run in production mode. For further
details, see

- [compose.yaml](compose.yaml)
- [apps/server/Dockerfile](apps/server/Dockerfile)
- [apps/web/Dockerfile](apps/web/Dockerfile)
- [apps/web/nginx.conf](apps/web/nginx.conf)

## Deployment

> [!TIP]
> The [live demo](https://nktnet1.github.io/rt-stack) of RT Stack is currently deployed to
>
> - github pages for the web frontend
> - fly.io for the server backend and postgres database

### Using Containers

You can deploy applications to any services that supports docker deployment.

Using docker compose (see [compose.yaml](compose.yaml)) is also an option,
although this alone may not be production-ready at scale. However, it can be
paired with

- reverse proxies and load balancers offered by tools like
  [Traefik](https://github.com/traefik/traefik) or
  [Caddy](https://github.com/caddyserver/caddy)
- container orchestration platforms like [Docker Swarm](https://docs.docker.com/engine/swarm) and [Kubernetes](https://kubernetes.io)

Personally, I recommend setting up a Virtual Private Server (e.g. on [Hetzner](https://www.hetzner.com))
and make use of self-hostable PaaS software which automatically handles the complexity of deployment
mentioned above for you - these includes:

- Coolify
  - https://github.com/coollabsio/coolify
  - https://www.coolify.io
- Dokploy
  - https://github.com/Dokploy/dokploy
  - http://dokploy.com

Do note that for the **web** application, the `PUBLIC_SERVER_URL` variable
available at build time (as a docker build argument), rather than an environment
variable at runtime.

Also, both the **server** application's `PUBLIC_WEB_URL` and the **web**
application's `PUBLIC_SERVER_URL` needs to be set as internet-accessible URLs
when deployed, e.g. `https://mycompany.com` and `https://api.mycompany.com`,
rather than referencing `http://localhost:8085` like in development.

### Using Major Platforms

The **web** application is a simple React static site powered by Vite, which is
easily deployed to platforms such as GitHub/GitLab pages, Vercel and Netlify.
You can refer to the [vite documentation](https://vite.dev/guide/static-deploy)
for deployment guides on all major platforms.

The **server** application uses the [hono](https://hono.dev) web framework with
the [NodeJS runtime](https://hono.dev/docs/getting-started/nodejs). However,
this can be exchanged with other runtimes before deploying to your chosen
platforms. For example, deploying to Netlify is covered within
[Hono's documentations](https://hono.dev/docs/getting-started/netlify#_4-deploy).

## Other Notes

### Tanstack Router Layout

The following is configured in [vite.config.ts](apps/web/vite.config.ts) web
application:

```ts
TanStackRouterVite({
  routeToken: 'layout',
}),
```

This is to allow for a `layout.tsx` file in each directory similar to NextJS.
You can read more about this
[here](https://github.com/TanStack/router/discussions/1102#discussioncomment-10946603).

### Server API Artificial Delays

There is an artificial delay added in development mode to simulate API usage in
real-world environments. You can disable this by removing the `timingMiddleware`
in [./packages/api/src/server/trpc.ts](./packages/api/src/server/trpc.ts)

### Better-Auth Plugins

When adding new plugins to better-auth, you should also update the `AuthClient`
type definition. For example, when adding the [admin plugin](https://www.better-auth.com/docs/plugins/admin):

```ts
export type AuthClient = ReturnType<
  typeof createBetterAuthClient<{ plugins: [ReturnType<typeof adminClient>] }>
>;
```

The full code is available in the [better-auth-admin-plugin](https://github.com/nktnet1/rt-stack/tree/better-auth-admin-plugin) branch.

### Environment Variables

This template was made to follow the the recommendation of

- @tyleralbee in [this turborepo's GitHub discussion](https://github.com/vercel/turborepo/discussions/9458#discussioncomment-11443969)
- @cjkihl in [create-t3-turbo issue #397](https://github.com/t3-oss/create-t3-turbo/issues/397#issuecomment-1630028405)
- turborepo official docs on [environment variables best practices](https://turbo.build/repo/docs/crafting-your-repository/using-environment-variables#best-practices)

In using this template, it is recommended that

1. each application has a local `.env` file instead of a global `.env` at the
   root of your repository
1. packages should be pure, i.e. rely on factory methods and receiving inputs to
   instantiate rather than consuming environment variables directly
   - one exception is the `@repo/db` package, which requires the
     `DB_POSTGRES_URL` variable for schema migration with `pnpm db:push`
1. environent variables are prefixed, e.g. `SERVER_AUTH_SECRET` instead of
   `AUTH_SECRET`. Caching in the app's `turbo.json` can then be configured to
   use wildcards such as:
   ```json
   "tasks": {
      "build": {
        "env": ["SERVER_*"],
      }
    }
   ```

There is also a script that creates a `.env` from `.env.example` of each
app/package, which can be run with:

```bash
# NOTE: This will not overwrite existing local .env files
pnpm env:copy-example

# To reset any modifications to your .env and restore the examples, run:
pnpm env:remove
pnpm env:copy-example
```

It is recommended that any new apps that uses environment variables follow the
example script set in [apps/server/package.json](apps/server/package.json).
