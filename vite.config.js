import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
			'/api_chat': 'ws://localhost:3001'
        }
    },
	plugins: [sveltekit()]
});
