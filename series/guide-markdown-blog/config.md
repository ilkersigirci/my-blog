---
title: Other Configurations for this template
description: let's look at other configurations for this template like Giscus comments, Projects, About etc.
date: '2023-12-20'
order: 3
draft: false
---

In this part we'll see how to configure Giscus comments, About Page, Projects page etc.

## Giscus Comments

Each post has it's own dedicated comments section based on [Giscus](https://giscus.app/). you can start by changing some environment variables to setup Giscus. In you `.env` file change the following variables.

```js
PUBLIC_GITHUB_REPO = blog-markdown
PUBLIC_GITHUB_USERNAME = ilkersigirci
PUBLIC_GITHUB_REPO_ID =
PUBLIC_CATEGORY = General
PUBLIC_CATEGORY_ID =
```

to get Repo ID, Category ID goto [Giscus](https://giscus.app/) and follow the instructions.

## About

About page is also rendered using markdown but it has its own layout. `src/lib/components/markdown/about-layout.svelte`. To change content in about, edit `about/about.md`. if you see the fronmatter for `about.md` there's a `layout: about` which tells the MDsveX preprocessor to use about layout.

fronmatter for about.md

```md
---
layout: about
---
```

```js showLineNumbers{157} {6} title="mdsvex.config.js"
/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		_: resolve('./src/lib/components/markdown/layout.svelte'), // default or fallback layout
		about: resolve('./src/lib/components/markdown/about-layout.svelte') // named layout
	},
	// comment if not working
	// highlight: {
	// 	highlighter: highlightCode
	// },
	remarkPlugins: [remarkUnwrapImages, math, katex_blocks, katex_inline, replaceQuotes, remarkGfm],
	rehypePlugins: [
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
```

---