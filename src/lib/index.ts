// Reexport your entry components here
import Elaimant from "./Elaimant.svelte";

import { defaults, elaimant, Speeds } from "./elaimant.js";
import type { ElaimantOptions, Mandatory } from "./elaimant.js";

export default Elaimant
export { defaults, elaimant, Speeds }
export type { Mandatory, ElaimantOptions }
