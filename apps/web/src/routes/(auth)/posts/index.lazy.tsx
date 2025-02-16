import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(auth)/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Your posts:</div>;
}
