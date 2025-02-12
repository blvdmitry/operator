import { FontFace } from "../types/global";
declare const getTheme: (themeId: string) => Promise<{
    theme: any;
    fontFaces: FontFace[];
}>;
export default getTheme;
