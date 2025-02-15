import { createLazyFileRoute } from '@tanstack/react-router';
import LoginCredentialsForm from '@/components/auth/LoginCredentialsForm';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center">
      <LoginCredentialsForm />
    </div>
  );
}
