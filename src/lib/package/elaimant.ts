import type { ActionReturn } from 'svelte/action';
import { handleAnimation, calculateDistance, styleAttractionZone, shouldStart } from "./helpers";

// * TYPES
interface Attributes {
    'on:attracted': (e: CustomEvent<boolean>) => void;
    'on:released': (e: CustomEvent<boolean>) => void;
}

export type ElaimantOptions = {
    triggerDist: number;
    speed: number;
    mode: 'circle' | 'block'
    dampenAmount: number;
    debug: boolean,
    easing: string,
    mouseOnly: boolean,
    attractionZone?: boolean
}


// * DEFAULT PARAMETERS
export const defaults: ElaimantOptions = {
    triggerDist: 75,
    speed: 300,
    mode: "circle",
    dampenAmount: 2,
    debug: false,
    easing: "ease-out",
    mouseOnly: true,
}


// * ////////////////////////////////
// * ACTION
export function elaimant(
    target: HTMLElement,
    options: ElaimantOptions
): ActionReturn<ElaimantOptions, Attributes> {
    const transformer = target.children[0] as HTMLElement;
    if (!transformer) return {}

    let isAttracted = false
    styleAttractionZone(target, options)

    function startAttraction(event: MouseEvent, options: ElaimantOptions) {
        handleAnimation(event, target, transformer, options);

        const { triggerDist } = options;
        const { distance } = calculateDistance(event, target, options);

        const attractedAttribute = (isAttracted: boolean) => {
            for (const node of Array.from(transformer.children)) {
                node.setAttribute(`data-attracted`, !isAttracted ? "false" : "true")
            }
            const attractionZone = target.querySelector('[data-attractionZone]');

            if (!attractionZone) return

            (attractionZone as HTMLElement)
                .setAttribute(`data-attracted`, !isAttracted ? "false" : "true")

        }

        attractedAttribute(isAttracted)

        if (distance < triggerDist && !isAttracted) {
            isAttracted = true;
            if (options.debug) console.log('🧲 Element attracted')
            target.dispatchEvent(new CustomEvent('attracted'));
        } else if (distance >= triggerDist && isAttracted) {
            isAttracted = false;
            if (options.debug) console.log('🧲 Element release')
            target.dispatchEvent(new CustomEvent('released'));
        }
    }

    if (shouldStart(options)) {
        window.addEventListener("mousemove", (e) => startAttraction(e, options));
    }

    return {
        update(updatedOptions) {
            styleAttractionZone(target, updatedOptions);
            window.removeEventListener('mousemove', (e) => startAttraction(e, options));

            if (shouldStart(updatedOptions)) {
                window.addEventListener("mousemove", (e) => startAttraction(e, updatedOptions));
            }

            options = updatedOptions;
        },
        destroy() {
            if (window.matchMedia('(hover: hover)').matches) {
                window.removeEventListener('mousemove', (e) => startAttraction(e, options));
            }
        },
    };

}

