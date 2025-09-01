import { adminClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';
import urlJoin from 'url-join';

export interface AuthClientOptions {
  apiBaseUrl: string;
  apiBasePath: string;
}

export const createAuthClient = ({
  apiBaseUrl,
  apiBasePath,
}: AuthClientOptions) =>
  createBetterAuthClient({
    baseURL: urlJoin(apiBaseUrl, apiBasePath, 'auth'),

    /**
     * Only uncomment the line below if you are using plugins, so that
     * your types can be correctly inferred.
     * Ensure that you are using the client-side version of the plugin,
     * e.g. `adminClient` instead of `admin`.
     */
    plugins: [adminClient(), organizationClient()],
  });
