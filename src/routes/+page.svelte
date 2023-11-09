<script lang="ts">
	import Elaimant from '$lib';
</script>

<main>
	<Elaimant
		options={{ triggerDist: 150, dampenAmount: 1, debug: true }}
		let:attracted
		on:attracted={() => {
			// console.log('attracted');
		}}
		on:released={() => {
			// console.log('released');
		}}
	>
		<div>isAttracted: <br />{attracted}</div>
	</Elaimant>
</main>

<style>
	main {
		height: 100dvh;
		display: grid;
		place-items: center;
	}
	div {
		border: 1px solid black;
		min-width: 50px;
		padding: 1em;
		background-color: white;
	}

	:global(.attracted) {
		color: green;
	}
</style>
