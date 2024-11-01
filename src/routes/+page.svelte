<script lang="ts">
	import { Card, Masonry, PageTitle } from '$lib/components/site';
	import Scrollarea from '$lib/components/site/scrollarea.svelte';
	import { Button } from '$lib/components/ui/button';
	import { work } from '$lib/config';
	import { headerTitle } from '$lib/stores.svelte';

	let { data } = $props();

	headerTitle.value = 'Ilker SIGIRCI';
</script>

<Scrollarea class="w-full">
	<div class="content-wrapper relative flex w-full flex-col">
		<p>Work in progress 🚧</p>
		<div class="content">
			<PageTitle title="Home" class="lg:hidden" />
			<p>I'm Ilker SIGIRCI, an Machine Learning Engineer based in Ankara, Turkey.</p>
			<p>
				Working as a {work.role} at {work.company}. I'm passionate about learning the connection
				between human and artificial brain. Also, I deploy several self-hosted services as my hobby.
			</p>
			<Button variant="link" class="mb-0 p-0" href="/writing">
				<h2>Writing</h2>
			</Button>
			<div class="blog-cards">
				<Masonry items={data.posts} gridGap={'1rem'} stretchFirst={false} reset>
					{#each data.posts as post}
						<Card title={post.title} image={post.image || ''} {post} />
					{/each}
				</Masonry>
			</div>
		</div>
	</div>
	<div class="min-h-11 lg:hidden"></div>
</Scrollarea>

<style lang="postcss">
	.blog-cards {
		@apply -mx-4 md:mx-0;
	}
</style>
