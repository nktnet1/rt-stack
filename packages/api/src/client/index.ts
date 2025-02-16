import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { env } from '../env';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.API_URL,
    }),
  ],
});
