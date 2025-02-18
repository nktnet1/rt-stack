import { queryClient } from '@/router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/posts/')({
  loader: async ({ context: { trpc } }) => {
    await queryClient.ensureQueryData(trpc.posts.all.queryOptions());
  },
});
