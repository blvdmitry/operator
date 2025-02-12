import type * as CSS from "csstype";
import { FontsByViewport, Variables, VariablesByColorMode, Animations, UnitsByViewport, Viewports } from "./global";
export type Mode = "light" | "dark";
type MediaKey = "small" | "medium" | "large";
type ShadowKey = "shadow_100" | "shadow_200";
type UnitKey = "spacing_half" | "spacing_1x" | "spacing_2x" | "spacing_3x" | "spacing_4x" | "spacing_6x" | "spacing_8x" | "spacing_12x" | "spacing_16x" | "spacing_24x" | "border_radius_100" | "border_radius_200" | "border_radius_300" | "border_width_100" | "border_width_200";
type FontKey = "font_display_1" | "font_display_2" | "font_display_3" | "font_featured_1" | "font_featured_2" | "font_featured_3" | "font_headline_1" | "font_headline_2" | "font_headline_3" | "font_strong_1" | "font_strong_2" | "font_emphasized_1" | "font_emphasized_2" | "font_body_1" | "font_body_2" | "font_small_1" | "font_small_2";
type ColorKey = "color_foreground" | "color_foreground_alt" | "color_foreground_disabled" | "color_foreground_disabled_alt" | "color_foreground_inverted" | "color_action_foreground" | "color_action_foreground_inverted" | "color_accent_foreground" | "color_callout_foreground" | "color_constructive_foreground" | "color_destructive_foreground" | "color_brand_primary_foreground" | "color_background_elevation_one" | "color_background_elevation_two" | "color_background_base" | "color_background_base_alt" | "color_background" | "color_background_alt" | "color_background_disabled" | "color_background_disabled_alt" | "color_background_inverted" | "color_black_with_alpha" | "color_action_background" | "color_action_background_alt" | "color_accent_background" | "color_accent_background_alt" | "color_callout_background" | "color_callout_background_alt" | "color_constructive_background" | "color_constructive_background_alt" | "color_destructive_background" | "color_destructive_background_alt" | "color_brand_primary_background" | "color_brand_secondary_background" | "color_accent_background_dynamic" | "color_callout_background_dynamic" | "color_constructive_background_dynamic" | "color_destructive_background_dynamic" | "color_brand_primary_background_dynamic" | "color_brand_secondary_background_dynamic" | "color_border" | "color_border_alt" | "color_border_disabled" | "color_accent_border" | "color_callout_border" | "color_constructive_border" | "color_destructive_border" | "color_action_border" | "color_white" | "color_black" | "color_highlighted" | "color_highlighted_alt" | "color_action_highlighted" | "color_action_highlighted_alt" | "color_action_focus" | "color_destructive_highlighted" | "color_destructive_highlighted_alt" | "color_destructive_focus" | "color_on_background" | "color_on_action_background" | "color_on_accent_background" | "color_on_accent_background_dynamic" | "color_on_callout_background" | "color_on_callout_background_dynamic" | "color_on_constructive_background" | "color_on_constructive_background_dynamic" | "color_on_destructive_background" | "color_on_destructive_background_dynamic" | "color_on_brand_primary_background" | "color_on_brand_primary_background_dynamic" | "color_on_brand_secondary_background" | "color_on_brand_secondary_background_dynamic" | "color_on_cta_background" | "color_transparent" | "color_brand_genius_primary_background" | "color_cta_background" | "color_cta_highlighted" | "color_brand_genius_secondary_foreground";
export type TypographyKey = "font_family_heading" | "font_family_body";
type FontValue = Pick<CSS.Properties<string | number>, "fontWeight" | "lineHeight" | "fontSize">;
export type TransformedThemeResponse = {
    meta: {
        id: string;
        name: string;
        version: string;
    };
    colors: VariablesByColorMode;
    fonts: FontsByViewport;
    shadows: Variables;
    animations: Animations;
    units: UnitsByViewport;
    viewports: Viewports;
};
export type Theme = {
    id: string;
    name: string;
    version: string;
    mode: string;
    colors: Record<ColorKey, string>;
    fonts: Record<MediaKey, Record<FontKey, FontValue>>;
    units: Record<UnitKey, string>;
    shadows: Record<ShadowKey, string>;
};
export {};
