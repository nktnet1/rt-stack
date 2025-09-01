import { useTranslation } from '@repo/i18n/react';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ReactNode } from 'react';
import { apiClient } from '@/clients/apiClient';
import Spinner from '@/routes/-components/common/spinner';

export default function DeletePostButton({
  children,
  className,
  postId,
}: Readonly<{
  children: ReactNode;
  className?: string;
  postId: string;
}>) {
  const { t } = useTranslation();
  const { refetch } = useQuery(apiClient.posts.all.queryOptions());

  const deletePostMutation = useMutation(
    apiClient.posts.delete.mutationOptions({
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
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={deletePostMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              deletePostMutation.mutate({ id: postId });
            }}
            variant="destructive"
            className={cn('h-9 w-10', className)}
          >
            {deletePostMutation.isPending ? <Spinner /> : children}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          align="center"
          sideOffset={4}
          className="bg-neutral-500 fill-neutral-500 duration-0"
        >
          <span>{t('posts.delete.iconTooltip')}</span>
          <TooltipArrow width={15} height={10} className="duration-0" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
