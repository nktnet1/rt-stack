import RegisterCredentialsForm from '@/components/RegisterCredentialsForm';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center">
      <RegisterCredentialsForm />
    </div>
  );
}
