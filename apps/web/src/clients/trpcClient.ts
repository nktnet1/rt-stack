import { createTrpcClient } from '@repo/api/client';
import { env } from '#web/env';

export const trpcClient = createTrpcClient({
  serverUrl: env.PUBLIC_SERVER_URL,
});
