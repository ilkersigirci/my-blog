<script lang="ts">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import { PagefindUI } from '@pagefind/default-ui'
	import '@pagefind/default-ui/css/ui.css'
	import { title } from '$lib/config'

	onMount(() => {
		const pagefind = new PagefindUI({
			element: '#search',
			showSubResults: true,
			showImages: false,
			showEmptyFilters: false,
			autofocus: true,
			// resetStyles: false,
			// sort: { date: "desc" },
			// bundlePath: "/pagefind/",
			processResult: function (result: any) {
				// Remove .html from result.url and result.raw_url
				result.url = result.url.replace(/\.html$/, '')
				result.raw_url = result.raw_url.replace(/\.html$/, '')
				return result
			}
		})

		const searchInput = document.querySelector('#search input') as HTMLInputElement
		if (searchInput) {
			searchInput.addEventListener('input', (e: Event) => {
				const target = e.target as HTMLInputElement
				const searchParams = new URLSearchParams(window.location.search)
				searchParams.set('q', target.value)
				const newUrl = `${window.location.pathname}?${searchParams.toString()}`
				history.pushState(null, '', newUrl)
			})
		}

		// Trigger search with current query parameter
		const currentQuery = $page.url.searchParams.get('q')
		if (currentQuery) {
			pagefind.triggerSearch(currentQuery)
		}
	})
</script>

<svelte:head>
	<title>Search {title}</title>
</svelte:head>

<div id="search" class="custom_pagefind_search"></div>

<style>
	:root {
		--pagefind-ui-scale: 0.8;
		--pagefind-ui-primary: #393939;
		--pagefind-ui-text: #393939;
		--pagefind-ui-background: #ffffff;
		--pagefind-ui-border: #eeeeee;
		--pagefind-ui-tag: #eeeeee;
		--pagefind-ui-border-width: 2px;
		--pagefind-ui-border-radius: 8px;
		--pagefind-ui-image-border-radius: 8px;
		--pagefind-ui-image-box-ratio: 3 / 2;
	}
	/* @media (prefers-color-scheme: dark) {
		.custom_pagefind_search {
			--pagefind-ui-scale: 1;
			--pagefind-ui-primary: #034ad8;
			--pagefind-ui-text: #ffffff;
			--pagefind-ui-background: #ffffff;
			--pagefind-ui-border: #d21f1f;
			--pagefind-ui-tag: #20b84d;
			--pagefind-ui-border-width: 2px;
			--pagefind-ui-border-radius: 8px;
			--pagefind-ui-image-border-radius: 8px;
			--pagefind-ui-image-box-ratio: 3 / 2;
			--pagefind-ui-font: sans-serif;
			--pagefind-ui-search-input-background: #ffffff;
		}
	} */

	/* .custom_pagefind_search {
		width: 100%;
		max-width: 600px;
	} */
</style>
