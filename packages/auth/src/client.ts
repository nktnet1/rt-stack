import { createAuthClient } from 'better-auth/react';
import { env } from '@repo/env/client';

export const authClient = createAuthClient({
  baseURL: env.VITE_PUBLIC_WEB_URL,
});
