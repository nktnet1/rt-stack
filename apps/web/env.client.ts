import { apiPathSchema } from '@repo/api/path';
import * as v from 'valibot';

import { publicBasePathSchema } from './env.shared.ts';

export const publicWebEnvEntries = {
  /** Backend API server URL. */
  PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  PUBLIC_SERVER_API_PATH: v.optional(apiPathSchema, '/api'),
  PUBLIC_BASE_PATH: publicBasePathSchema,
};

export const publicWebEnvSchema = v.object(publicWebEnvEntries);
