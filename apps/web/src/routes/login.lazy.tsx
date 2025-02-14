import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '@repo/ui/button';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 flex flex-col items-center">
      <h3>Login page</h3>
      <Button>Submit</Button>
    </div>
  );
}
