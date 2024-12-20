/**
 * Source: https://github.com/melt-ui/melt-ui/blob/develop/mdsvex.config.js
 */

import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { visit } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';
import rehypePrettyCode from 'rehype-pretty-code';
// import { escapeSvelte } from 'mdsvex';
import { escapeSvelte } from '@huntabyte/mdsvex';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import rehypeSlug from 'rehype-slug';
import math from 'remark-math';
import rehype_katex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import katex from 'katex';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const correct_hast_tree = () => (tree) => {
	visit(tree, 'text', (node) => {
		if (node.value.trim().startsWith('<')) {
			node.type = 'raw';
		}
	});
};

const katex_blocks = () => (tree) => {
	visit(tree, 'code', (node) => {
		if (node.lang === 'math') {
			const str = katex.renderToString(node.value, {
				displayMode: true,
				leqno: false,
				fleqn: false,
				throwOnError: true,
				errorColor: '#cc0000',
				strict: 'warn',
				output: 'htmlAndMathml',
				trust: false,
				macros: { '\\f': '#1f(#2)' }
			});

			node.type = 'raw';
			node.value = '<span class="text-sm md:text-lg">{@html `' + str + '`}</span>';
		}
	});
};

const inlineKatexUsingInlineCode = () => (tree) => {
	visit(tree, 'inlineCode', (node) => {
		if (node.value.endsWith('{:eq}')) {
			node.value = node.value.replace('{:eq}', '');
			const str = katex.renderToString(node.value, {
				displayMode: false,
				leqno: false,
				fleqn: false,
				throwOnError: true,
				errorColor: '#cc0000',
				strict: 'warn',
				output: 'htmlAndMathml',
				trust: false,
				macros: { '\\f': '#1f(#2)' }
			});

			node.type = 'raw';
			node.value = '<span class="text-base mx-1">{@html `' + str + '`}</span>';
		}
	});
};

const katex_inline = () => (tree) => {
	// using $$ $$ for inline math
	//
	visit(tree, 'text', (node, index, parent) => {
		const regex = /\$\$(.*?)\$\$/g;
		let replacedText = node.value;

		replacedText = replacedText.replace(regex, (match, equation) => {
			// Replace double backslashes with single backslashes
			const cleanedEquation = equation.replace(/\\\\/g, '\\');

			const str = katex.renderToString(cleanedEquation, {
				throwOnError: true,
				errorColor: '#cc0000',
				strict: 'warn',
				output: 'htmlAndMathml',
				trust: false,
				macros: { '\\f': '#1f(#2)' }
			});

			// Escape the HTML for Svelte
			const escapedHTML = escapeSvelte(str);

			// Wrap the rendered equation in a span
			return `<span class="text-base">{@html \`${escapedHTML}\`}</span>`;
		});

		// Replace the original text node with the modified text
		parent.children[index] = { type: 'text', value: replacedText };
	});
};

const prettyCodeOptions = {
	// theme: 'github-dark',
	theme: {
		// for dark, class name will be Moonlight II, use that class name in pre.svelte to adjust
		// any changes here, you need to change in pre.svelte as well with the same class name
		dark: JSON.parse(
			readFileSync(resolve(__dirname, './src/lib/styles/themes/tokyo-night-storm.json'), 'utf-8')
		),
		light: 'min-light'
		// for light, class name will be min-light, use that class name in pre.svelte to adjust
		// any changes here, you need to change in pre.svelte as well with the same class name
		// light: JSON.parse(
		// 	readFileSync(resolve(__dirname, './src/lib/styles/themes/tokyo-night-light.json'), 'utf-8')
		// )
	},
	keepBackground: false, // to use our own background color
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = { type: 'text', value: ' ' };
		}
	},
	// onVisitTitle(node) {
	// 	// console.log('title:', node);
	// },
	getHighlighter: (options) => {
		return createHighlighter({
			...options,
			langs: [
				'bash',
				'css',
				'html',
				'javascript',
				'json',
				'markdown',
				'plaintext',
				'python',
				'svelte',
				'typescript',
				'yaml'
			]
		});
	}
};

// replaces “ and ” with " and ". useful to render {} curly braces
const replaceQuotes = () => (tree) => {
	visit(tree, 'text', (node) => {
		node.value = node.value
			.replace(/”/g, '"') // Replace curly double quotes with straight double quotes
			.replace(/“/g, '"') // Replace straight double quotes with straight double quotes
			.replace(/’/g, "'") // Replace curly single quotes with straight single quotes
			.replace(/‘/g, "'"); // Replace straight single quotes with straight single quotes
	});
};

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		_: resolve('./src/lib/components/markdown/blueprint.svelte') // default or fallback layout
		// about: resolve('./src/lib/components/markdown/about-layout.svelte') // named layout
	},
	// comment if not working
	// highlight: {
	// 	highlighter: highlightCode
	// },
	remarkPlugins: [
		math,
		katex_blocks,
		katex_inline,
		replaceQuotes,
		remarkGfm,
		inlineKatexUsingInlineCode,
		[remarkToc, { tight: true, maxDepth: 3 }]
	],
	rehypePlugins: [
		rehypeUnwrapImages,
		rehypeCustomComponents,
		rehypeComponentPreToPre,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata,
		rehypeRenderCode,
		rehypePreToComponentPre,
		rehypeSlug,
		correct_hast_tree,
		rehype_katex
	]
};

function rehypeCustomComponents() {
	return async (tree) => {
		const hTags = [
			'Components.h1',
			'Components.h2',
			'Components.h3',
			'Components.h4',
			'Components.h5',
			'Components.h6'
		];

		visit(tree, (node) => {
			// Check h tags, and pass some extra parameters to the custom components.
			if (node?.type === 'element' && hTags.includes(node?.tagName)) {
				node.properties['id'] = node.children[0].value.split(' ').join('-').toLowerCase();
				node.properties['headerTag'] = node.tagName.split('.')[1];
			}
		});
	};
}

function rehypeComponentPreToPre() {
	return async (tree) => {
		// Replace `Component.pre` tags with regular `pre` tags.
		// This enables us to use rehype-pretty-code with our custom `pre` component.
		visit(tree, (node) => {
			// if (node?.data && 'meta' in node?.data) {
			// 	console.log('node:', node, '\n');
			// 	console.log('data:', node?.data, '\n-------------------------');
			// }

			if (node?.type === 'element' && node?.tagName === 'Components.pre') {
				node.tagName = 'pre';
			}
		});
	};
}

/**
 * Escapes the html string of code blocks so we can pass
 * it on to our custom `Component.pre` element.
 */
// function escapeHtml(html) {
// 	return html
// 		.replaceAll('&', '&amp;')
// 		.replaceAll('<', '&lt;')
// 		.replaceAll('>', '&gt;')
// 		.replaceAll('"', '&quot;')
// 		.replaceAll("'", '&#039;');
// }

function rehypePreToComponentPre() {
	return async (tree) => {
		/**
		 * Replace `pre` tags with our custom `Component.pre` tags.
		 * This enables us to use rehype-pretty-code with our custom `pre` component.
		 * We also add the raw html string as a parameter for the copy button.
		 */
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				node.tagName = 'Components.pre';

				// if (node?.children.length > 0) {
				// 	console.log('\n\nnode:', node);
				// 	console.log('\n\nnode.children[0]:', node?.children[0], '\n------------------------');
				// }
				// 	const value = node.children[0].value.trim();
				// 	const rawHTMLString = value.substring(8, value.length - 2);
				// 	node.properties['rawHTMLString'] = escapeHtml(rawHTMLString);
			}
		});
	};
}

function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) {
					return;
				}

				const titleElement = node.children[0];
				const preElement = node.children.at(-1);

				if (
					preElement.tagName !== 'pre' ||
					!('data-rehype-pretty-code-title' in titleElement.properties)
				) {
					return;
				}

				// const codeElement = preElement.children.find((child) => child.tagName === 'code');

				// if (codeElement) {
				// 	processCustomCodeBlockHighlights(codeElement.children);
				// }

				if (titleElement.children.length > 0 && 'value' in titleElement.children[0]) {
					preElement.properties['title'] = titleElement.children[0].value;
					preElement.properties['language'] = node.children[0].properties['data-language'];
					node.children.shift();
				}
			}
		});
	};
}

function processCustomCodeBlockHighlights(children) {
	children.forEach((child) => {
		if (child.type === 'element' && child.tagName === 'span' && 'data-line' in child.properties) {
			let shouldAddHighlight = false;
			let shouldRemoveHighlight = false;

			child.children.forEach((innerChild) => {
				if (innerChild.type === 'element' && innerChild.tagName === 'span') {
					const textNode = innerChild.children.find((c) => c.type === 'text');
					if (textNode && textNode.value) {
						const addHighlightPatterns = ['# ++add', '// ++add', '#++add', '//++add'];
						const removeHighlightPatterns = ['# --del', '// --del', '#--del', '//--del'];

						addHighlightPatterns.forEach((pattern) => {
							if (textNode.value.includes(pattern)) {
								shouldAddHighlight = true;
								textNode.value = textNode.value.replace(pattern, '').trim();
							}
						});

						removeHighlightPatterns.forEach((pattern) => {
							if (textNode.value.includes(pattern)) {
								shouldRemoveHighlight = true;
								textNode.value = textNode.value.replace(pattern, '').trim();
							}
						});
					}
				}
			});

			if (shouldAddHighlight) {
				child.properties['data-highlighted-line-id'] = 'add';
				child.properties['data-highlighted-line'] = '';
			} else if (shouldRemoveHighlight) {
				child.properties['data-highlighted-line-id'] = 'remove';
				child.properties['data-highlighted-line'] = '';
			}
		}

		// Recursively traverse inner children
		if (child.children && child.children.length > 0) {
			processCustomCodeBlockHighlights(child.children);
		}
	});
}

function rehypeRenderCode() {
	return async (tree) => {
		visit(tree, (node) => {
			if (
				node?.type === 'element' &&
				(node?.tagName === 'Components.pre' || node?.tagName === 'pre')
			) {
				const codeEl = node.children[0];
				if (codeEl.tagName !== 'code') {
					return;
				}

				if (codeEl && node.properties['data-language'] !== 'md') {
					processCustomCodeBlockHighlights(codeEl.children);
				}

				const codeString = tabsToSpaces(
					toHtml(codeEl, {
						allowDangerousCharacters: true,
						allowDangerousHtml: true
					})
				);

				codeEl.type = 'raw';
				codeEl.value = `{@html \`${escapeSvelte(codeString)}\`}`;
			}
		});
	};
}

/**
 *
 * @param {string} code
 * @returns {string}
 */
function tabsToSpaces(code) {
	return code.replaceAll('    ', '    ').replaceAll('\t', '    ');
}
