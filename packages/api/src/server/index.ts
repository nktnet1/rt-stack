import postRouter from './router/post';
import { createTRPCContext, publicProcedure, router } from './trpc';

export { createTRPCContext };

export const appRouter = router({
  echo: publicProcedure.query(async () => {
    return { message: 'helloworld' };
  }),
  posts: postRouter,
});

export type AppRouter = typeof appRouter;
