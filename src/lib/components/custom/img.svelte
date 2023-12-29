<script lang="ts">
	export let src: string
	export let alt: string
</script>

<!-- NOTE: Enables lazy loading images in mdsvex rendered markdown -->
<img {src} {alt} loading="lazy" />
