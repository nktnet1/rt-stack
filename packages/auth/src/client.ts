import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface AuthClientOptions {
  apiBaseUrl: string;
}

export const createAuthClient = ({ apiBaseUrl }: AuthClientOptions) =>
  createBetterAuthClient({
    baseURL: apiBaseUrl,
  });
