import { type BetterAuthOptions, betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import urlJoin from 'url-join';
import type { DatabaseInstance } from '@repo/db/client';

export interface AuthOptions {
  webUrl: string;
  serverUrl: string;
  apiPath: `/${string}`;
  authSecret: string;
  db: DatabaseInstance;
}

export type AuthInstance = ReturnType<typeof createAuth>;

/**
 * This function is abstracted for schema generations in cli-config.ts
 */
export const getBaseOptions = (db: DatabaseInstance) =>
  ({
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),

    /**
     * Only uncomment the line below if you are using plugins, so that
     * your types can be correctly inferred:
     */
    plugins: [openAPI()],
  }) satisfies BetterAuthOptions;

export const createAuth = ({
  webUrl,
  serverUrl,
  apiPath,
  db,
  authSecret,
}: AuthOptions) => {
  return betterAuth({
    ...getBaseOptions(db),
    baseURL: urlJoin(serverUrl, apiPath, 'auth'),
    secret: authSecret,
    trustedOrigins: [webUrl].map((url) => new URL(url).origin),
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60,
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
  });
};
