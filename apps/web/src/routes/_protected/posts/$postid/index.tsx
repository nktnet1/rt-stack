import { ArrowLeftIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { queryClient, trpc } from '@/router';

export const Route = createFileRoute('/_protected/posts/$postid/')({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      trpc.posts.one.queryOptions({ id: params.postid }),
    ),
  errorComponent: ({ error, reset }) => {
    return (
      <div className="flex flex-col items-center w-full gap-y-3">
        <div>{error.message}</div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link to="/posts">
              <ArrowLeftIcon />
              Go Back
            </Link>
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              // Reset the router error boundary
              reset();
            }}
            className="w-full"
          >
            Retry? <ReloadIcon />
          </Button>
        </div>
      </div>
    );
  },
});
