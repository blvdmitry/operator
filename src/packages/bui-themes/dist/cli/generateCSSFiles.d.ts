import type { RenderedTheme } from "@bookingcom/ds-theming-client";
import type { FontFace } from "../types/global";
declare const generateCSSFiles: (apiTheme: RenderedTheme["json"], options: {
    outputDir: string;
    fontFaces: FontFace[];
}) => void;
export default generateCSSFiles;
