import * as v from 'valibot';

const envSchema = v.object({
  DB_POSTGRES_URL: v.string(),
});

const { output, issues } = v.safeParse(envSchema, process.env);

if (issues) {
  throw new Error(v.summarize(issues));
}

export const env = output;
