import { createORPCClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import urlJoin from 'url-join';
import type { AppRouter } from '../server';
import type { InferRouterOutputs, RouterClient } from '@orpc/server';

export { isDefinedError, safe } from '@orpc/client';

export type RouterOutput = InferRouterOutputs<AppRouter>;

export interface APIClientOptions {
  serverUrl: string;
}

export const createAPIClient = ({ serverUrl }: APIClientOptions) => {
  const link = new RPCLink({
    url: urlJoin(serverUrl, 'rpc'),
    fetch: (request, init) => {
      return globalThis.fetch(request, {
        ...init,
        credentials: 'include',
      });
    },
  });
  return createORPCClient<RouterClient<AppRouter>>(link);
};

export const createTanstackQueryAPIClient = (opts: APIClientOptions) => {
  const apiClient = createAPIClient(opts);
  return createTanstackQueryUtils(apiClient);
};
