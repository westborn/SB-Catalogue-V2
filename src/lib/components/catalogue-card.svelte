<script lang="ts">
	import { convertToDollars, determinePlacement } from '$lib/utils.ts';
	import { EnlargeableImage } from '$lib/components/index.ts';
	import * as Card from '$lib/components/ui/card/index.js';

	const data = $props();
	const {
		exhibitNumber,
		title,
		artistName,
		description,
		material,
		dimensions,
		price,
		registrationYear,
		inOrOut,
		cloudURL
	} = data;
</script>

<!-- card -->
<Card.Root class="flex max-w-[400px] flex-col items-center justify-between rounded-xl border-2">
	<div class="flex w-full items-center px-2 py-3">
		<div class="flex items-center justify-center rounded-full bg-blue-500 p-4 font-bold text-white">
			<p>{exhibitNumber}</p>
		</div>
		<span class="ml-2 pt-1 text-sm font-bold">{title} - {artistName}</span>
	</div>

	<EnlargeableImage
		path={cloudURL ? cloudURL : '/dummy_160x160_ffffff_cccccc.png'}
		alt={title}
		width={256}
		height={256}
		class="h-40 w-40 overflow-hidden rounded object-contain"
	/>

	<div class="w-full px-3 pb-2">
		<p class="text-justify text-sm">{description}</p>
		<p class="mt-1 text-center text-xs">{material}</p>
		<div class="flex flex-row justify-between">
			<p class="text-xs">{dimensions}</p>
			<p class="text-xs">{determinePlacement(exhibitNumber, registrationYear, inOrOut)}</p>
		</div>
		<p class="w-full text-center text-base font-medium">{convertToDollars(price)}</p>
	</div>
</Card.Root>
<!-- card -->
