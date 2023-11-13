// Reexport your entry components here
import Elaimant from "./package/Elaimant.svelte";
import type { ElaimantOptions as MandatoryOptions } from "./package/elaimant.js";

type ElaimantOptions = Partial<Omit<MandatoryOptions, 'attractionZone'>>

export default Elaimant
export type { ElaimantOptions }
