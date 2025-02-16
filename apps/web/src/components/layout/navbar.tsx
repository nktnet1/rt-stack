import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <>
      <div className="p-2 flex justify-between text-lg bg-nav">
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
        <div className="flex gap-1.5">
          <Link
            to="/login"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Register
          </Link>
        </div>
      </div>
      <hr />
    </>
  );
}
