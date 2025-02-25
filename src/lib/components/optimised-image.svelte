<script lang="ts">
	type Props = {
		path: string;
		alt: string;
		width: number;
		height: number;
		class: string;
	};

	let { path, alt, width, height, class: className }: Props = $props();
</script>

<picture class="max-h-[90vh]">
	<source type="image/webp" srcset={path.replace('.jpg', '.webp')} />
	<source
		type="image/avif"
		srcset={path.replace('.jpg', '.avif').replace('upload', 'upload/f_auto,q_auto')}
	/>
	<img src={path} {alt} {width} {height} class={className} />
</picture>
