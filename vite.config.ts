import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import pagefind from 'vite-plugin-pagefind';
// import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	// plugins: [sveltekit(), pagefind(), enhancedImages()],
	plugins: [sveltekit()],
	server: {
		fs: {
			// Allow serving files from one level up to the project root
			allow: ['..']
		}
	},
	build: { chunkSizeWarningLimit: 1500 } // Default is 500
});
