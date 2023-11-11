<script>
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Github, ScrollText } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<ModeWatcher />

<header
	class="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 py-4 border-b lg:py-8 bg-background"
>
	<a href="/" class="no-underline text-foreground">
		<h1 class="tracking-wide">elaimant</h1>
	</a>
	<nav class="flex gap-1.5 ms-auto">
		<!-- <code class="hidden px-3 sm:block bg-muted">npm i @arisbh/coulisse</code> -->
		<Button variant="outline" class="no-underline" href="/docs" title="Documentation">
			<ScrollText class="w-4 h-4" />
			<span class="hidden sm:block sm:ml-2">Documentation</span>
		</Button>
		<Button
			variant="outline"
			class="no-underline"
			href="https://github.com/AristideBH/elaimant-svelte"
			target="_blank"
			size="icon"
			title="GitHub page"
		>
			<Github class="w-4 h-4 " />
		</Button>
	</nav>
</header>

<main class="py-24 grow">
	<slot />
</main>

<footer class="flex flex-wrap items-center py-4 border-t gap-x-3 gap-y-1">
	<span class="me-auto">
		Made with ♡ by <a href="https://github.com/AristideBH">@AristideBH</a>
	</span>
	<span class="flex gap-3">
		{#if $page.route.id === '/'}
			<a href="/docs">Docs</a>
		{:else}
			<a href="/">Home</a>
		{/if}
		<a href="https://github.com/AristideBH/elaimant-svelte" target="_blank">GitHub</a>
	</span>
</footer>
