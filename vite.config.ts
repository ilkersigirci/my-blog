import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import pagefind from 'vite-plugin-pagefind'
import { enhancedImages } from '@sveltejs/enhanced-img';


export default defineConfig({
	plugins: [sveltekit(), pagefind(), enhancedImages()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
