import type { Config } from 'drizzle-kit';
import * as v from 'valibot';

const envSchema = v.object({
  DB_POSTGRES_URL: v.pipe(v.string(), v.minLength(1)),
});

const env = v.parse(envSchema, process.env);

// Supabase pooling URL uses 6543, which we don't need for migrations
const nonPoolingUrl = env.DB_POSTGRES_URL.replace(':6543', ':5432');

export default {
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: nonPoolingUrl },
  casing: 'snake_case',
} satisfies Config;
