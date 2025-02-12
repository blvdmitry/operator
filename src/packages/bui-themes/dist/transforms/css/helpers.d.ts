import type { Animations, Variables, Viewport } from "../../types/global";
import type { Mode } from "../../types/theme";
export declare function camelToKebab(str: string): string;
export declare const getMediaQueryName: (viewport: Viewport) => string;
export declare const getMediaQueryValueByViewport: (viewport: Viewport) => string;
export declare const getFontVariableName: (tokenName: string, property: string) => string;
export declare const additionalProperties: {
    remPixel: {
        property: string;
        value: string;
    };
    remSpacing1X: {
        property: string;
        value: (units: Variables) => string;
    };
};
export declare const makeCSSVariableString: ([key, value]: [string, string], castKeysToSnakeCase?: boolean) => string;
export declare const makeCSSAnimationString: ([key, value]: [
    string,
    Animations[string]
]) => string;
export declare const getScopeSelector: (themeId: string, mode: Mode) => string;
export declare const generateCSSVariablesByMode: (args: {
    themeId: string;
    mode: Mode;
    colors?: Variables;
    units?: Variables;
    fonts?: Variables;
}) => string;
