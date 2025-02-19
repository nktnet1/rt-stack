import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import {
  postsSearchSchema,
  postsSearchDefaults,
} from '@/components/posts/postsSearchSchema';
import { queryClient, trpc } from '@/router';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
  validateSearch: postsSearchSchema,
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },
});
