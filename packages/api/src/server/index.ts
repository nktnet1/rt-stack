import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { StrictGetMethodPlugin } from '@orpc/server/plugins';
import { experimental_ValibotToJsonSchemaConverter } from '@orpc/valibot';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';
import { createORPCContext } from './orpc';
import { appRouter } from './router';

export type AppRouter = typeof appRouter;

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
    plugins: [
      new StrictGetMethodPlugin(),
      new OpenAPIReferencePlugin({
        docsProvider: 'scalar',
        schemaConverters: [new experimental_ValibotToJsonSchemaConverter()],
        specGenerateOptions: {
          info: {
            title: 'RT Stack API',
            version: '1.0.0',
          },
        },
      }),
    ],
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
