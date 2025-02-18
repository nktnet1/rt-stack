import { queryClient, trpc } from '@/router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
});
