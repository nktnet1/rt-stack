import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { env } from '@repo/env';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.PUBLIC_API_URL,
    }),
  ],
});
