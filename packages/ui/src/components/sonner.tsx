import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          /**
           * !important necessary to override sonner styles in Tailwind V4
           * https://github.com/emilkowalski/sonner/issues/591#issue-2876586315
           */
          error: '!border-none !bg-toast-error !text-foreground',
          info: '!border-none !bg-toast-info !text-foreground',
          loading: '!border-none !bg-toast-loading !text-foreground',
          success: '!border-none !bg-toast-success !text-foreground',
          warning: '!border-none !bg-toast-warning !text-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
