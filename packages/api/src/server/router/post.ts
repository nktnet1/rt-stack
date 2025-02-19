import * as v from 'valibot';

import { alias, desc, eq } from '@repo/db';
import { CreatePostSchema, post, user } from '@repo/db/schema';

import { protectedProcedure, publicProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';

const postRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.post.findMany({
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: desc(post.createdAt),
    });
  }),

  one: publicProcedure
    .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
    .query(async ({ ctx, input }) => {
      const updateUser = alias(user, 'update_user');
      const [dbPost] = await ctx.db
        .select({
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          author: {
            id: user.id,
            name: user.name,
          },
          lastUpdateUser: {
            id: updateUser.id,
            name: updateUser.name,
          },
        })
        .from(post)
        .innerJoin(user, eq(post.createdBy, user.id))
        .leftJoin(updateUser, eq(post.updatedBy, updateUser.id))
        .where(eq(post.id, input.id));

      if (!dbPost) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `No such post with ID ${input.id}`,
        });
      }
      return dbPost;
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(post).values({
        createdBy: ctx.session.user.id,
        ...input,
      });
      return {};
    }),

  delete: protectedProcedure
    .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(post).where(eq(post.id, input.id));
      if (res.rowCount === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `No such post with id ${input.id}`,
        });
      }
      return {};
    }),
});

export default postRouter;
