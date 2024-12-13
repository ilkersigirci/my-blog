<script lang="ts">
	import { base } from '$app/paths'
	import * as config from '$lib/config'
	import { SearchModal } from '$lib/components/search'
	import { Search } from 'lucide-svelte'
	import Toggle from './toggle.svelte'
	import { onMount } from 'svelte'

	let showSearchModal = false

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault()
				toggleSearchModal()
			}
			// else if (event.key === 'Escape') {
			// 	showSearchModal = false
			// }
		}

		window.addEventListener('keydown', handleKeydown)

		return () => {
			window.removeEventListener('keydown', handleKeydown)
		}
	})

	function toggleSearchModal() {
		showSearchModal = !showSearchModal
		if (!showSearchModal) {
			// Reset the search query parameter when closing the modal
			const url = new URL(window.location.href)
			url.searchParams.delete('q')
			history.pushState(null, '', url)
		}
	}
</script>

<nav>
	<a href="{base}/" class="title">{config.title}</a>
	<ul class="links">
		<li><a href="{base}/about">About</a></li>
		<li><a href="{base}/contact">Contact</a></li>
		<li><a href="{base}/rss.xml" target="_blank">RSS</a></li>
		<li>
			<a href="/search" on:click|preventDefault={toggleSearchModal} aria-label="Open search">
				<Search />
			</a>
		</li>
	</ul>
	<Toggle />
</nav>

{#if showSearchModal}
	<SearchModal on:close={toggleSearchModal} />
{/if}

<style>
	nav {
		padding-block: var(--size-7);

		@media (min-width: 768px) {
			display: flex;
			justify-content: space-between;
		}

		.links {
			margin-block: var(--size-7);

			@media (min-width: 768px) {
				display: flex;
				gap: var(--size-7);
				margin-block: 0;
			}
		}

		a {
			color: inherit;
			text-decoration: none;
		}
	}
</style>
