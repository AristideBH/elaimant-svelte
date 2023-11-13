import { type ElaimantOptions } from "./elaimant";

// * Dynamic styling of AttractionZone
export const styleAttractionZone = (
    target: HTMLElement, options: ElaimantOptions) => {
    if (options.attractionZone) {
        const attractionZone = (target.querySelector('[data-attractionZone]') as HTMLElement)

        if (options.mode === "block") {
            const { width, height } = target.getBoundingClientRect()
            attractionZone.style.width = width + "px"
            attractionZone.style.height = height + "px"
        }

        attractionZone.style.padding = options.triggerDist + "px";
        attractionZone.style.borderRadius = options.triggerDist + "px";
    }
}


// * Calculate distance from element to the mouse based on the mode
export function calculateDistance(
    event: MouseEvent,
    target: HTMLElement,
    options: ElaimantOptions
): { dx: number, dy: number, distance: number } {

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (options.mode === "block")
        ? Math.max(rect.left, Math.min(event.clientX, rect.right))
        : centerX;
    const y = (options.mode === "block")
        ? Math.max(rect.top, Math.min(event.clientY, rect.bottom))
        : centerY;

    const dx = event.clientX - x;
    const dy = event.clientY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (options.debug) console.log(`📏 Distance: ${Math.round(distance)} px`);

    return { dx, dy, distance };
}


// * Animate
export function handleAnimation(event: MouseEvent, target: HTMLElement, transformer: HTMLElement, options: ElaimantOptions) {
    const { triggerDist, dampenAmount, speed, easing, mode } = options;
    const { dx, dy, distance } = calculateDistance(event, target, options);

    transformer.style.transition = 'transform' + ' ' + speed + 'ms ' + easing;

    function animate() {
        const shouldTranslate = distance < triggerDist;

        if (shouldTranslate) {
            const factorCorrection = mode === 'block' ? 1.75 : 1; // adapt factor depending on the mode
            transformer.style.transform = `translate(${dx / dampenAmount * factorCorrection}px, ${dy / dampenAmount * factorCorrection}px)`;
        } else {
            transformer.style.transform = 'translate(0px, 0px)';
        }
        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}


// * Get Slotted

export const getSlottedNodes = (element: HTMLElement) => {
    return element.querySelector(
        '[data-attractionTransformer]'
    )!.children
}