import { serve } from '@hono/node-server';
import { auth } from '@repo/auth';
import { Hono } from 'hono';
import { env } from './env.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const port = env.BACKEND_PORT;
console.log(`Server is running on http://localhost:${port}`);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port,
});
