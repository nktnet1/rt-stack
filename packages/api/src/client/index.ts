import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import urlJoin from 'url-join';
import type {
  ContractRouterClient,
  InferContractRouterOutputs,
} from '@orpc/contract';
import type { JsonifiedClient } from '@orpc/openapi-client';
import { appContract } from '../contracts';

export { isDefinedError, safe } from '@orpc/client';

export interface APIClientOptions {
  serverUrl: string;
  prefix: `/${string}`;
}

// Oddly, this is needed for better-auth to not complain
export type { AppRouter } from '../server';

export type RouterOutput = InferContractRouterOutputs<typeof appContract>;

export const createAPIClient = ({ serverUrl, prefix }: APIClientOptions) => {
  const link = new OpenAPILink(appContract, {
    url: urlJoin(serverUrl, prefix),
    fetch: (request, init) => {
      return globalThis.fetch(request, {
        ...init,
        credentials: 'include',
      });
    },
  });
  const client: JsonifiedClient<ContractRouterClient<typeof appContract>> =
    createORPCClient(link);

  return client;
};

export const createTanstackQueryAPIClient = (opts: APIClientOptions) => {
  const apiClient = createAPIClient(opts);
  return createTanstackQueryUtils(apiClient);
};
