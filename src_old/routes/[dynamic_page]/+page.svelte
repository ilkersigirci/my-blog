<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { page } from '$app/stores'
	import { base } from '$app/paths'

	export let data

	let pageSize = 10
	// $: totalItems = data.products.total
	$: totalItems = 20
	$: totalPages = Math.ceil(totalItems / pageSize)
	$: currentPage = Number($page.params.dynamic_page) - 1
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href="{base}/post/{post.slug}" class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<div class="pagination">
	{#each Array(totalPages) as _, idx}
		<a href="{base}/{idx + 1}" class={currentPage === idx ? 'text-emerald-300' : ''}>
			{idx + 1}
		</a>
	{/each}
</div>

<style>
	.posts {
		display: grid;
		gap: var(--size-7);
	}

	.post {
		max-inline-size: var(--size-content-3);
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>
