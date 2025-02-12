"use strict";
/**
 * We're wrapping imports of the dev dependencies in try/catch since internal postcssconfig is used in bui-env
 * We don't have any configuration there so it's always using this internal config to make sure it works
 * for both BUI React and other libraries
 */
const resolveDevDependency = (path) => {
    let importedModule;
    try {
        importedModule = require.resolve(path);
    }
    catch (_) {
        // Silently catching the error
    }
    return importedModule;
};
const autoprefixer = resolveDevDependency("autoprefixer");
const getPlugins = (type) => {
    const plugins = {
        [require.resolve("./postcss.autoimport")]: {},
        "postcss-import": {},
        [require.resolve("./postcss.apply")]: type === "mixins" ? { preserve: true } : {},
        [require.resolve("./postcss.responsive")]: {},
        [require.resolve("./postcss.responsiveVars")]: {},
        "@bookingcom/postcss-custom-media": {},
        "postcss-nesting": { edition: "2024-02" },
        autoprefixer: {},
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
    if (autoprefixer)
        plugins[autoprefixer] = {};
    return { plugins };
};
// Config used to pre-compile css files before publishing the library
// It keeps the minimum of not-compiled code for runtime theming: css variables, mixins and custom media
const build = getPlugins();
const mixins = getPlugins("mixins");
const media = getPlugins("media");
module.exports = { build, mixins, media };
