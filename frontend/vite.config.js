import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import config from './svelte.config';


export default defineConfig({
    //dev proxy
    server: {
        proxy: {
            ['/api']: {
                target: 'http://localhost:5174',
                changeOrigin: true
            },
            ['/socket']: {
                target: 'http://localhost:5175',
                changeOrigin: true,
                ws: true
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
