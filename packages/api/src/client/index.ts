import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { env } from '@repo/env';
import urlJoin from 'url-join';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(env.PUBLIC_API_URL, 'trpc'),
    }),
  ],
});
