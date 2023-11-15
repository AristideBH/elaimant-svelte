// Reexport your entry components here
import Elaimant from "./package/Elaimant.svelte";
import type { PublicElaimantOptions } from "./package/types";

type ElaimantOptions = PublicElaimantOptions

export default Elaimant
export type { ElaimantOptions }
