<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { defaults, elaimant, type ElaimantOptions } from '$lib';

	const dispatch = createEventDispatcher();
	export let options: ElaimantOptions = defaults;
	export let attracted = false;

	const handleAttracted = () => {
		attracted = true;
		dispatch('attracted');
	};
	const handleRelease = () => {
		attracted = false;
		dispatch('released');
	};
</script>

<div
	class="elaimant"
	on:released={handleRelease}
	on:attracted={handleAttracted}
	use:elaimant={options}
>
	<slot {attracted} />
</div>
