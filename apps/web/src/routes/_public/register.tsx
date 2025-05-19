import { Trans } from '@repo/i18n/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import RegisterCredentialsForm from '@/routes/_public/-components/register-form';

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center">
      <div className="border p-4 md:p-8 w-full max-w-md rounded-lg bg-elevated">
        <RegisterCredentialsForm />
        <div className="mt-4 text-center">
          <Trans
            i18nKey="auth.register.loginLinkReference"
            components={{
              LoginLink: <Link to="/login" className="underline" />,
            }}
          />
        </div>
      </div>
    </div>
  );
}
