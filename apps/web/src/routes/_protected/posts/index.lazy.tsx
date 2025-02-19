import CreatePostButton from '@/components/posts/create-post';
import { trpc } from '@/router';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { toast } from 'sonner';

export const Route = createLazyFileRoute('/_protected/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts, refetch } = useQuery(trpc.posts.all.queryOptions());
  const deletePostMutation = useMutation(
    trpc.posts.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await refetch();
        toast.info('Post deleted successfully.');
      },
    }),
  );

  return (
    <div className="flex flex-col px-4 py-6 w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Posts</h1>
        <CreatePostButton />
      </div>
      <hr className="mt-4 border-b-2 border-gray-400" />
      <div className="flex gap-x-3 gap-y-3 flex-wrap mt-6">
        {posts?.length
          ? posts.map((p) => (
              <Link
                to="/posts/$postid"
                params={{ postid: p.id }}
                key={p.id}
                className="border border-gray-500 bg-elevated p-4 w-full flex items-center justify-between rounded-xl"
              >
                <div>
                  <div className="text-lg font-bold line-clamp-1">
                    {p.title}
                  </div>
                  <div className="italic text-sm">
                    {p.createdAt.toLocaleString()}
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePostMutation.mutate({ id: p.id });
                  }}
                  variant="destructive"
                  className="h-9 w-10"
                >
                  <TrashIcon />
                </Button>
              </Link>
            ))
          : 'No posts available.'}
      </div>
    </div>
  );
}
