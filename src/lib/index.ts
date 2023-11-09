// Reexport your entry components here
import Elaimant from "./Elaimant.svelte";

import { defaults, elaimant, Speed } from "./elaimant.js";
import type { ElaimantOptions, Mandatory } from "./elaimant.js";

export default Elaimant
export { defaults, elaimant, Speed }
export type { Mandatory, ElaimantOptions }
