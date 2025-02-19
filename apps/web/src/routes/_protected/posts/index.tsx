import { createFileRoute } from '@tanstack/react-router';
import { queryClient, trpc } from '@/router';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
});
