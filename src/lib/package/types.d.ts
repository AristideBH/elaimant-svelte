export interface Attributes {
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
