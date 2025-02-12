"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMissingColors = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const utils_1 = require("./utils");
const colorMap_1 = require("./colorMap");
const generateMissingColors = (colors) => {
    const colorNames = colors && Object.keys(colors);
    if (!colorNames)
        return;
    return colorNames.reduce((acc, color) => {
        if (!color.endsWith("_background") || color.includes("_on"))
            return acc;
        const colorValue = colors[color];
        const colorCoreName = color
            .replace("color_", "")
            .replace("_background", "");
        const onColorName = `color_on_${colorCoreName}_background`;
        const onDynamicColorName = `color_on_${colorCoreName}_background_dynamic`;
        /**
         * Generate missing colors based on _background color
         */
        if (colorMap_1.colorsToGenerate[colorCoreName]) {
            const colorKeys = Object.keys(colorMap_1.colorsToGenerate[colorCoreName]);
            const onColorsToGenerate = [onColorName];
            // Not all backgrounds have dynamic colors
            if (colorKeys.includes("background_dynamic")) {
                onColorsToGenerate.push(onDynamicColorName);
            }
            onColorsToGenerate.forEach((name) => {
                if (!colors[name]) {
                    acc[name] = tinycolor2_1.default
                        .mostReadable(colorValue, ["#ffffff", "#000000"])
                        .toHexString();
                }
            });
            colorKeys.forEach((colorToCheck) => {
                const colorName = `color_${colorCoreName}_${colorToCheck}`;
                // The color is not provided by the user
                if (!colors[colorName]) {
                    const missingColor = colorMap_1.colorsToGenerate[colorCoreName][colorToCheck];
                    if (missingColor.tint) {
                        acc[colorName] = (0, utils_1.tint)(colorValue, missingColor.tint);
                    }
                    else if (missingColor.shade) {
                        acc[colorName] = (0, utils_1.shade)(colorValue, missingColor.shade);
                    }
                    else if (missingColor.alpha) {
                        acc[colorName] = (0, tinycolor2_1.default)(colorValue)
                            .setAlpha(missingColor.alpha)
                            .toRgbString();
                    }
                    else {
                        acc[colorName] = colorValue;
                    }
                }
            });
        }
        return acc;
    }, {});
};
exports.generateMissingColors = generateMissingColors;
