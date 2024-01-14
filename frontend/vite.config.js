import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
			'/api': 'http://localhost:3000',
            '/gamesocket': 'ws://localhost:3001',
            '/chatsocket': 'ws://localhost:3002'
        }
    },
	plugins: [sveltekit()]
});
