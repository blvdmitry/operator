import type { RenderedTheme } from "@bookingcom/ds-theming-client";
declare const generateFiles: (apiTheme: RenderedTheme["json"], options: {
    outputDir: string;
}) => void;
export default generateFiles;
