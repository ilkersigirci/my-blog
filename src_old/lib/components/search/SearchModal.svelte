<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import PageFindSearch from './PageFindSearch.svelte'

	const dispatch = createEventDispatcher()

	function closeModal() {
		// Reset the search query parameter
		const url = new URL(window.location.href)
		url.searchParams.delete('q')
		history.pushState(null, '', url)

		dispatch('close')
	}
</script>

<div class="modal-backdrop" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
		<PageFindSearch />
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--surface-3);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: var(--layer-important);
	}

	.modal-content {
		background-color: var(--surface-1);
		color: var(--text-1);
		padding: var(--size-5);
		border-radius: var(--radius-3);
		max-width: 90%;
		max-height: 90%;
		overflow-y: auto;
		position: relative;
		box-shadow: var(--shadow-3);
	}

	/* .modal-content.dark {
		background-color: var(--surface-2);
	} */

	/* @media (prefers-color-scheme: dark) {
		.modal-backdrop {
			background-color: var(--surface-3);
		}

		.modal-content {
			background-color: var(--surface-2);
		}
	} */
</style>
