"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variablesTemplate = (theme, mode) => {
    const { meta, colors, units, fonts, shadows, viewports } = theme;
    const colorModeColors = Object.keys(colors).reduce((acc, key) => ({ ...acc, [key]: colors[key][mode] }), {});
    return `${JSON.stringify({
        ...meta,
        mode,
        colors: colorModeColors,
        units: units.small,
        fonts,
        shadows,
        viewports,
    }, null, 2).replace(/(?<!--)bui_/g, "")}`;
};
exports.default = variablesTemplate;
