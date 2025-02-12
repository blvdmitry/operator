"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const transformColors = (theme) => {
    const colors = (0, helpers_1.flattenTokenGroups)(theme.colors.functional);
    return Object.entries(colors).reduce((acc, [colorName, colorValues]) => {
        let result = {
            ...acc,
            [colorName]: {
                light: (0, helpers_1.colorTokenToCSS)(colorValues.light),
                dark: (0, helpers_1.colorTokenToCSS)(colorValues.dark),
            },
        };
        /**
         * Only generate rgb for background colors to not have unnecessary variables in the bundle
         * - Border colors with opacity would show background of the element under it
         * - Foreground colors can use opacity directly instead of rgba
         * - _on_background colors are used as foreground
         * - _dynamic backgrounds opacity can be unpredictable in dark mode
         */
        //
        if ((colorName.includes("_background") ||
            colorName === "bui_color_white" ||
            colorName === "bui_color_black") &&
            !colorName.includes("_on") &&
            !colorName.includes("_dynamic") &&
            colorValues.light.alpha === 1 &&
            colorValues.dark.alpha === 1) {
            result = {
                ...result,
                [`${colorName}_rgb`]: {
                    light: `${colorValues.light.rgb.r}, ${colorValues.light.rgb.g}, ${colorValues.light.rgb.b}`,
                    dark: `${colorValues.dark.rgb.r}, ${colorValues.dark.rgb.g}, ${colorValues.dark.rgb.b}`,
                },
            };
        }
        return result;
    }, {});
};
exports.default = transformColors;
