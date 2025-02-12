export type Variable = string;
export type Variables = {
    [variableName: string]: string;
};
export type VariablesByViewport = {
    [viewport in Viewport]: Variables;
};
export type VariablesByColorMode = Record<string, {
    light: string;
    dark: string;
}>;
export type Animations = {
    [animationName: string]: {
        duration: string;
        timingFunction: string;
    };
};
export type Shadow = {
    offset: {
        x: number;
        y: number;
    };
    blur: number;
    spread: number;
    opacity: number;
    color: string;
};
export type Font = {
    fontSize: string;
    lineHeight: string;
    fontWeight: number;
    fontFamily: string;
};
export type ApiFont = Omit<Font, "fontWeight"> & {
    weight: Font["fontWeight"];
};
export type Fonts = {
    [fontName: string]: Font;
};
export type FontsByViewport = {
    [viewport in Viewport]: Fonts;
};
export type FontFace = {
    fileName: string;
    fontName: string;
    weight: number;
};
export type UnitsByViewport = {
    [viewport in Viewport]: Record<string, Variable>;
};
export type Viewport = "small" | "medium" | "large";
export type Viewports = {
    [viewport in Viewport]: string;
};
export type TransformOptions = {
    email?: boolean;
};
