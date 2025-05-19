import { serve } from '@hono/node-server';
import { trpcServer } from '@hono/trpc-server';
import { createApi } from '@repo/api/server';
import { createAuth } from '@repo/auth/server';
import { createDb } from '@repo/db/client';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

const wildcardPath = {
  ALL: '*',
  BETTER_AUTH: '/api/auth/*',
  TRPC: '/trpc/*',
} as const;

const db = createDb({ databaseUrl: env.SERVER_POSTGRES_URL });
const auth = createAuth({
  authSecret: env.SERVER_AUTH_SECRET,
  db,
  webUrl: env.PUBLIC_WEB_URL,
});
const api = createApi({ auth, db });

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.get('/healthcheck', (c) => {
  return c.text('OK');
});

app.use(logger());

app.use(
  wildcardPath.BETTER_AUTH,
  cors({
    origin: trustedOrigins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.use(
  wildcardPath.TRPC,
  cors({
    origin: trustedOrigins,
    credentials: true,
  }),
);

app.on(['POST', 'GET'], wildcardPath.BETTER_AUTH, (c) =>
  auth.handler(c.req.raw),
);

app.use(
  wildcardPath.TRPC,
  trpcServer({
    router: api.trpcRouter,
    createContext: (c) => api.createTRPCContext({ headers: c.req.headers }),
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const server = serve(
  {
    fetch: app.fetch,
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
  },
  (info) => {
    const host = info.family === 'IPv6' ? `[${info.address}]` : info.address;
    console.log(`Hono internal server: http://${host}:${info.port}`);
  },
);

const shutdown = () => {
  server.close((error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('\nServer has stopped gracefully.');
    }
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
