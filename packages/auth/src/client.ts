import { createAuthClient } from 'better-auth/react';
import { env } from '@repo/env';

export const authClient = createAuthClient({
  baseURL: env.PUBLIC_API_URL,
});
