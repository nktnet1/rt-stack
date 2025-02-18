import { publicProcedure, router } from './trpc';

export const appRouter = router({
  echo: publicProcedure.query(async ({ ctx }) => {
    console.log({ user: ctx.session?.user });
    return { message: 'helloworld' };
  }),
});

export type AppRouter = typeof appRouter;
