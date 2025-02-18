import { sql } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-valibot';
import * as v from 'valibot';
import { user } from './auth';

export const post = pgTable('post', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  createdBy: t
    .text()
    .references(() => user.id)
    .notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  updatedBy: t.text().references(() => user.id),
}));

export const CreatePostSchema = v.omit(
  createInsertSchema(post, {
    title: v.pipe(v.string(), v.maxLength(256)),
    content: v.pipe(v.string(), v.maxLength(256)),
  }),
  ['id', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'],
);
