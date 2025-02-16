import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { env } from '@repo/env/client';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.VITE_PUBLIC_API_URL,
    }),
  ],
});
