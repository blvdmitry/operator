import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import { TransformOptions } from "../../types/global";
import { TransformedThemeResponse } from "../../types/theme";
export declare const transformTheme: (theme: RenderedTheme["json"], options?: TransformOptions) => TransformedThemeResponse;
