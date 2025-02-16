import { db } from '@repo/db/client';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { env } from '@repo/env';

export const auth = betterAuth({
  trustedOrigins: [env.PUBLIC_WEB_URL],
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
});
