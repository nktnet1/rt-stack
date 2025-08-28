import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const createAuthClient = ({ apiBaseUrl }: AuthClientOptions) =>
  createBetterAuthClient({
    baseURL: apiBaseUrl,

    /**
     * Only uncomment the line below if you are using plugins, so that
     * your types can be correctly inferred.
     * Ensure that you are using the client-side version of the plugin,
     * e.g. `adminClient` instead of `admin`.
     */
    plugins: [],
  });
