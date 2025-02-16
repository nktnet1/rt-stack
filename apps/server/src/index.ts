import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from '@repo/auth/server';
import { env } from '@repo/env/server';
import { cors } from 'hono/cors';

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  '/api/auth/*',
  cors({
    origin: [env.VITE_PUBLIC_WEB_URL],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
    return next();
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port: env.API_PORT,
});

console.log(`Server is running on http://localhost:${env.API_PORT}`);
