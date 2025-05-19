import '@/style.css';
import createI18n from '@repo/i18n';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@/router';

createI18n({ debug: !import.meta.env.PROD });

const ROOT_ELEMENT_ID = 'app';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);

if (!rootElement) {
  throw new Error(`Root element with ID '${ROOT_ELEMENT_ID}' not found.`);
}

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
