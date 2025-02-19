import './style.css';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@/router';

const rootElement = document.getElementById('app')!;

const router = createRouter();

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        themes={['light', 'dark']}
        enableSystem
        disableTransitionOnChange
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
