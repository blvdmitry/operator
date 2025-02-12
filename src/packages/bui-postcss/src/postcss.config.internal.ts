/* eslint-disable import/no-extraneous-dependencies */
import customMediaPlugin from "@bookingcom/postcss-custom-media";
import importPlugin from "postcss-import";

const autoImportPlugin = require("./postcss.autoimport");
const applyPlugin = require("./postcss.apply");
const responsivePlugin = require("./postcss.responsive");
const responsiveVarsPlugin = require("./postcss.responsiveVars");

/**
 * We're wrapping imports of the dev dependencies in try/catch since internal postcssconfig is used in bui-env
 * We don't have any configuration there so it's always using this internal config to make sure it works
 * for both BUI React and other libraries
 */
const importDevDependency = (path: string) => {
  let importedModule;

  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    importedModule = require(path);
  } catch (_) {
    // Silently catching the error
  }

  return importedModule;
};

const autoprefixer = importDevDependency("autoprefixer");

const getPlugins = (type?: "mixins" | "media") => {
  return {
    plugins: [
      autoImportPlugin(),
      importPlugin(),
      applyPlugin(type === "mixins" ? { preserve: true } : {}),
      responsivePlugin(),
      responsiveVarsPlugin(),
      customMediaPlugin(type === "media" ? { preserve: true } : {}),
      autoprefixer && autoprefixer(),
    ],
  };
};

// Config used to pre-compile css files before publishing the library
// It keeps the minimum of not-compiled code for runtime theming: css variables, mixins and custom media
const build = getPlugins();
const mixins = getPlugins("mixins");
const media = getPlugins("media");

module.exports = { build, mixins, media };
