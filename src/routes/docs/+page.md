## What does it do ?

Elaimant is a simple Sveltekit compoment that applies a magnetic attraction effect to the provided element it wraps, based on the mouse position.

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

To show the zone where your cursor will start magnetising your element, simple use the `attractionZone` prop.

```svelte
<Elaimant attractionZone>
	<!-- ... Your content -->
</Elaimant>
```

### Options

To customize Elaimant behaviour, you can pass your options in two ways.

Directly inside the `Elaimant` component, with the `options` prop (Typescript autosuggestions enabled).

```svelte
<Elaimant
	options={{
		triggerDist: 75,
		speed: 300
		//...
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

Or construct an object with the type `ElaimantOptions`, and use it inside the component.

```ts
import Elaimant, type { ElaimantOptions } from '@arisbh/elaimant';

const Options: ElaimantOptions = {
	triggerDist: 75,
	speed: 300
	//...
}
```

```svelte
<Elaimant {options}>
	<!-- ... Your content -->
</Elaimant>
```

Here are the default options when none are passed to the Elaimant components.

| Props               | Default       | Type                              | Description (WIP) |
| ------------------- | ------------- | --------------------------------- | ----------------- |
| `triggerDist`       | `75 `         | `number` in pixel                 | ...               |
| `speed`             | `300`         | `number` in millisecond           | ...               |
| `easing`            | `ease-out`    | `string`, any CSS easing function | ...               |
| `mode`              | `'circle'`    | `'circle'` or `'block'`           | ...               |
| `dampenAmount`      | `2`           | `number`                          | ...               |
| `attractedAttrName` | `'attracted'` | `string`                          | ...               |
| `mouseOnly`         | `true`        | `boolean`                         | ...               |
| `debug`             | `false`       | `boolean`                         | ...               |

### In depth

---

#### mode

Elaimant provides two mode to interpret the attraction zone:

- circle :
  This create a simple circle from the center of your element, with padding set to the trigger distance.
  It is better suited for squarish element.
- block :
  This create a box around your component, taking into account its size and the trigger distance.
  It is better suited for element with eneven width and height.

---

#### mouseOnly

Smartphones browsers do not have a `hover` state on elements, thus, this effect is not quite appropriate.
By default, if the module detect the client doesn't support `hover`, no event listener will be added to your content, keeping the calculation to zero.

Overwise, if you still want to force the effect, you can with this options. Your content will move toward your touch position inside the attraction zone, and released when something else is touch.

## Events

### Directives

Elaimant comes with two events to interact with it.

- `on:attracted` triggers once when the mouse enters the attraction zone.
- `on:released` triggers once when the mouse leaves the attraction zone.

```ts
const handleElaimant = (e: CustomEvent) => {
	const { slotted, options } = e.detail;
};
```

```svelte
<Elaimant on:attracted={handleElaimant} on:released={handleElaimant}>
	<!-- ... Your content -->
</Elaimant>
```

Both of these will return an event prop, typed as `CustomEvent`, and containing a reference to your slotted Elements and options.

### Variable

It also bubbles up the `attracted` boolean for added flexibility inside your content,

```svelte
<Elaimant let:attracted>
	<YourContent>
		isAttracted: {attracted}
	</YourContent>
</Elaimant>
```

## Styling

Elaimant is nearly style-free, and should not interfere with your setup.

### Your content

However, it adds a data attribute to your elements when they are attracted, allowing you to style them how you want.

```css
:global([data-attracted='true']) {
	outline: 1px solid hsl(var(--primary));
	transform: scale(1.2);
}
```

By default, the attribute is `[data-attracted]`, but you can override it with `options.attractedAttrName`.

### AttractionZone

You can use the class directive on Elaimant to specify dedicated CSS variables.
Make sure to pass correct CSS rules.

> Be aware that using custom CSS properties will wrap your component into another div.
> This is default [Svelte behaviour](https://svelte.dev/docs/component-directives#style-props).

```svelte
<Elaimant attractionZone --zone-border={'2px solid hsl(var(--primary))'} --zone-bg={'red'}>
	<!-- ... Your content -->
</Elaimant>
```

You can also style them globaly defining them in your `:root` CSS selector.

## Caveats

- I am aware of the 'orthogonal/cross' movement when using `mode: 'block'`.

  This is because the distance is calculated from the mouse position to the closest border of your element (top, bottom, left or right). Until I can figure how to do it from the closest point on the perimeter, I have no way to fix this.
  Fortunately, I believe `mode: 'circle'` will mostly be used.

If your encountered other bugs, feel free to open an issue on the Github page !
