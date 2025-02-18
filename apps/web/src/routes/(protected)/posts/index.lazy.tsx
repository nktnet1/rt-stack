import CreatePostButton from '@/components/posts/create-dialog-button';
import { trpc } from '@/router';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/(protected)/posts/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Posts</h1>
        <CreatePostButton />
      </div>
      <hr className="mt-3 border-b-2" />
      <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3">
        {posts?.length
          ? posts.map((p) => (
              <div key={p.id} className="border bg-elevated p-4 w-full">
                <div className="text-lg font-bold line-clamp-1">{p.title}</div>
                <div className="italic text-sm">
                  {p.createdAt.toLocaleString()}
                </div>
              </div>
            ))
          : 'Please create a new post.'}
      </div>
    </div>
  );
}
