import { RPCHandler } from '@orpc/server/fetch';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';
import { createORPCContext } from './orpc';
import postRouter from './router/post';

export const appRouter = {
  posts: postRouter,
};

export const createApi = ({
  auth,
  db,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
}) => {
  const handler = new RPCHandler(appRouter);
  return {
    handler: async (request: Request) => {
      return handler.handle(request, {
        prefix: '/rpc',
        context: await createORPCContext({
          db,
          auth,
          headers: request.headers,
        }),
      });
    },
  };
};

export type AppRouter = typeof appRouter;
