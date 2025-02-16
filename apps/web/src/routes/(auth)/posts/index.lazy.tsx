import { trpc } from '@/router';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const postsQuery = trpc.echo.useQuery();
  if (!postsQuery.data) {
    return <div>No data</div>;
  }

  return <div>Your posts: {postsQuery.data.message}</div>;
}
