import { trpc } from '@/router';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const postsQuery = useQuery(trpc.echo.queryOptions());
  if (!postsQuery.data) {
    return <div>No data</div>;
  }

  return <div>Your posts: {postsQuery.data.message}</div>;
}
