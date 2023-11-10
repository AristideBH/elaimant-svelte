<script lang="ts">
	import Elaimant, { type ElaimantOptions } from '$lib';
</script>

<main>
	<Elaimant
		let:attracted
		on:attracted={() => {}}
		on:released={() => {}}
		options={{ speed: 'FAST', triggerDist: 100, debug: true }}
	>
		<button>
			isAttracted: <br />{attracted}
		</button>
	</Elaimant>
</main>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}

	main {
		height: 100dvh;
		display: grid;
		place-items: center;
	}

	button {
		color: black;
	}

	:global(button.attracted) {
		outline: 1px solid green;
	}
</style>
