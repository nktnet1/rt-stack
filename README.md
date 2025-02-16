# Vitalised Stack 



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
