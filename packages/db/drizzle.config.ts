import { getAppEnv } from '@repo/env/create';
import type { Config } from 'drizzle-kit';

const env = getAppEnv();

if (!env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

const nonPoolingUrl = env.DATABASE_URL.replace(':6543', ':5432');

export default {
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: nonPoolingUrl },
  casing: 'snake_case',
} satisfies Config;
