import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import { env } from '@repo/env';
import urlJoin from 'url-join';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(env.PUBLIC_API_URL, 'trpc'),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          /**
           * https://trpc.io/docs/client/cors
           *
           * This is required if you are deploying your frontend (web)
           * and backend (server) on two different domains.
           */
          credentials: 'include',
        });
      },
    }),
  ],
});
