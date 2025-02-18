import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_protected/posts/$postid/')({
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return <div>Hello {post.title}</div>;
}
