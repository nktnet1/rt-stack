import { adminClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const createAuthClient = ({ apiBaseUrl }: AuthClientOptions) => {
  const client = createBetterAuthClient({
    baseURL: apiBaseUrl,
    plugins: [adminClient(), organizationClient()],
  });
  return client;
};
