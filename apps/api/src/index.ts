import { serve } from '@hono/node-server';
import { auth } from '@repo/auth';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

const port = parseInt(process.env.BACKEND_PORT ?? '3000');
console.log(`Server is running on http://localhost:${port}`);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

serve({
  fetch: app.fetch,
  port,
});
