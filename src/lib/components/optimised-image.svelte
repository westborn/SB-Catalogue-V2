<script lang="ts">
	import { PUBLIC_GET_IMAGES_FROM } from '$env/static/public';

	type Props = {
		path: string;
		alt: string;
		width: number;
		height: number;
		class: string;
	};

	let { path, alt, width, height, class: className }: Props = $props();
</script>

<!--
	If the image is from WordPress, we can just use the img tag
	else we need to ghet from cloudinary and use the picture tag
-->

{#if PUBLIC_GET_IMAGES_FROM === 'WORDPRESS'}
	<div class="max-h-[90vh]">
		<img src={path} {alt} {width} {height} class={className} />
	</div>
{:else}
	<picture class="max-h-[90vh]">
		<source
			type="image/webp"
			srcset={path
				.replace('.jpg', '.webp')
				.replace('upload', `upload/f_auto,q_auto/c_fit,w_${width},h_${height}`)}
		/>
		<source
			type="image/avif"
			srcset={path
				.replace('.jpg', '.avif')
				.replace('upload', `upload/f_auto,q_auto/c_fit,w_${width},h_${height}`)}
		/>
		<img src={path} {alt} {width} {height} class={className} />
	</picture>
{/if}
