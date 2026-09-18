import * as v from 'valibot';

import { apiPathSchema, publicBasePathSchema } from '../env.shared.ts';

const envSchema = v.object({
  /**
   * This is the backend API server. Note that this should be passed as
   * a build-time variable (ARG) in docker.
   */
  PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  PUBLIC_SERVER_API_PATH: v.optional(apiPathSchema, '/api'),

  /**
   * Set this if you want to run or deploy your app at a base URL. This is
   * usually required for deploying a repository to GitHub/GitLab Pages.
   */
  PUBLIC_BASE_PATH: publicBasePathSchema,
});

const { output, issues } = v.safeParse(envSchema, import.meta.env);

if (issues) {
  throw new Error(v.summarize(issues));
}

export const env = output;
