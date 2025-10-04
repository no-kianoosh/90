import './bootstrap'; // Laravel bootstrap
import '../css/tialwind';   // Tailwind
import '../css/mine.css';  // your custom CSS
// import '../css/app.css';  // Tailwind CSS

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: (name) => {
    // Eager import all pages
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    if (!page) {
      console.error(`Page not found: ${name}`);
      return;
    }

    if (!page.default) {
      console.error(`Page "${name}" does not have a default export`, page);
      return;
    }

    return page.default;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
