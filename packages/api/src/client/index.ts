import { createORPCClient } from '@orpc/client';
import { ResponseValidationPlugin } from '@orpc/contract/plugins';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import urlJoin from 'url-join';
import type {
  ContractRouterClient,
  InferContractRouterOutputs,
} from '@orpc/contract';
import { appContract } from '../contracts';

export { isDefinedError, safe } from '@orpc/client';

export interface APIClientOptions {
  serverUrl: string;
  apiPath: `/${string}`;
}

// Oddly, this is needed for better-auth to not complain
export type { AppRouter } from '../server';

export type RouterOutput = InferContractRouterOutputs<typeof appContract>;

export const createAPIClient = ({ serverUrl, apiPath }: APIClientOptions) => {
  const link = new OpenAPILink(appContract, {
    url: urlJoin(serverUrl, apiPath),
    plugins: [new ResponseValidationPlugin(appContract)],
    fetch: (request, init) => {
      return globalThis.fetch(request, {
        ...init,
        credentials: 'include',
      });
    },
  });
  const client: ContractRouterClient<typeof appContract> =
    createORPCClient(link);

  return client;
};

export const createTanstackQueryAPIClient = (opts: APIClientOptions) => {
  const apiClient = createAPIClient(opts);
  return createTanstackQueryUtils(apiClient);
};
