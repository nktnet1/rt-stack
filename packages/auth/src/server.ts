import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { DatabaseInstance } from '@repo/db/client'

export interface AuthOptions {
  webUrl: string
  authSecret: string
  db: DatabaseInstance
}

export type AuthInstance = ReturnType<typeof betterAuth>

export const createAuth = ({ webUrl, db, authSecret }: AuthOptions): AuthInstance => {
  return betterAuth({
    secret: authSecret,
    trustedOrigins: [webUrl].map(url => new URL(url).origin),
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
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
  })
}
