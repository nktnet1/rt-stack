
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from "./schema";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const db = drizzle(process.env.POSTGRES_URL!, {
  schema
});