"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const fonts_1 = require("./fonts");
const utils_1 = require("./utils");
const css_1 = require("../transforms/css");
const affiliateFallback_1 = __importDefault(require("../themes/traveller/affiliateFallback"));
const generateAffiliatesThemeCSS = (themeId, options) => {
    const { units, fonts, colors } = options;
    const resolvedTheme = affiliateFallback_1.default;
    // Colors
    const passedColors = (0, utils_1.addPrefixToKeys)({
        ...colors,
        ...(0, colors_1.generateMissingColors)(colors),
    }, "bui_");
    Object.entries(passedColors).forEach(([key, value]) => {
        resolvedTheme.colors[key].light =
            value;
    });
    // Units
    const passedUnits = units ? (0, utils_1.addPrefixToKeys)(units, "bui_") : {};
    Object.entries(passedUnits).forEach(([key, value]) => {
        resolvedTheme.units.small[key] =
            value;
        resolvedTheme.units.medium[key] =
            value;
        resolvedTheme.units.large[key] =
            value;
    });
    // Fonts
    const passedFonts = fonts
        ? (0, utils_1.addPrefixToKeys)((0, fonts_1.generateFonts)(fonts), "bui_")
        : {};
    Object.entries(passedFonts).forEach(([key, value]) => {
        if (resolvedTheme.fonts.small[key]) {
            resolvedTheme.fonts.small[key].fontFamily = value;
        }
        if (resolvedTheme.fonts.medium[key]) {
            resolvedTheme.fonts.medium[key].fontFamily = value;
        }
        if (resolvedTheme.fonts.large[key]) {
            resolvedTheme.fonts.large[key].fontFamily = value;
        }
    });
    const themeIdPrefix = "affiliate-";
    if (!themeId.startsWith(themeIdPrefix)) {
        throw new Error(`themeId has to start with ${themeIdPrefix}`);
    }
    return (0, css_1.variablesTemplate)({ ...resolvedTheme, meta: { id: themeId, name: themeId, version: "" } }, [], "light");
};
exports.default = generateAffiliatesThemeCSS;
