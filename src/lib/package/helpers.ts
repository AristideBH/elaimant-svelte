import type { ElaimantOptions, MousePosition, PublicElaimantOptions, Props } from "./types";
import { defaults } from "./elaimant";

// * Merge the passed optional option too the default for a full ElaimantOptions object
export const optionsMerger = (options: PublicElaimantOptions, props: Props) => {
    const merged: ElaimantOptions = { ...defaults, ...options };

    props.forEach(prop => {
        const key = Object.keys(prop)
        const value = Object.values(prop)
        // @ts-expect-error key[i] is not typed enough to get merged suggestions
        if (value[0]) merged[key[0]] = value[0]
    });

    return merged
}


// * Should the action run depending on system hover and options.mouseOnly 
export const shouldStart = (options: ElaimantOptions) => {
    return options.enableOnTouch || window.matchMedia('(hover: hover)').matches;
}


// * Add attracted data attribute to transformer and attractionZone elements
export const addAttractedAttribute = (
    isAttracted: boolean,
    transformer: HTMLElement,
    attractionZone: HTMLElement
) => {
    for (const node of Array.from(transformer.children)) {
        node.setAttribute(`data-attracted`, !isAttracted ? "false" : "true")
    }

    if (attractionZone) {
        (attractionZone).setAttribute(`data-attracted`, !isAttracted ? "false" : "true")
    }
}

// * Styling of AttractionZone based on options.mode
export const styleAttractionZone = (
    target: HTMLElement,
    options: ElaimantOptions,
    attractionZone: HTMLElement
) => {
    if (options.attractionZone) {

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


// * Calculate mouse distance from target based on options.mode
export const calculateDistance = (
    mousePos: MousePosition,
    target: HTMLElement,
    options: ElaimantOptions
) => {

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mousePos.x - centerX;
    const deltaY = mousePos.y - centerY;

    if (options.mode === "block") {
        const distanceToPerimeterX = (Math.abs(deltaX) - rect.width / 2) * (deltaX < 0 ? -1 : 1);
        const distanceToPerimeterY = (Math.abs(deltaY) - rect.height / 2) * (deltaY < 0 ? -1 : 1);
        const distanceToPerimeter = Math.sqrt(distanceToPerimeterX * distanceToPerimeterX + distanceToPerimeterY * 0.95 * distanceToPerimeterY * 0.95);

        if (options.debug === true) console.log(`📏 Distance to perimeter: ${Math.round(distanceToPerimeter)} px`);
        return {
            distance: distanceToPerimeter,
            dx: deltaX,
            dy: deltaY
        };
    }

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (options.debug === true) console.log(`📏 Distance: ${Math.round(distance)} px`);
    return { dx: deltaX, dy: deltaY, distance };
}


// * Animate transformer if distance is in range
export const handleAnimation = (
    mousePos: MousePosition,
    target: HTMLElement,
    transformer: HTMLElement,
    options: ElaimantOptions
) => {
    const { triggerDist, dampenAmount, speed, easing } = options;
    const { dx, dy, distance } = calculateDistance(mousePos, target, options);

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


// * Get transformer slotted elements 
export const getSlottedNodes = (element: HTMLElement) => {
    return element.querySelector(
        '[data-attractionTransformer]'
    )!.children
}