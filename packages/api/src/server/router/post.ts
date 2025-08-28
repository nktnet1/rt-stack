import { desc, eq } from '@repo/db';
import { post, user } from '@repo/db/schema';
import { protectedProcedure } from '../orpc';

const postRouter = {
  all: protectedProcedure.posts.all.handler(({ context }) => {
    return context.db.query.post.findMany({
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: desc(post.createdAt),
    });
  }),

  one: protectedProcedure.posts.one.handler(
    async ({ context, input, errors }) => {
      const [dbPost] = await context.db
        .select({
          id: post.id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          author: {
            id: user.id,
            name: user.name,
          },
        })
        .from(post)
        .innerJoin(user, eq(post.createdBy, user.id))
        .where(eq(post.id, input.id));

      if (!dbPost) {
        throw errors.MISSING_POST({
          message: `No such post with ID ${input.id}`,
          data: {
            postId: input.id,
          },
        });
      }
      return dbPost;
    },
  ),

  create: protectedProcedure.posts.create.handler(
    async ({ context, input }) => {
      await context.db.insert(post).values({
        createdBy: context.session.user.id,
        ...input,
      });
      return {};
    },
  ),

  delete: protectedProcedure.posts.delete.handler(
    async ({ context, input, errors }) => {
      const res = await context.db.delete(post).where(eq(post.id, input.id));
      if (res.rowCount === 0) {
        throw errors.MISSING_POST({
          message: `No such post with ID ${input.id}`,
          data: {
            postId: input.id,
          },
        });
      }
      return {};
    },
  ),
};

export default postRouter;
