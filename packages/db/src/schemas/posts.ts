import { sql } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-valibot';
import * as v from 'valibot';

export const Post = pgTable('post', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: v.pipe(v.string(), v.maxLength(256)),
  content: v.pipe(v.string(), v.maxLength(256)),
});
