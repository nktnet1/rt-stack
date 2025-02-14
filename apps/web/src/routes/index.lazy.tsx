import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '@repo/ui/button';

export const Route = createLazyFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button>Hi there</Button>
    </div>
  );
}
