<script lang="ts">
	import OptimisedImage from '$lib/components/optimised-image.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import SearchIcon from 'lucide-svelte/icons/search';

	type Props = {
		path: string;
		alt: string;
		width: number;
		height: number;
		class: string;
	};

	let { path, alt, width, height, class: className }: Props = $props();

	let showLargeImage = $state(false);
</script>

<!-- all cell contents need to be wrapped in <span> tags -->
<span>
	<div class="relative cursor-pointer">
		<SearchIcon class="absolute -left-5 h-5 w-5 stroke-slate-600"></SearchIcon>
		<button onclick={() => (showLargeImage = true)}>
			<OptimisedImage
				{path}
				alt="alt"
				{width}
				{height}
				class="h-48 w-48 overflow-hidden rounded object-contain"
			/></button
		>
	</div>
</span>

{#if showLargeImage}
	<Dialog.Root bind:open={showLargeImage}>
		<Dialog.Trigger>Open</Dialog.Trigger>
		<Dialog.Content class="overflow-auto sm:max-h-[1000px] sm:max-w-[460px]">
			<OptimisedImage {path} alt="alt" width={460} height={460} class="rounded" />
		</Dialog.Content>
	</Dialog.Root>
{/if}
