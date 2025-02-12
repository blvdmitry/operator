import type { AcceptedPlugin } from "postcss";
import importPlugin, { AtImportOptions } from "postcss-import";
import variablesPlugin from "postcss-css-variables";
import customMediaPlugin from "@bookingcom/postcss-custom-media";

const applyPlugin = require("./postcss.apply");
const autoImportPlugin = require("./postcss.autoimport");

type Theme = { id: string; mode?: string };
type Options = {
  pluginOptions?: {
    import?: AtImportOptions;
    autoImport?: { excludeMixins?: boolean };
  };
  transformVariables?: boolean;
};

const getFallbackVariablesPath = (theme: Theme) => {
  if (!theme.id) throw new Error("Theme id is missing in postcss config");
  const variablesPath = `@bookingcom/bui-themes/${theme.id}/variables.css`;

  if (!require.resolve(variablesPath)) {
    throw new Error(`BUI PostCSS: Theme path ${variablesPath} doesn't exist`);
  }

  return variablesPath;
};

const getPlugins = ({
  theme,
  options = {
    transformVariables: true,
  },
}: {
  theme?: Theme;
  options?: Options;
}) => {
  const { pluginOptions, transformVariables } = options || {};

  const fallback = theme && getFallbackVariablesPath(theme);
  const autoImportOptions = {
    fallback,
    importOptions: pluginOptions?.import,
    excludeMixins: pluginOptions?.autoImport?.excludeMixins,
  };
  const plugins: AcceptedPlugin[] = [
    autoImportPlugin(autoImportOptions),
    importPlugin(pluginOptions?.import || {}),
    applyPlugin(),
  ];

  if (theme && transformVariables) plugins.push(variablesPlugin());
  plugins.push(customMediaPlugin());

  return { plugins };
};

const fallback = (
  theme: Theme = { id: "legacy", mode: "light" },
  options?: Options
) => {
  return getPlugins({ options, theme });
};

const modern = (options?: Options) => {
  return getPlugins({ options });
};

export default { modern, fallback };
