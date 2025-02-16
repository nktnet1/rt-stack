# Building from scratch

## Getting Started

1. Clone the repository
    ```sh
    git clone <URL>
    ```

1. Install dependencies
    ```sh
    pnpm install
    ```

1. Set up environment variables
    ```sh
    cp .env.example .env
    ```

1. Start a local postgres instance (if you use use an external database, modify the `POSTGRES_URL` in your `.env` file)
    ```sh
    docker compose -f ./packages/db/postgres.local.yaml up --detach
    ```

1. Start all applications in development mode:
   ```sh
   pnpm dev
   ```
