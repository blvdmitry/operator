"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorsToGenerate = void 0;
/**
 * The values are based on the shades and tints of the background colors that
 * are passed. They are created based on Traveller theme.
 * The base color is 400.
 * They are copied from TBU theme-tokens.
 * https://gitlab.booking.com/tbu/fx/theme-tokens/-/blob/master/src/tokens/colors/scale.json
 */
const coreColorScale = {
    100: { tint: 87 },
    200: { tint: 56 },
    300: { tint: 28 },
    400: 0,
    500: { shade: 50 },
    600: { shade: 75 },
};
/**
 * The properties that don't have color scales assinged use the background
 * color that is passed
 */
exports.colorsToGenerate = {
    accent: {
        foreground: coreColorScale[500],
        background_alt: coreColorScale[100],
        background_dynamic: {},
        border: coreColorScale[300],
    },
    callout: {
        foreground: coreColorScale[500],
        background_alt: coreColorScale[100],
        background_dynamic: {},
        border: coreColorScale[300],
    },
    action: {
        foreground: {},
        foreground_inverted: coreColorScale[300],
        background_alt: coreColorScale[100],
        border: {},
        highlighted: coreColorScale[500],
        highlighted_alt: { alpha: 0.06 },
        focus: { alpha: 0.24 },
    },
    destructive: {
        foreground: {},
        background_alt: coreColorScale[100],
        background_dynamic: {},
        border: {},
        highlighted: coreColorScale[500],
        highlighted_alt: { alpha: 0.06 },
        focus: { alpha: 0.24 },
    },
    constructive: {
        foreground: {},
        background_alt: coreColorScale[100],
        background_dynamic: {},
        border: {},
    },
    cta: {
        highlighted: coreColorScale[500],
    },
    brand_primary: {
        foreground: {},
        background_dynamic: {},
    },
    brand_secondary: {
        background_dynamic: {},
    },
};
