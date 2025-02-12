import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import { Animations } from "../../../types/global";
declare const transformAnimations: (theme: RenderedTheme["json"]) => Animations;
export default transformAnimations;
