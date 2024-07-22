<script context="module">
	const images_base_path = '/src/assets/images'

	// From: https://github.com/sveltejs/kit/issues/11535#issuecomment-2207645048
	const images = import.meta.glob(['/src/assets/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}'], {
		eager: true,
		query: { enhanced: true }
	})

	const get_full = (desired_image) => {
		desired_image = `${images_base_path}/${desired_image}`
		return images[desired_image].default
	}
</script>

<script lang="ts">
	export let src: string
	export let alt: string

	const image = get_full(src)
</script>

<!-- <img {src} {alt} loading="lazy" /> -->

<!-- NOTE: /src/.. like paths only works with enhanced:img -->
<!-- <img src={`${images_base_path}/${src}`} {alt} /> -->

<figure class="image">
	<enhanced:img src={image} {alt} />
</figure>
