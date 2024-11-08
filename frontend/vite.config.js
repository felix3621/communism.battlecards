import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
			'/api': 'http://localhost:5000',
            '/socket': 'ws://localhost:5001'
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
