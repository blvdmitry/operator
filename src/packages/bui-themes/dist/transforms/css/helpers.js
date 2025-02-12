"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSSVariablesByMode = exports.getScopeSelector = exports.makeCSSAnimationString = exports.makeCSSVariableString = exports.additionalProperties = exports.getFontVariableName = exports.getMediaQueryValueByViewport = exports.getMediaQueryName = exports.camelToKebab = void 0;
function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
exports.camelToKebab = camelToKebab;
const dotToSnake = (src) => {
    return src
        .replace(/([A-Z])/g, "_$1") // Add underscore before uppercase letters
        .replace(/[\s.-]+/g, "_") // Replace spaces, dots, and hyphens with underscore
        .toLowerCase() // Convert to lowercase
        .replace(/^_/, "") // Remove leading underscore if present
        .replace(/_+/g, "_"); // Replace multiple underscores with a single one
};
const viewports = {
    small: "max-width: 575px",
    medium: "min-width: 576px",
    large: "min-width: 1024px",
    xlarge: "min-width: 1280px",
};
const getMediaQueryName = (viewport) => `--bui_${viewport}_viewport`;
exports.getMediaQueryName = getMediaQueryName;
const getMediaQueryValueByViewport = (viewport) => viewports[viewport];
exports.getMediaQueryValueByViewport = getMediaQueryValueByViewport;
const getFontVariableName = (tokenName, property) => `--${tokenName}_${camelToKebab(property)}`;
exports.getFontVariableName = getFontVariableName;
exports.additionalProperties = {
    remPixel: {
        property: "bui_rem_pixel",
        // Dividing by 16px because that is a default font-size inherited from user agent CSS
        value: `${1 / 16}rem`,
    },
    remSpacing1X: {
        property: "bui_rem_spacing_1x",
        // Taking 1x spacing token and extracting number from it, e.g. 4px => 4
        value: (units) => `calc(${parseFloat(units.bui_spacing_1x)} * var(--${exports.additionalProperties.remPixel.property}))`,
    },
};
const makeCSSVariableString = ([key, value], castKeysToSnakeCase = true) => {
    return `--${castKeysToSnakeCase ? dotToSnake(key) : key}: ${value};`;
};
exports.makeCSSVariableString = makeCSSVariableString;
const makeCSSAnimationString = ([key, value]) => {
    return [
        `${(0, exports.makeCSSVariableString)([`${key}_duration`, value.duration])}`,
        `${(0, exports.makeCSSVariableString)([
            `${key}_timing_function`,
            value.timingFunction,
        ])}`,
        `${(0, exports.makeCSSVariableString)([
            key,
            `var(--${dotToSnake(`${key}_duration`)}) var(--${dotToSnake(`${key}_timing_function`)})`,
        ])}`,
    ].join("\n  ");
};
exports.makeCSSAnimationString = makeCSSAnimationString;
const getScopeSelector = (themeId, mode) => {
    return `[data-bui-theme="${themeId}-${mode}"]`;
};
exports.getScopeSelector = getScopeSelector;
const castValuesToCSSVariables = (values, castKeysToSnakeCase = true) => {
    return values
        ? Object.entries(values)
            .map((value) => (0, exports.makeCSSVariableString)(value, castKeysToSnakeCase))
            .join("\n  ")
        : "";
};
const generateCSSVariablesByMode = (args) => {
    const { themeId, mode, colors, units, fonts } = args;
    const colorVariables = castValuesToCSSVariables(colors);
    const unitVariables = castValuesToCSSVariables(units);
    const fontVariables = castValuesToCSSVariables(fonts, false);
    return `${(0, exports.getScopeSelector)(themeId, mode)} {
  ${[colorVariables, unitVariables, fontVariables].filter(Boolean).join("\n  ")}
}`;
};
exports.generateCSSVariablesByMode = generateCSSVariablesByMode;
