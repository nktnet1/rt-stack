import * as v from 'valibot';

import { publicWebEnvSchema } from '../env.client.ts';

const { output, issues } = v.safeParse(publicWebEnvSchema, import.meta.env);

if (issues) {
  throw new Error(v.summarize(issues));
}

export const env = output;
