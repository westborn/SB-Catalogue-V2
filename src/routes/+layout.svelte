<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { TailwindIndicator } from '$lib/components/index.ts';

	let { children } = $props();

	$effect(() => {
		console.info(`
Environment:        dev:${dev} meta.env.MODE:${import.meta.env.MODE}
NAME:               ${__NAME__}
VERSION:            ${__VERSION__}
GITHUBURL           ${__GITHUBURL__}
SVELTEVERSION:      ${__SVELTEVERSION__}
SVELTEKITVERSION:   ${__SVELTEKITVERSION__}
VITEVERSION:        ${__VITEVERSION__}
TAILWINDCSSVERSION: ${__TAILWINDCSSVERSION__}`);
	});
</script>

<svelte:head>
	<title>Catalogue</title>
</svelte:head>

<section class="px-1 sm:container">
	<nav class=" grid h-14 grid-cols-[60px_1fr] items-center justify-center">
		<img src="/favicon-32x32.png" alt="Sculpture Bermagui Logo" class="mt-2 h-10" />
		<h1 class="text-lg text-primary-400">Sculpture Bermagui Catalogue</h1>
	</nav>

	{@render children()}
</section>
{#if dev}
	<TailwindIndicator />
{/if}
