import * as v from 'valibot';

const envSchema = v.object({
  DB_POSTGRES_URL: v.string(),
});

export const env = v.parse(envSchema, process.env);
