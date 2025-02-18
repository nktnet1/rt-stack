import * as v from 'valibot';

import { desc, eq } from '@repo/db';
import { CreatePostSchema, post } from '@repo/db/schema';

import { protectedProcedure, publicProcedure, router } from '../trpc';

const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findMany({
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: desc(post.id),
    });
  }),

  one: publicProcedure
    .input(v.object({ id: v.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.post.findFirst({
        where: eq(post.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(post).values({
        createdBy: ctx.session.user.id,
        ...input,
      });
    }),

  delete: protectedProcedure.input(v.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(post).where(eq(post.id, input));
  }),
});

export default postRouter;
