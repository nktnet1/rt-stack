import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { auth } from '@repo/auth/server';
import { env } from '@repo/env';
import { cors } from 'hono/cors';
import { trpcServer } from '@hono/trpc-server';
import { appRouter, createTRPCContext } from '@repo/api/server';
import { logger } from 'hono/logger';

const wildcardPath = {
  ALL: '*',
  BETTER_AUTH: '/api/auth/*',
  TRPC: '/trpc/*',
} as const;

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(logger());

app.use(
  wildcardPath.BETTER_AUTH,
  cors({
    origin: [env.PUBLIC_WEB_URL],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(wildcardPath.ALL, async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set('user', session?.user ?? null);
  c.set('session', session?.session ?? null);
  return next();
});

app.on(['POST', 'GET'], wildcardPath.BETTER_AUTH, (c) =>
  auth.handler(c.req.raw),
);

app.use(
  wildcardPath.TRPC,
  trpcServer({
    router: appRouter,
    createContext: (c) => createTRPCContext({ headers: c.req.headers }),
  }),
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve({
  fetch: app.fetch,
  port: env.API_PORT,
  hostname: env.API_HOST,
});

console.log(`Hono internal server: http://${env.API_HOST}:${env.API_PORT}`);
