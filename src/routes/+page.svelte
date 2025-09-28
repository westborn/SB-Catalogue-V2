<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SearchIcon from 'lucide-svelte/icons/search';

	import { CatalogueCard } from '$lib/components';
	import * as Select from '$lib/components/ui/select/index.ts';
	import type { CatalogueExhibit } from '$lib/components/server/registrationDB.js';
	import { determinePlacement } from '$lib/utils.ts';
	import { tick } from 'svelte';
	import { browser } from '$app/environment';

	$effect(() => {
		if (element) {
			infiniteScroll({ getData, element });
		}
		// TODO - check that we get more data than the page size for the initial display
		// if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		// alert("bottom of the page reached"); }
	});

	const { data } = $props();
	let searchTerm = $state(''); // Search term for filtering the exhibits
	const pageSize = 3; // Number of items to scroll at a time
	let numToDisplay = $state(10);
	let element = $state<HTMLElement>();
	let allExhibits: CatalogueExhibit[] = $derived((data.exhibits ?? []).filter(() => true) ?? []);
	// Setup the filter for searching / join a few fields to search on
	// if no search term entered - return them all
	let filteredEntries = $derived(
		allExhibits.filter((x) => {
			if (searchTerm === '') return true;
			const location = determinePlacement(x.exhibitNumber, x.registrationYear, x.inOrOut);
			const searchText = x.exhibitNumber + '|' + x.artistName + '|' + x.title + '|' + location;
			return searchText.toLocaleLowerCase().includes(searchTerm.toLowerCase());
		})
	);

	let exhibits = $derived(filteredEntries.filter((_, idx) => idx < numToDisplay));

	const infiniteScroll = ({ getData, element }: { getData: any; element: HTMLElement }) => {
		if (element) {
			const observer = new IntersectionObserver((entries) => {
				const first = entries[0];
				if (first.isIntersecting && exhibits.length < filteredEntries.length) {
					getData();
				}
			});
			observer.observe(element);
		}
	};

	const getData = () => {
		if (exhibits.length < filteredEntries.length) {
			numToDisplay = exhibits.length + pageSize;
		}
	};

	const years = [
		{ value: '2026', label: '2026' },
		{ value: '2025', label: '2025' },
		{ value: '2024', label: '2024' },
		{ value: '2023', label: '2023' },
		{ value: '2022', label: '2022' }
	];

	let selectedYear = $state('');

	// onmount to set year if it is paassed in the URL initially
	$effect(() => {
		const url = new URL(page.url);
		const year = url.searchParams.get('year');
		selectedYear = year ? year : '2026';
	});
	const triggerYear = $derived(
		years.find((f) => f.value === selectedYear)?.label ?? 'Select a Year'
	);

	async function handleSelectYear() {
		const newURL = new URL(page.url);
		newURL.searchParams?.set('year', selectedYear);
		numToDisplay = 10;
		await goto(newURL);
	}
</script>

<section class="mx-auto mt-2">
	<div class="flex items-center gap-3">
		<h4 class="text-sm font-bold text-primary sm:hidden">Year?</h4>
		<h4 class="hidden text-xl font-bold text-primary sm:block">Exhibition Year?</h4>
		<Select.Root type="single" onValueChange={handleSelectYear} bind:value={selectedYear}>
			<Select.Trigger class="w-[120px]">{triggerYear}</Select.Trigger>
			<Select.Content>
				{#each years as year}
					<Select.Item value={year.value} label={year.label}>{year.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<SearchIcon class="text-sm font-bold text-primary sm:hidden" />
		<h4 class="hidden text-xl font-bold text-primary sm:block">Search?</h4>
		<div class="w-80 rounded">
			<input
				bind:value={searchTerm}
				onchange={() => tick()}
				type="text"
				class="w-full rounded border border-solid border-gray-300 bg-white px-1 py-1.5 text-xs font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none sm:text-base"
				placeholder="Number, Title, Artist or Location"
				aria-label="Search"
			/>
		</div>
	</div>
</section>

<section class="mx-auto mt-2">
	{#if !exhibits}
		<p>None Found...</p>
	{:else}
		<div>
			<div class="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{#each exhibits as exhibit (exhibit.entryId)}
					<CatalogueCard {...exhibit} />
				{/each}
			</div>
		</div>
		<div bind:this={element as HTMLDivElement}>
			{exhibits.length == filteredEntries.length
				? 'No Exhibits Available'
				: 'Loading Exhibits'}.....
		</div>
		<div class="mt-10"></div>
	{/if}
</section>
