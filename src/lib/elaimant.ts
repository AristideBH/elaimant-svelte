import '$lib/elaimant.css'

// TYPES AND DEFINITIONS
export enum Speed {
    SNAIL = "2000ms",
    SLOW = "600ms",
    MEDIUM = "300ms",
    FAST = "150ms",
    INSTANT = "7ms"
}

export type Mandatory<T> = {
    [K in keyof T]-?: T[K];
};

export type ElaimantOptions = {
    triggerDist?: number;
    speed?: keyof typeof Speed;
    dampenAmount?: number;
    debug?: boolean
}

function getSpeedValue(speedKey: keyof typeof Speed): string {
    return Speed[speedKey];
}


// DEFAULT PARAMETERS
export const defaults: Mandatory<ElaimantOptions> = {
    triggerDist: 75,
    speed: 'MEDIUM',
    dampenAmount: 2,
    debug: false
}


// ACTION
export function elaimant(
    targetNode: HTMLElement,
    elaimantOptions: ElaimantOptions = defaults
) {
    const options: Mandatory<ElaimantOptions> = { ...defaults, ...elaimantOptions }
    const { debug } = options
    let animationFrameId: null | number = null;
    let attracted = false;

    targetNode.classList.add("elaimant-wrapper")

    // VALIDATIONS
    if (targetNode.children.length == 0) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaiment");
        return;
    }
    if (targetNode.children.length > 1) {
        if (debug) console.warn("🧲 You can only provide one child element to Elaimant");
        return;
    }
    if (targetNode.children[0].nodeName == "#text") {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content inside a tag (eg: span, div, h1, etc)."
            );
        return;
    }
    if (debug) console.log("🧲 Options:", options);


    const child = targetNode.children[0] as HTMLElement;
    child.classList.add("elaimant-child");


    function AnimateElaimant(event: MouseEvent) {

        if (animationFrameId) return; // If there's already a scheduled animation frame, exit

        animationFrameId = requestAnimationFrame(() => {
            child.style.transitionDuration = getSpeedValue(options.speed)
            const rect = targetNode.getBoundingClientRect();
            const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

            const dx = event.clientX - center.x;
            const dy = event.clientY - center.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < options.triggerDist) {
                if (debug) console.log("🧲 Under mouse influence", attracted);
                attracted = true

                const translateX = dx / options.dampenAmount;
                const translateY = dy / options.dampenAmount;
                child.style.transform = `translate(${translateX}px, ${translateY}px)`;
            } else {
                child.style.transform = `translate(0px, 0px)`;
                attracted = false

            }

            animationFrameId = null; // Reset animation frame ID
        });
    }

    window.addEventListener("mousemove", AnimateElaimant);

    return {
        update(attracted: boolean) {
            console.log(attracted);
        },
        destroy() {
            window.removeEventListener('mousemove', AnimateElaimant)
        }, attracted
    };
}

