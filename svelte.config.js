// import adapter from '@sveltejs/adapter-vercel'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

import { mdsvex, escapeSvelte } from 'mdsvex'
import { getSingletonHighlighter } from 'shiki'
import { addCopyButton } from 'shiki-transformer-copy-button'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import { enhancedImages, defaultResolverFactory } from 'mdsvex-enhanced-images'
import { join } from 'path'

const addCopyButtonOptions = {
	// delay time from "copied" state back to normal state
	toggle: 2000
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: './src/mdsvex.svelte'
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getSingletonHighlighter({
				themes: ['one-dark-pro'],
				langs: ['python', 'bash', 'javascript', 'typescript']
			})
			await highlighter.loadLanguage('python', 'bash', 'javascript', 'typescript')
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					theme: 'one-dark-pro',
					transformers: [addCopyButton(addCopyButtonOptions)]
				})
			)
			return `{@html \`${html}\` }`
		}
	},
	remarkPlugins: [
		[
			enhancedImages,
			{
				resolve: defaultResolverFactory((path) => join('$img', path))
			}
		],
		[remarkToc, { tight: true }]
	],
	rehypePlugins: [rehypeSlug]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter({ fallback: '404.html', pages: 'build', assets: 'build' }),
		prerender: { handleHttpError: 'warn' },
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		alias: {
			$img: 'src/assets/images'
		}
	}
}

export default config
