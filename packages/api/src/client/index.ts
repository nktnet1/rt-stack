import { env } from '@repo/env';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';
import urlJoin from 'url-join';
import type { AppRouter } from '../server';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: urlJoin(env.PUBLIC_API_URL, 'trpc'),
      transformer: SuperJSON,
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
