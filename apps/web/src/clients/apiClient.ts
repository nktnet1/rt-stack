import { createTanstackQueryAPIClient } from '@repo/api/client';
import { env } from '@/env';

export const apiClient = createTanstackQueryAPIClient({
  serverUrl: env.PUBLIC_SERVER_URL,
  prefix: '/api',
});
