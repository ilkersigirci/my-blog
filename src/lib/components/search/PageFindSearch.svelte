<!-- <script>
	window.addEventListener('DOMContentLoaded', (event) => {
		new PagefindUI({ element: '#search', resetStyles: false })
	})

	window.addEventListener('keydown', (event) => {
		if (event.key === '/' || event.key === '.') {
			console.log('you pressed the slash')
			event.preventDefault()
			document.querySelector('div#search input').focus()
		}
	})
</script>

<div id="search" class="ml-3 p-4 -mt-8"></div>

-->

<script>
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
			autofocus: true
		})
		pagefind.triggerSearch($page.url.searchParams.get('q'))
		const search_input = document.querySelector('#search input')

		search_input.addEventListener('input', (e) => {
			const search_params = new URLSearchParams(window.location.search)
			search_params.set('q', e.target.value)
			const new_url = `${window.location.pathname}?${search_params.toString()}`
			history.pushState(null, '', new_url)
		})
	})
</script>

<svelte:head>
	<title>Search{title}</title>
</svelte:head>

<div id="search" />

<!-- <style is:global>
	.dark {
		--pagefind-ui-primary: #eeeeee;
		--pagefind-ui-text: #eeeeee;
		--pagefind-ui-background: #152028;
		--pagefind-ui-border: #152028;
		--pagefind-ui-tag: #152028;
	}
</style> -->
