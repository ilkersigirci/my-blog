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
	}

	.links {
		margin-block: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
		}

		.links {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}

	/* .modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal > :global(.custom_pagefind_search) {
		background: white;
		padding: var(--size-7);
		border-radius: var(--pagefind-ui-border-radius);
	} */
</style>
