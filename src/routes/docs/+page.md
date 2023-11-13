# What does Elaimant do ?

Elaimant is a simple Sveltekit compoment that applies a magnetic attraction effect to the provided element it wraps, based on the mouse position.

> The docs are not complete yet, come back in a bit for more informations

## Installation

Use your preferred node package manager.

`npm i @arisbh/elaimant`

`pnpm add @arisbh/elaimant`

`yarn add @arisbh/elaimant`

## Usage

Import the `Elaimant` component, and wrap your content with it.

```svelte
<script lang="ts">
	import Elaimant from '@arisbh/elaimant';
</script>

<Elaimant>
	<!-- ... Your content -->
</Elaimant>
```

## Props

### Attraction zone

To show the zone where your cursor will start magnetising your element, simple use the `attractionZone` prop !

```svelte
<Elaimant attractionZone>
	<!-- ... Your content -->
</Elaimant>
```

### Options

To customize Elaimant behaviour, you have two solutions to pass an `options` object.

Directly inside the `Elaimant` component, with the options prop (Typescript autosuggestion enabled) :

```svelte
<Elaimant
	options={{
		triggerDist: 75,
		speed: 'MEDIUM',
		mode: 'circle',
		dampenAmount: 2.5
		//...
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

---

Or construct an object with the type `ElaimantOptions`, and use it inside the component :

```ts
import Elaimant, type { ElaimantOptions } from '@arisbh/elaimant';
const Options: ElaimantOptions = {
	triggerDist: 75,
	speed: 'MEDIUM',
	mode: 'circle',
	dampenAmount: 2.5;
	//...
}
```

```svelte
<Elaimant {options}>
	<!-- ... Your content -->
</Elaimant>
```

---

Here are the default options when none are passed to the Elaimant components.

| Props               | Default       | Type                              | Description (WIP) |
| ------------------- | ------------- | --------------------------------- | ----------------- |
| `triggerDist`       | `75 `         | `number`                          | ...               |
| `speed`             | `'MEDIUM'`    | `number` in millisecond           | ...               |
| `mode`              | `'circle'`    | `'circle'` or `'block'`           | ...               |
| `dampenAmount`      | `2`           | `number`                          | ...               |
| `debug`             | `false`       | `boolean`                         | ...               |
| `attractedAttrName` | `'attracted'` | `string`                          | ...               |
| `easing`            | `ease-out`    | `string`, any CSS easing function | ...               |
| `mouseOnly`         | `true`        | `boolean`                         | ...               |

### In depth

---

#### mode

> writing documentation

---

#### mouseOnly

> writing documentation

## Events

### on: directives

Elaimant comes with two events to interact with it.

- `on:attracted` triggers once when the mouse enters the attraction zone.
- `on:released` triggers once when the mouse leaves the attraction zone.

```svelte
<Elaimant on:attracted={ ... } on:released={ ... }>
	<!-- ... Your content -->
</Elaimant>
```

Both of these will return an event prop, typed as `CustomEvent`, and containing a reference to your slotted Element and options.

```ts
const handleAttracted = (e: CustomEvent) => {
	const { node, options } = e.detail;
};
```

```svelte
<Elaimant on:attracted={handleAttracted}>
	<!-- ... Your content -->
</Elaimant>
```

### Variable

It also bubbles up the `attracted` boolean for added flexibility inside your content,

```svelte
<Elaimant let:attracted>
	<YourContent>
		isAttracted:{attracted}
	</YourContent>
</Elaimant>
```

## Styling

Elaimant is nearly style-free, and should not interfere with your setup.

However, it adds a data attribute to your component when it is attracted, and is up to you to style.

```css
:global([data-attracted='true']) {
	outline: 1px solid hsl(var(--primary));
	transform: scale(1.2);
}
```

---

By default, the attribute is `[data-attracted]`, but you can override it with `options.attractedAttrName`.

---

To style the attraction zone, you can use the class directive on Elaimant to specify dedicated CSS variables.
Make sure to pass correct CSS rules.

```svelte
<Elaimant attractionZone --zone-border={'2px solid hsl(var(--primary))'} --zone-bg={'red'}>
	<!-- ... Your content -->
</Elaimant>
```

> Be aware that use custom CSS properties like so will wrap your component into another div. That is default [Svelte behaviour](https://svelte.dev/docs/component-directives#style-props).

You can also style them globaly defining them in your `:root` CSS selector.

## Caveats

- I am aware of the 'orthogonal/cross' movement when using `mode: 'block'`.

  This is because the distance is calculated from to the mouse position to the closest border of your element (top, bottom, left, right). Until I can figure how to do it from the distance to the closest point on the perimeter instead, I have no way to fix this.
  Fortunately, I believe `mode: 'circle'` will be the mostly be used.

If your encountered other bugs, feel free to open an issue on the Github page !
