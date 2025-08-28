import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { StrictGetMethodPlugin } from '@orpc/server/plugins';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';
import { createORPCContext } from './orpc';
import { appRouter } from './router';

export const createApi = ({
  auth,
  db,
  prefix,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
  prefix: `/${string}`;
}) => {
  const handler = new OpenAPIHandler(appRouter, {
    plugins: [new StrictGetMethodPlugin()],
  });
  return {
    handler: async (request: Request) => {
      return handler.handle(request, {
        prefix,
        context: await createORPCContext({
          db,
          auth,
          headers: request.headers,
        }),
      });
    },
  };
};
