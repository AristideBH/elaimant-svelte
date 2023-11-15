import type { ElaimantOptions } from "./types";
import { defaults } from "./elaimant";

export const optionsMerger = (options: Partial<Omit<ElaimantOptions, 'attractionZone'>>, attractionZone: boolean): ElaimantOptions => {
    const merged: ElaimantOptions = { ...defaults, ...options };
    if (attractionZone) merged.attractionZone = attractionZone;
    return merged
}

export const shouldStart = (options: ElaimantOptions) => {
    return !options.mouseOnly || window.matchMedia('(hover: hover)').matches;
}

// * Dynamic styling of AttractionZone
export const styleAttractionZone = (
    target: HTMLElement, options: ElaimantOptions) => {
    if (options.attractionZone) {
        const attractionZone = (target.querySelector('[data-attractionZone]') as HTMLElement)

        if (options.mode === "block") {
            const { width, height } = target.getBoundingClientRect()
            attractionZone.style.width = width + "px"
            attractionZone.style.height = height + "px"
        } else {
            attractionZone.style.width = 'unset';
            attractionZone.style.height = 'unset';
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

    // Calculate the distance between the mouse position and the center of the element
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    if (options.mode === "block") {

        // Calculate the distance to the closest point on the perimeter
        const distanceToPerimeterX = (Math.abs(deltaX) - rect.width / 2) * (deltaX < 0 ? -1 : 1);
        const distanceToPerimeterY = (Math.abs(deltaY) - rect.height / 2) * (deltaY < 0 ? -1 : 1);
        const distanceToPerimeter = Math.sqrt(distanceToPerimeterX * distanceToPerimeterX + distanceToPerimeterY * 0.95 * distanceToPerimeterY * 0.95);

        if (options.debug) console.log(`📏 Distance to perimeter: ${Math.round(distanceToPerimeter)} px`);

        return {
            distance: distanceToPerimeter,
            dx: deltaX,
            dy: deltaY
        };
    }

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (options.debug) console.log(`📏 Distance: ${Math.round(distance)} px`);

    return { dx: deltaX, dy: deltaY, distance };
}


// * Animate
export function handleAnimation(event: MouseEvent, target: HTMLElement, transformer: HTMLElement, options: ElaimantOptions) {
    const { triggerDist, dampenAmount, speed, easing } = options;
    const { dx, dy, distance } = calculateDistance(event, target, options);

    transformer.style.transition = 'transform' + ' ' + speed + 'ms ' + easing;

    function animate() {
        const shouldTranslate = distance < triggerDist;

        if (shouldTranslate) {
            transformer.style.transform = `translate(${dx / dampenAmount}px, ${dy / dampenAmount}px)`;
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