import { env } from '@repo/env';
import type { Config } from 'drizzle-kit';

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
