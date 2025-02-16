import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/posts/')({
  loader: async ({ context }) => {
    console.log(context);
  },
});
