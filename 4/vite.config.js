import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path";

export default defineConfig({
    plugins: [
        // Laravel plugin
        laravel({
            input: [
                'resources/js/app.jsx',    // React entry
            ],
            refresh: false,
        }),
        react(),

    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"), // ← fixed
        },
    }
});
