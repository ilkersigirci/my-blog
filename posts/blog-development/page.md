---
title: How This Blog is Built
description: Understanding the optimizations and technologies used in building this blog
date: '2024-7-26'
image: https://blog.ronin.cloud/content/images/size/w2000/2022/02/markdown.png
icon: '/posts/logo.jpg'
# Not working on vercel
useIconInHome: false
tags:
  - SvelteKit
draft: false
---

## Contents

## General
 
- Built using SvelteKit

## Optimizations

- Enable pre-render
- Unlike other SSGs, prerendered SvelteKit still allows for client-side hydration, so I can still use smooth client-side routing and transitions.
- Use static adapter
- For images, use AVIF / WebP instead of PNG / jpg
	- Use Sveltekit [enhanced:img](https://kit.svelte.dev/docs/images#sveltejs-enhanced-img-srcset-and-sizes)
- Optimize fonts by reducing their size
	- Only import the necessary weights and subsets for each font
	- use woff2 files
	- For hosting fonts, Fontsource can be used
- Use inline CSS
	- It eliminates the need for an extra request to fetch an external CSS file
	- However, it prevents the browser from caching the CSS file
	- So while the initial load time can be faster, subsequent navigations may be slower.
	- This is a worthy trade-off for blog pages where initial load time is much more important