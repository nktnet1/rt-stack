import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/posts/')({
  loader: async ({ context: { trpcQueryUtils } }) => {
    await trpcQueryUtils.echo.ensureData();
  },
});
