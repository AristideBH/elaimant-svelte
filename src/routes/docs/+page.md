# What does Elaimant do ?

Elaimant is a simple Sveltekit compoment that applies a magnetic attraction effect to the mouse, to the provided element it wraps.
It wrap your given element inside a container for translation purpose, but is auto-sized and should not break your design.

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

The component is designed to only receive **one** child element, and doesn't accept just text node. Some checks are in place, and Elaimant will not start otherwise.

> Make sure your content is inside an HTML tag (div, span, button, etc) !

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

| Props            | Default       | Type                                                     | Description (WIP) |
| ---------------- | ------------- | -------------------------------------------------------- | ----------------- |
| `triggerDist`    | `75 `         | `number`                                                 | ...               |
| `speed`          | `'MEDIUM'`    | `'SNAIL'`, `'SLOW'`, `'MEDIUM'`, `'FAST'` or `'INSTANT'` | ...               |
| `mode`           | `'circle'`    | `'circle'` or `'block'`                                  | ...               |
| `dampenAmount`   | `2`           | `number`                                                 | ...               |
| `debug`          | `false`       | `boolean`                                                | ...               |
| `attractedClass` | `'attracted'` | `string`                                                 | ...               |
| `easing`         | `ease-out`    | `string`, CSS easing function (bezier supported)         | ...               |
| `mouseOnly`      | `true`        | `boolean`                                                | ...               |

### In depth

---

#### mode

> writing documentation

---

#### mouseOnly

> writing documentation

## Events

Elaimant comes with two events to interact with it.

- `on:attracted` triggers once when the mouse enters the attraction zone.
- `on:released` triggers once when the mouse leaves the attraction zone.

```svelte
<Elaimant
	on:attracted={() => {
		//.. do whatever
	}}
	on:released={() => {
		//.. do whatever
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

---

It also bubbles up the `attracted` boolean for added flexibility inside your content,

```svelte
<Elaimant let:attracted>
	<div>
		isAttracted:{attracted}
	</div>
</Elaimant>
```

## Styling

Elaimant is nearly style-free, and should not interfere with your setup.

However, it adds a class when your component when is attracted, and is up to you to style.

```css
:global(div.attracted) {
	outline: 1px solid green;
}
```

---

By default, the class is `attracted`, but you can override with `options.attractedClass`.

---

To style the attraction zone, you can use the class directive on Elaimant to specify dedicated CSS variables.
Make sure to pas correct CSS rules.

```svelte
<Elaimant
	attractionZone
	--attraction-zone-border={'2px solid hsl(var(--primary))'}
	--attraction-zone-bg={'red'}
>
	<!-- ... Your content -->
</Elaimant>
```

## Caveats

- Using custom CSS `transform` on your given component will not work, as the animation is acheived throught this proprety.
  A solution to this could be wrapping your element in yet another node, and use the translate on that. I will think a bit more about it, and maybe gather some of your feedback before putting to much headthought in it.

If your encountered other bugs, feel free to open an issue on the Github page !
