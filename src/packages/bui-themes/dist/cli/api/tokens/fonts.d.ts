import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import type { TransformOptions, FontsByViewport } from "../../../types/global";
declare const transformFonts: (theme: RenderedTheme["json"], options?: TransformOptions) => FontsByViewport;
export default transformFonts;
