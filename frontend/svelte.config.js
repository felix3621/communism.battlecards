import adapter from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
        paths: {
			base: ''
        }
	},
	preprocess: sveltePreprocess({
		less: true,  // Enable Less preprocessing
	})
};

export default config;
