import { pushSchema } from 'drizzle-kit/api';
import type { PgDatabase, PgQueryResultHKT } from 'drizzle-orm/pg-core';
import { createDb } from '../client';
import * as schema from '../schema';
import { env } from './env';

const dbPush = async () => {
  const db = createDb({ databaseUrl: env.DB_POSTGRES_URL, max: 1 });
  const res = await pushSchema(
    schema,
    db as unknown as PgDatabase<PgQueryResultHKT>,
  );
  console.log('Has data loss:', res.hasDataLoss);
  console.log('Warnings:', res.warnings);
  return res.apply();
};

if (import.meta.url === `file://${process.argv[1]}`) {
  void dbPush()
    .then(() => {
      console.log('Database pushed successfully.');
      process.exit(1);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
