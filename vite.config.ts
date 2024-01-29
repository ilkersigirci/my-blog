import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { pagefind } from 'vite-plugin-pagefind'

export default defineConfig({
	plugins: [sveltekit(), pagefind({ publicDir: 'static', buildDir: 'build' })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
