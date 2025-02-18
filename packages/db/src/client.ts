import { env } from '@repo/env';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export const db = drizzle({
  schema,
  connection: {
    connectionString: env.DATABASE_URL,
  },
});
