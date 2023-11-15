<script lang="ts">
	import Elaimant, { type ElaimantOptions } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Crosshair } from 'lucide-svelte';

	let options: ElaimantOptions = {
		triggerDist: 250,
		speed: 350,
		dampenAmount: 2,
		mode: 'circle'
	};
</script>

<section class="flex flex-col gap-5">
	<h2>Options test</h2>
	<label>
		Distance :
		<input
			type="number"
			name="distance"
			step="10"
			min="40"
			max="500"
			bind:value={options.triggerDist}
		/> px
	</label>

	<label>
		Speed :
		<input type="number" name="speed" step="10" bind:value={options.speed} /> ms
	</label>

	<label>
		Dampen :
		<input
			type="number"
			name="dampen"
			step="0.5"
			min="1"
			max="5"
			bind:value={options.dampenAmount}
		/>
	</label>

	<label>
		mode
		<select name="mode" bind:value={options.mode}>
			<option value="circle"> Circle </option>
			<option value="block"> Block </option>
		</select>
	</label>
</section>

<section class="h-100% flex place-items-center gap-4 grow pb-52">
	<Elaimant attractionZone {options}>
		<Button variant="secondary">
			<Crosshair class="w-4 h-4" />
		</Button>
	</Elaimant>
</section>
