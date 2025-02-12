"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bui_assets_core_1 = require("@bookingcom/bui-assets-core");
const helpers_1 = require("./helpers");
const primitiveVariablesTemplate = (theme, mode) => {
    const { meta, colors, shadows, animations } = theme;
    const units = theme.units.small;
    const darkModeColors = {};
    const lightModeColors = {};
    const commonColors = {};
    const shouldGenerateLight = !mode || mode === "light";
    const shouldGenerateDark = !mode || mode === "dark";
    Object.entries(colors).forEach(([colorName, colorValue]) => {
        if (colorValue.light === colorValue.dark) {
            commonColors[colorName] = colorValue.light;
        }
        else {
            if (shouldGenerateLight) {
                lightModeColors[colorName] = colorValue.light;
            }
            if (shouldGenerateDark) {
                darkModeColors[colorName] = colorValue.dark;
            }
        }
    });
    const commonCode = Object.entries({
        ...commonColors,
        ...shadows,
        ...units,
        ...{
            [helpers_1.additionalProperties.remPixel.property]: helpers_1.additionalProperties.remPixel.value,
            [helpers_1.additionalProperties.remSpacing1X.property]: helpers_1.additionalProperties.remSpacing1X.value(units),
        },
    })
        .map((entries) => (0, helpers_1.makeCSSVariableString)(entries))
        .join("\n  ");
    const animationsCode = Object.entries({ ...animations })
        .map(helpers_1.makeCSSAnimationString)
        .join("\n  ");
    return `
${shouldGenerateLight
        ? (0, helpers_1.generateCSSVariablesByMode)({
            themeId: meta.id,
            mode: "light",
            colors: lightModeColors,
        })
        : ""}

${shouldGenerateDark
        ? (0, helpers_1.generateCSSVariablesByMode)({
            themeId: meta.id,
            mode: "dark",
            colors: darkModeColors,
        })
        : ""}

${(0, helpers_1.getScopeSelector)(meta.id, "light")},
${(0, helpers_1.getScopeSelector)(meta.id, "dark")} {
  ${commonCode}
  ${animationsCode}
}
`.trim();
};
const fontsTemplate = (theme) => {
    const entries = Object.entries(theme.fonts);
    return entries
        .map(([viewport, fonts]) => {
        const code = Object.entries(fonts)
            .map(([fontName, font]) => {
            return Object.entries(font)
                .map(([property, value]) => {
                return `${(0, helpers_1.getFontVariableName)(fontName, property)}: ${value};`;
            })
                .join("\n");
        })
            .join("\n");
        const mq = (0, helpers_1.getMediaQueryValueByViewport)(viewport);
        const styles = `
${(0, helpers_1.getScopeSelector)(theme.meta.id, "light")},
${(0, helpers_1.getScopeSelector)(theme.meta.id, "dark")} {
${code}
}`;
        if (viewport === "small")
            return styles;
        return `@media (${mq}) {
${styles}
}`;
    })
        .join("\n\n");
};
const fontFaceTemplate = (fontFaces) => {
    return fontFaces
        .map((fontFace) => `@font-face {
  font-family: "${fontFace.fontName}";
  src: url("${(0, bui_assets_core_1.getFontAssetUrl)({
        setName: "fonts-brand",
        assetName: fontFace.fileName,
    })}") format("woff");
  font-weight: ${fontFace.weight};
}`)
        .join("\n\n");
};
const variablesTemplate = (theme, fontFaces, mode) => {
    return [
        primitiveVariablesTemplate(theme, mode),
        fontsTemplate(theme),
        fontFaceTemplate(fontFaces),
    ].join("\n");
};
exports.default = variablesTemplate;
