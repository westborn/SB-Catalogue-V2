<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchIcon from 'lucide-svelte/icons/search';

	import { CatalogueCard } from '$lib/components';
	import * as Select from '$lib/components/ui/select/index.ts';
	import type { Exhibit } from '$lib/components/server/registrationDB.js';

	$effect(() => {
		infiniteScroll({ getData, element });
		// TODO - check that we get more data than the page size for the initial display
		// if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		// alert("bottom of the page reached"); }
	});

	const { data } = $props();
	let searchTerm = $state('');
	const pageSize = 3; // Number of items to scroll at a time
	let numToDisplay = $state(10);

	let element = $state();

	function determinePlacement(
		exhibitNumberString: string,
		exhibitionYear: string,
		inOrOut: string
	) {
		if (parseInt(exhibitionYear) < 2024) {
			return inOrOut;
		}
		const exhibitNumber = parseInt(exhibitNumberString);
		if (exhibitNumber >= 100 && exhibitNumber < 400) {
			return 'Headland';
		} else if (exhibitNumber >= 400 && exhibitNumber < 500) {
			return 'Hotel';
		} else if (exhibitNumber >= 500 && exhibitNumber < 800) {
			return 'Surf Gallery';
		} else if (exhibitNumber >= 800 && exhibitNumber < 900) {
			return 'Street Gallery';
		}
	}

	let allExhibits: Exhibit[] = $derived($page.data.exhibits?.slice(0, 999) ?? []);

	// Setup the filter for searching / join a few fields to search on
	// if no search term entered - return them all
	let filteredEntries = $derived(
		allExhibits.filter((x) => {
			if (searchTerm === '') return true;
			const location = determinePlacement(x.exhibitNumber, x.registrationYear, x.inOrOut);
			const searchText = x.exhibitNumber + x.artistName + x.title + location;
			return searchText.toLocaleLowerCase().includes(searchTerm.toLowerCase());
		})
	);

	let exhibits = $derived(filteredEntries.slice(0, numToDisplay)); // initial page load to be greater than "body" so user can scroll
	// let exhibits = $state(allExhibits); // initial page load to be greater than "body" so user can scroll

	const infiniteScroll = ({ getData, element }: { getData: any; element: HTMLElement }) => {
		if (element) {
			const observer = new IntersectionObserver((entries) => {
				const first = entries[0];
				// console.log('getting data', window.innerHeight, first.rootBounds?.top, first.boundingClientRect.top);
				if (first.isIntersecting && exhibits.length < allExhibits.length) {
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
		{ value: '2025', label: '2025' },
		{ value: '2024', label: '2024' },
		{ value: '2023', label: '2023' },
		{ value: '2022', label: '2022' }
	];

	let selectedYear = $state({ value: '2025', label: '2025' });

	function handleSelectYear(event: any) {
		selectedYear = { ...event };
		const newURL = new URL($page.url);
		newURL.searchParams?.set('year', selectedYear.value);
		console.log(newURL.toString());
		goto(newURL);
	}
</script>

<section class="mx-auto mt-2">
	<div class="flex items-center gap-3">
		<h4 class="text-sm font-bold text-primary sm:hidden">Year?</h4>
		<h4 class="hidden text-xl font-bold text-primary sm:block">Exhibition Year?</h4>
		<Select.Root onSelectedChange={handleSelectYear} selected={selectedYear}>
			<Select.Trigger class="w-[120px]">
				<Select.Value placeholder="Select a year" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Year</Select.Label>
					{#each years as year}
						<Select.Item value={year.value} label={year.label}>{year.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="entryYear" />
		</Select.Root>
		<SearchIcon class="text-sm font-bold text-primary sm:hidden" />
		<h4 class="hidden text-xl font-bold text-primary sm:block">Search?</h4>
		<div class="w-80 rounded">
			<input
				bind:value={searchTerm}
				type="search"
				class="w-full rounded border border-solid border-gray-300 bg-white px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
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
				{#each exhibits as exhibit}
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
