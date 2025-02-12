"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const constructShadowColor = (theme, shadow) => {
    const { offset: { x, y }, blur, spread, } = shadow;
    const themeColors = (0, helpers_1.flattenTokenGroups)(theme.colors.functional);
    const shadowColor = themeColors[shadow.color];
    const color = (0, helpers_1.colorTokenToCSS)({
        ...shadowColor.light,
        alpha: shadow.opacity,
    });
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};
const transformShadows = (theme) => {
    const shadows = Object.entries(theme.shadows.core).reduce((acc, [shadowName, shadowValue]) => ({
        ...acc,
        [shadowName]: constructShadowColor(theme, shadowValue),
    }), {});
    return shadows;
};
exports.default = transformShadows;
