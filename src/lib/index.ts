// Reexport your entry components here
import Elaimant from "./Elaimant.svelte";
import { defaultOptions } from "./elaimant.js";
import type { Options } from "./elaimant.js";

export default Elaimant
export { defaultOptions }
export type ElaimantOptions = Options
