"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokensByViewport = exports.colorTokenToCSS = exports.flattenTokenGroups = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const flattenTokenGroups = (tokens) => {
    return Object.values(tokens).reduce((acc, tokenGroup) => ({ ...acc, ...tokenGroup }), {});
};
exports.flattenTokenGroups = flattenTokenGroups;
const colorTokenToCSS = (colorValue) => {
    const color = (0, tinycolor2_1.default)({
        r: colorValue.rgb?.r ?? 0,
        g: colorValue.rgb?.g ?? 0,
        b: colorValue.rgb?.b ?? 0,
        a: colorValue.alpha ?? 1,
    });
    if (color.getAlpha() === 1)
        return color.toHexString();
    return color.toRgbString();
};
exports.colorTokenToCSS = colorTokenToCSS;
const getTokensByViewport = (tokens) => {
    return Object.entries(tokens).reduce((acc, [tokenName, tokenValue]) => {
        return Object.keys(tokenValue).reduce((tokensByViewport, viewport) => {
            return {
                ...tokensByViewport,
                [viewport]: {
                    ...tokensByViewport[viewport],
                    [tokenName]: tokenValue[viewport],
                },
            };
        }, acc);
    }, {});
};
exports.getTokensByViewport = getTokensByViewport;
