<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'
	import PageTransition from './transition.svelte'

	import 'open-props/style'
	import 'open-props/normalize'
	import 'open-props/buttons'
	import '../app.css'

	export let data

	// NOTE: For enabling Copy Button on code blocks
	// import { CopyButton } from 'svelte-zoo'
	// import { afterNavigate } from '$app/navigation'

	// afterNavigate(() => {
	// 	for (const node of document.querySelectorAll('pre > code')) {
	// 		new CopyButton({
	// 			// use whatever Svelte component you like here
	// 			target: node,
	// 			props: {
	// 				content: node.textContent ?? '',
	// 				style: 'position: absolute; top: 1ex; right: 1ex;' // requires <pre> to have position: relative;
	// 			}
	// 		})
	// 	}
	// })
</script>

<div class="layout">
	<Header />

	<main>
		<PageTransition url={data.url}>
			<slot />
		</PageTransition>
	</main>

	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	main {
		padding-block: var(--size-9);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
