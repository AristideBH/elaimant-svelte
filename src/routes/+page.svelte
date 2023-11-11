<script lang="ts">
	import Elaimant from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { ArrowDownWideNarrow } from 'lucide-svelte';

	let attractedEl: null | EventTarget;
	const handleAttracted = (e: CustomEvent) => (attractedEl = e.detail.slottedNode.textContent);
	const handleReleased = (e: CustomEvent) => (attractedEl = null);

	const description =
		'Elaimant, pronounced [ɛlɛmɑ̃], is a simple yet fully customizable Sveltekit component to add magnetic attraction to your content when the cursor gets close to it. Style-free and no dependencies.';
</script>

<svelte:head>
	<title>Elaimant for Sveltekit</title>
	<meta name="description" content={description} />
</svelte:head>

<section class="flex flex-col items-start gap-4">
	<p class="max-w-2xl lead text-balance">
		{description}
	</p>

	<div class="flex flex-col items-start gap-6 gap-y-3">
		<Button variant="link" class="px-0 text-foreground hover:no-underline">
			<ArrowDownWideNarrow class="w-4 h-4 mr-2" />
			View the basic demos
		</Button>
		<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
	</div>
</section>

<section class="flex flex-col gap-y-32">
	<div class="flex flex-col items-center gap-32 md:flex-row gap-y-60 justify-evenly">
		<Elaimant
			attractionZone
			--attraction-zone-border={'1px dashed hsl(var(--primary))'}
			options={{ triggerDist: 100, mouseOnly: false }}
			on:attracted={handleAttracted}
			on:released={handleReleased}
		>
			<Button variant="secondary">circleMode</Button>
		</Elaimant>
		<Elaimant
			attractionZone
			--attraction-zone-border={'1px dashed hsl(var(--primary))'}
			options={{ mode: 'block', mouseOnly: false }}
			on:attracted={handleAttracted}
			on:released={handleReleased}
		>
			<Button variant="secondary">blockMode</Button>
		</Elaimant>
	</div>

	<p class="text-center">
		{attractedEl ? 'Attracted item : ' + attractedEl : 'Nothing is attracted '}
	</p>
</section>

<section class="flex flex-col items-start gap-2 isolate">
	<p class="lead text-balance">Consult the documentation to install and options</p>
	<Button href="/docs" class="no-underline" variant="outline">Read the documentation</Button>
</section>

<style lang="postcss">
	:global(button.attracted) {
		outline: 1px solid hsl(var(--primary));
		transform: scale(1.2);
	}
</style>
