import { queryClient } from '@/router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/posts/')({
  loader: async ({ context: { trpc } }) => {
    await queryClient.ensureQueryData(trpc.posts.all.queryOptions());
  },
});
