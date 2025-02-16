import AuthDisplay from '@/components/layout/nav/auth-display';
import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <div className="p-2 flex items-center justify-between text-lg bg-nav h-12">
      <div>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
      </div>
      <AuthDisplay />
    </div>
  );
}
