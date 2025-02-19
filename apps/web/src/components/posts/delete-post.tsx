import { trpc } from '@/router';
import { Button } from '@repo/ui/components/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ReactNode } from '@tanstack/react-router';
import { toast } from 'sonner';
import { cn } from '@repo/ui/lib/utils';

export default function DeletePostButton({
  children,
  className,
  postId,
}: {
  children: ReactNode;
  className?: string;
  postId: string;
}) {
  const { refetch } = useQuery(trpc.posts.all.queryOptions());

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
    <Button
      disabled={deletePostMutation.isPending}
      onClick={(e) => {
        e.preventDefault();
        deletePostMutation.mutate({ id: postId });
      }}
      variant="destructive"
      className={cn('h-9 w-10')}
    >
      {children}
    </Button>
  );
}
