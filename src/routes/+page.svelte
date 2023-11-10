<script lang="ts">
	import Elaimant, { type ElaimantOptions } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { ArrowDownWideNarrow } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Elaimant for Sveltekit</title>
</svelte:head>

<section class="flex flex-col items-start gap-4">
	<p class="max-w-2xl lead text-balance">
		Elaimant, pronounced [ɛlɛmɑ̃], is a simple yet fully customizable Sveltekit component to add
		magnetic attraction to your content when the cursor gets close to it. Style-free and no
		dependencies.
	</p>

	<div class="flex flex-col items-start gap-6 gap-y-3">
		<Button variant="link" class="px-0 text-foreground hover:no-underline">
			<ArrowDownWideNarrow class="w-4 h-4 mr-2" />
			View the basic demos
		</Button>
		<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
	</div>
</section>

<section class=" flex flex-col md:flex-row gap-32 gap-y-64 items-center justify-evenly">
	<Elaimant options={{ triggerDist: 100, mouseOnly: false, debug: true }}>
		<Button variant="secondary">circleMode</Button>
	</Elaimant>
	<Elaimant options={{ mode: 'block', mouseOnly: false, debug: true }}>
		<Button variant="secondary">blockMode</Button>
	</Elaimant>
</section>

<section class="flex flex-col items-start gap-2 isolate">
	<p class="lead text-balance">Consult the documentation to install and options</p>
	<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
</section>

<style lang="postcss">
	section + section {
		@apply mt-52;
	}
	:global(button.attracted) {
		outline: 1px solid hsl(var(--primary));
	}
</style>
