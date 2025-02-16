import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/posts/')({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  return <div>Your posts:</div>;
}
