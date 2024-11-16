import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import config from './svelte.config';

const base = config.kit.paths.base || '';

export default defineConfig({
    //dev proxy
    server: {
        proxy: {
            [base+'/api']: {
                target: 'http://localhost:5174',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/battlecards\/api/, '/api'),
            },
            [base+'/socket']: {
                target: 'http://localhost:5175',
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/battlecards\/socket/, '/socket'),
            },
        }
    },
	plugins: [sveltekit()],
    css: {
        preprocessorOptions: {
            less: {
                // You can add Less options here, if needed
                math: 'always' // Example option
            }
        }
    }
});
