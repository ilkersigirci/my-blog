<script lang="ts">
	import { base } from '$app/paths'

	import Toggle from './toggle.svelte'
	import * as config from '$lib/config'
	import { PageFindSearch } from '$lib/components/search'
	import { onMount } from 'svelte'
	import { Search } from 'lucide-svelte'

	let showModal = false

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault()
				showModal = !showModal
			} else if (event.key === 'Escape') {
				showModal = false
			}
		}

		window.addEventListener('keydown', handleKeydown)

		return () => {
			window.removeEventListener('keydown', handleKeydown)
		}
	})
</script>

<nav>
	<a href="{base}/" class="title">
		<b>{config.title}</b>
	</a>

	<ul class="links">
		<li>
			<a href="{base}/about">About</a>
		</li>
		<li>
			<a href="{base}/contact">Contact</a>
		</li>
		<li>
			<a href="{base}/rss.xml" target="_blank">RSS</a>
		</li>
		<li>
			<a
				href="#"
				on:click|preventDefault={() => (showModal = !showModal)}
				style="font-style: italic;"
			>
				<Search />
				<!-- <span>Ctrl+K</span> -->
			</a>
		</li>
	</ul>

	<Toggle />
</nav>

{#if showModal}
	<div class="modal">
		<PageFindSearch />
	</div>
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

	.modal {
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
	}
</style>
