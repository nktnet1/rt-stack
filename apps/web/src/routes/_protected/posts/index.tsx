import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { queryClient } from '#web/clients/queryClient';
import { trpc } from '#web/router';
import {
  postsSearchSchema,
  postsSearchDefaults,
} from '#web/validations/posts-link-options';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
  validateSearch: postsSearchSchema,
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center w-full gap-y-3">
        <div>{error.message}</div>
      </div>
    );
  },
});
