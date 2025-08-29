import { serve } from '@hono/node-server';
import { createApi } from '@repo/api/server';
import { createAuth } from '@repo/auth/server';
import { createDb } from '@repo/db/client';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';
import { generateRootHtml } from './utils';

// ========================================================================= //

const trustedOrigins = [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin);

const db = createDb({ databaseUrl: env.SERVER_POSTGRES_URL });
const auth = createAuth({
  webUrl: env.PUBLIC_WEB_URL,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH,
  authSecret: env.SERVER_AUTH_SECRET,
  db,
});
const api = createApi({
  auth,
  db,
  serverUrl: env.PUBLIC_SERVER_URL,
  apiPath: env.PUBLIC_SERVER_API_PATH,
});

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

// ========================================================================= //

app.get('/healthcheck', (c) => {
  return c.text('OK');
});

app.use(logger());

app.get('/', (c) => {
  return c.html(generateRootHtml(env.PUBLIC_WEB_URL, env.PUBLIC_SERVER_URL));
});

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/auth/*`,
  cors({
    origin: trustedOrigins,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
  }),
);

app.on(['POST', 'GET'], `${env.PUBLIC_SERVER_API_PATH}/auth/*`, (c) =>
  auth.handler(c.req.raw),
);

// ========================================================================= //

app.use(
  `${env.PUBLIC_SERVER_API_PATH}/*`,
  cors({
    origin: trustedOrigins,
    credentials: true,
  }),
  async (c, next) => {
    const { matched, response } = await api.handler(c.req.raw);
    if (matched) {
      return c.newResponse(response.body, response);
    }

    await next();
  },
);

// ========================================================================= //

const server = serve(
  {
    fetch: app.fetch,
    port: env.SERVER_PORT,
    hostname: env.SERVER_HOST,
  },
  (info) => {
    const host = info.family === 'IPv6' ? `[${info.address}]` : info.address;
    console.log(`
Hono
- internal server url: http://${host}:${info.port}
- external server url: ${env.PUBLIC_SERVER_URL}
- public web url: ${env.PUBLIC_WEB_URL}
    `);
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
