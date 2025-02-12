"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../transforms/css/helpers");
const helpers_2 = require("../helpers");
const transformFonts = (theme, options) => {
    const fontsByViewport = (0, helpers_2.getTokensByViewport)(theme.fonts.functional);
    const resolvedFonts = Object.entries(fontsByViewport).reduce((cssifiedFontsByMediaSize, [mediaSize, fonts]) => {
        const cssifiedFonts = Object.entries(fonts).reduce((acc, entry) => {
            const [mixinName, fontProps] = entry;
            return {
                ...acc,
                [mixinName]: {
                    ...(options?.email
                        ? {
                            fontSize: `${fontProps.fontSize}px`,
                            lineHeight: `${fontProps.lineHeight}px`,
                        }
                        : {
                            fontSize: `calc(var(--${helpers_1.additionalProperties.remPixel.property}) * ${fontProps.fontSize})`,
                            lineHeight: `calc(var(--${helpers_1.additionalProperties.remPixel.property}) * ${fontProps.lineHeight})`,
                        }),
                    fontWeight: fontProps.weight,
                    fontFamily: `${fontProps.fontFamily}`,
                },
            };
        }, {});
        return {
            ...cssifiedFontsByMediaSize,
            [mediaSize]: cssifiedFonts,
        };
    }, {});
    return resolvedFonts;
};
exports.default = transformFonts;
