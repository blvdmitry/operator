"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFonts = void 0;
const fontMap_1 = require("./fontMap");
const generateFonts = (fonts) => {
    const fontNames = fonts && Object.keys(fonts);
    if (!fontNames)
        return {};
    return fontNames.reduce((acc, font) => {
        const fontValue = fonts[font];
        Object.entries(fontMap_1.fontsToGenerate).forEach(([fontCoreName, fontTypeToCheck]) => {
            const fontFamilyName = `font_${fontCoreName}_font-family`;
            if (font === fontTypeToCheck) {
                acc[fontFamilyName] = fontValue;
            }
        });
        return acc;
    }, {});
};
exports.generateFonts = generateFonts;
