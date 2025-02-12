import type { Theme, TypographyKey } from "../types/theme";
export type AffiliatesThemeOptions = {
    colors?: Partial<Theme["colors"]>;
    units?: Partial<Pick<Theme["units"], "border_radius_100" | "border_radius_200" | "border_radius_300">>;
    fonts?: Partial<Record<TypographyKey, string>>;
};
