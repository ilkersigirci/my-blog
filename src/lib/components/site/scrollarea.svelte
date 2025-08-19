<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		children
	}: {
		class: string;
		children: Snippet;
	} = $props();
</script>

<div class={cn('scrollable-area', className)}>
	{@render children()}
</div>

<style lang="postcss">
	@reference "../../../app.css";

	.scrollable-area {
		@apply max-h-dynamic-screen min-h-dynamic-screen h-full overflow-x-hidden overflow-y-auto;
	}
</style>
