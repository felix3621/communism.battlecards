import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
			'/api': 'http://localhost:5172',
            '/gamesocket': 'ws://localhost:3000',
            '/chatsocket': 'ws://localhost:3001'
        }
    },
	plugins: [sveltekit()]
});
