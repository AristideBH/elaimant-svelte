import { type ElaimantOptions, type Mandatory, Speeds } from "./elaimant";

// * Get the speed value
function getSpeedValue(speedKey: keyof typeof Speeds): string {
    return Speeds[speedKey];
}


// * Slotted element validation
export function validateSlot(node: Element, options: ElaimantOptions) {
    const { debug } = options;

    if (node.childNodes.length === 0) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaiment");
        return false;
    }
    if (node.childNodes[0].nodeName === '#text') {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content in a tag (eg: span, div, h1, etc)."
            );
        return false;
    }
    if (node.children.length > 1 && !node.children[1].classList.contains("attractionZone")) {
        if (debug) console.warn("🧲 You can only provide one child element to Elaimant");
        return false;
    }

    return true;
}


// * Calculate distance from element based on the mode
export function calculateDistance(
    event: MouseEvent,
    node: HTMLElement,
    options: Mandatory<ElaimantOptions>
): { dx: number, dy: number, distance: number } {

    const { mode } = options;
    let distance: number,
        dx: number,
        dy: number
    const rect = node.getBoundingClientRect();

    if (mode == "block") {
        const x = Math.max(rect.left, Math.min(event.clientX, rect.right));
        const y = Math.max(rect.top, Math.min(event.clientY, rect.bottom));

        dx = event.clientX - x;
        dy = event.clientY - y;
        distance = Math.sqrt(dx * dx + dy * dy);

    } else {
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        dx = event.clientX - center.x;
        dy = event.clientY - center.y;
        distance = Math.sqrt(dx * dx + dy * dy);
    }
    if (options.debug) console.log(`🧲 Distance: ${Math.round(distance)} px`);

    return { dx, dy, distance };
}


// * AttractionZone element
export function CreateAttractionZone(options: Mandatory<ElaimantOptions>, slottedSize: { width: number; height: number; }, node: HTMLElement) {
    const attractionZone = document.createElement("div");
    attractionZone.classList.add("attractionZone");
    attractionZone.style.padding = options.triggerDist + "px";
    attractionZone.style.translate = `calc(-50% + ${slottedSize.width / 2}px) calc(-50% + ${slottedSize.height / 2}px)`;
    attractionZone.style.display = "block";
    if (options.mode == "block") {
        attractionZone.style.width = slottedSize.width + 'px'
        attractionZone.style.height = slottedSize.height + 'px'
        attractionZone.style.borderRadius = options.triggerDist + 'px'
    }

    node.appendChild(attractionZone);
    return attractionZone
}


// * Animate
export function handleAnimation(event: MouseEvent, node: HTMLElement, slotted: HTMLElement, options: Mandatory<ElaimantOptions>) {
    const { dx, dy, distance } = calculateDistance(event, node, options);
    const { triggerDist, dampenAmount, speed, easing } = options;

    function animate() {
        slotted.style.transition = 'transform ' + getSpeedValue(speed) + " " + easing;

        if (distance < triggerDist) {
            const translateX = dx / dampenAmount;
            const translateY = dy / dampenAmount;
            slotted.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
            slotted.style.transform = `translate(0px, 0px)`;
        }

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}