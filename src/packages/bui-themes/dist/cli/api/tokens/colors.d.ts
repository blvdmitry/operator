import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import type { VariablesByColorMode } from "../../../types/global";
declare const transformColors: (theme: RenderedTheme["json"]) => VariablesByColorMode;
export default transformColors;
