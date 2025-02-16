import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  return <div>Your posts:</div>;
}
