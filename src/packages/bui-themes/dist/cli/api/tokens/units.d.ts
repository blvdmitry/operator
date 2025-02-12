import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import type { UnitsByViewport } from "../../../types/global";
declare const transformUnits: (theme: RenderedTheme["json"]) => UnitsByViewport;
export default transformUnits;
