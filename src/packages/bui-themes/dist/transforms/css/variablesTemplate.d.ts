import type { FontFace } from "../../types/global";
import { Mode, TransformedThemeResponse } from "../../types/theme";
declare const variablesTemplate: (theme: TransformedThemeResponse, fontFaces: FontFace[], mode?: Mode) => string;
export default variablesTemplate;
