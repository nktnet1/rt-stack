import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2">
      <h3>Hello!</h3>
      <p className="mt-3">Please <Link to="/login" className="underline font-bold">log in</Link> to view your posts.</p>
    </div>
  );
}
