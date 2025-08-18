<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { page } from '$app/stores';

	const routes = [
		{
			title: 'Home',
			description: 'Machine Learning Engineer',
			image: 'https://blog.ilkerflix.com/fallback.jpg',
			url: 'https://blog.ilkerflix.com/',
			twitter: {
				cardType: 'summary_large_image',
				image: 'https://blog.ilkerflix.com/fallback.jpg',
				imageAlt: 'Ilker SIGIRCI',
				site: '@ilkersigirci',
				creator: '@ilkersigirci',
				handle: '@ilkersigirci'
			}
		},
		{
			title: 'Writing',
			description: 'Learnings, thoughts and ideas.',
			image: 'https://blog.ilkerflix.com/fallback.jpg',
			url: 'https://blog.ilkerflix.com/writing',
			twitter: {
				cardType: 'summary_large_image',
				image: 'https://blog.ilkerflix.com/fallback.jpg',
				imageAlt: 'Writing',
				site: '@ilkersigirci',
				creator: '@ilkersigirci',
				handle: '@ilkersigirci'
			}
		},
		{
			title: 'Journey',
			description: 'My journey through the years',
			image: 'https://blog.ilkerflix.com/fallback.jpg',
			url: 'https://blog.ilkerflix.com/journey',
			twitter: {
				cardType: 'summary_large_image',
				image: 'https://blog.ilkerflix.com/fallback.jpg',
				imageAlt: 'Journey',
				site: '@ilkersigirci',
				creator: '@ilkersigirci',
				handle: '@ilkersigirci'
			}
		},
		{
			title: 'Work',
			description: 'A collection of my work',
			image: 'https://blog.ilkerflix.com/fallback.jpg',
			url: 'https://blog.ilkerflix.com/work',
			twitter: {
				cardType: 'summary_large_image',
				image: 'https://blog.ilkerflix.com/fallback.jpg',
				imageAlt: 'Work',
				site: '@ilkersigirci',
				creator: '@ilkersigirci',
				handle: '@ilkersigirci'
			}
		}
	];

	// Function to get the route metadata based on the current URL pathname
	const getRouteMeta = (pathname: string) => {
		return routes.find((route) => route.url.endsWith(pathname)) || {};
	};

	let currentMeta: any = $derived(getRouteMeta($page.url.pathname));
</script>

<MetaTags
	title={currentMeta.title}
	titleTemplate="%s | Ilker SIGIRCI"
	description={currentMeta.description}
	canonical={currentMeta.url}
	openGraph={{
		url: currentMeta.url,
		title: currentMeta.title,
		description: currentMeta.description,
		images: [
			{
				url: currentMeta.image,
				width: 800,
				height: 600,
				alt: 'Og Image Alt'
			}
		],
		siteName: 'Ilker SIGIRCI'
	}}
	twitter={{
		site: currentMeta.twitter?.site || '@site',
		cardType: currentMeta.twitter?.cardType || 'summary_large_image',
		title: `${currentMeta.twitter?.title || currentMeta.title} | Ilker SIGIRCI`,
		description: currentMeta.twitter?.description || currentMeta.description,
		image: currentMeta.twitter?.image || currentMeta.image,
		imageAlt: currentMeta.twitter?.imageAlt || 'Twitter image alt'
	}}
/>
