import { serve } from '@hono/node-server';
import { createApi } from '@repo/api/server';
import { createAuth } from '@repo/auth/server';
import { createDb } from '@repo/db/client';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

const db = createDb({ databaseUrl: env.SERVER_POSTGRES_URL });
const auth = createAuth({
  authSecret: env.SERVER_AUTH_SECRET,
  db,
  webUrl: env.PUBLIC_WEB_URL,
});
const api = createApi({ auth, db, prefix: '/rpc' });

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

// ========================================================================= //

app.use(
  '/api/auth/*',
  cors({
    origin: trustedOrigins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

// ========================================================================= //

app.use(
  '/rpc/*',
  cors({
    origin: trustedOrigins,
    credentials: true,
  }),
);

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await api.handler(c.req.raw);
  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

// ========================================================================= //

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
