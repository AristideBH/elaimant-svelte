function debounce(callback: (event: MouseEvent) => void, interval: number) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (event: MouseEvent) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => callback(event), interval);
    };
}

export enum Speed {
    SNAIL = "3000ms",
    SLOW = "600ms",
    MEDIUM = "300ms",
    FAST = "150ms",
    INSTANT = "7ms"
}

export interface Options {
    triggerDist?: number;
    speed?: string;
    dampenAmount?: number;
}

export const defaultOptions: Options = {
    triggerDist: 50,
    speed: Speed.MEDIUM,
    dampenAmount: 4
};

const Elaimant = (
    element: HTMLElement,
    options: Options = defaultOptions,
    debug = false
) => {
    // Check if the element exists and has a child
    if (!element || !element.firstChild) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaiment");
        return;
    }
    // Check if the child is a text node
    if (element.firstChild.nodeName == "#text") {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content inside a tag (eg: span, div, h1, etc)."
            );
        return;
    }

    const child = element.firstChild as HTMLElement;
    // Add the class "Elaimant-child" to the child element
    child.classList.add("Elaimant-child");

    // Clamp the dampen amount between -6 and 6
    const clampedDampenAmount = options.dampenAmount
        ? Math.min(Math.max(options.dampenAmount, -6), 6)
        : defaultOptions.dampenAmount;

    // Debounce the event handler so it only runs every 5ms
    const debounceElaimant = debounce((event: MouseEvent) => {
        // Calculate the center coordinates of the element
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        // Calculate the distance between the current mouse position and the initial position
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the distance is less than the trigger distance,
        // update the element's transform style to move it based on the distance and clamped dampen amount
        if (options.triggerDist && distance < options.triggerDist && clampedDampenAmount) {
            const translateX = dx / clampedDampenAmount;
            const translateY = dy / clampedDampenAmount;
            child.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
            // Otherwise, reset the element's transform style
            child.style.transform = `translate(0px, 0px)`;
        }
    }, 6);

    // Add the debounced event handler to the mousemove event
    window.addEventListener("mousemove", debounceElaimant);
};

export default Elaimant;