import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import pagefind from 'vite-plugin-pagefind'
import { enhancedImages } from '@sveltejs/enhanced-img';


// FIXME: pagefind doesn't work with enchancedImages
export default defineConfig({
	plugins: [sveltekit(), enhancedImages()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
