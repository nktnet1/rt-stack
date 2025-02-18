import { trpc } from '@/router';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  if (!posts?.length) {
    return <div>No data</div>;
  }

  return (
    <div>
      Your posts:
      {posts.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </div>
  );
}
