import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export type AuthClient = ReturnType<
  typeof createBetterAuthClient<{ plugins: [ReturnType<typeof adminClient>] }>
>;

export const createAuthClient = ({
  apiBaseUrl,
}: AuthClientOptions): AuthClient =>
  createBetterAuthClient({
    baseURL: apiBaseUrl,
    plugins: [adminClient()],
  });

export const authClient: AuthClient = createAuthClient({
  apiBaseUrl: '',
});

const { admin } = authClient;
void admin;
