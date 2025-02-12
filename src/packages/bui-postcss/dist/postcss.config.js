"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    modern: (options) => {
        const { pluginOptions } = options || {};
        const minifyPlugins = pluginOptions?.cssnano?.disable
            ? {}
            : {
                cssnano: {
                    preset: [
                        "default",
                        {
                            // Avoid minifying BUI variables
                            calc: false,
                            // Avoid edge cases for BUI responsive properties breaking rules ordering
                            mergeLonghand: false,
                            cssDeclarationSorter: false,
                            reduceInitial: false,
                            // Avoid edge cases for RTL
                            mergeRules: false,
                        },
                    ],
                },
            };
        return {
            plugins: {
                [require.resolve("./postcss.autoimport")]: {
                    importOptions: pluginOptions?.import,
                    excludeMixins: pluginOptions?.autoImport?.excludeMixins,
                },
                "postcss-import": pluginOptions?.import || {},
                [require.resolve("./postcss.apply")]: {},
                "@bookingcom/postcss-custom-media": {},
                "postcss-nesting": { edition: "2024-02" },
                autoprefixer: {},
                ...minifyPlugins,
            },
        };
    },
};
