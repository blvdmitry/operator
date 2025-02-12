"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const mixinTemplate = ([mixinName, mixinValue]) => {
    const code = Object.keys(mixinValue)
        .map((property) => `  ${(0, helpers_1.camelToKebab)(property)}: var(${(0, helpers_1.getFontVariableName)(mixinName, property)});`)
        .join("\n");
    return `--${mixinName} {
${code}
}`;
};
const mqTemplate = (viewports) => {
    const entries = Object.entries(viewports);
    const code = entries
        .map(([viewport, value]) => `@custom-media ${(0, helpers_1.getMediaQueryName)(viewport)} (${value});`)
        .join("\n");
    return `/* media size definitions */
${code}`;
};
const fontsTemplate = (fonts) => {
    const code = Object.entries(fonts.large).map(mixinTemplate).join("\n\n");
    return `/* fonts definitions */
:root {
${code}
}`;
};
const mixinsTemplate = (theme) => {
    const mqCode = mqTemplate(theme.viewports);
    const fontsCode = fontsTemplate(theme.fonts);
    return [mqCode, fontsCode].join("\n\n");
};
exports.default = mixinsTemplate;
