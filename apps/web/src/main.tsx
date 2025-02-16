import './style.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { createRouter } from '@/router';

const rootElement = document.getElementById('app')!;

const router = createRouter();

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      themes={['light', 'dark']}
      enableSystem
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}
