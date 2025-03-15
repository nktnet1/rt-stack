import { createAuthClient } from '@repo/auth/client';
import { env } from '@/env';

export const authClient = createAuthClient({
  apiBaseUrl: env.PUBLIC_SERVER_URL,
});
