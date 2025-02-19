import postRouter from './router/post';
import { createTRPCContext, router } from './trpc';

export { createTRPCContext };

export const appRouter = router({
  posts: postRouter,
});

export type AppRouter = typeof appRouter;
