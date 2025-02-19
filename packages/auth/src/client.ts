import { env } from '@repo/env';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: env.PUBLIC_API_URL,
});
