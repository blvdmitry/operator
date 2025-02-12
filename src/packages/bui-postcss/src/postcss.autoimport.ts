import fs from "fs";
import { Root } from "postcss";

type ImportOptions = {
  addModulesDirectories?: string[];
};

type Options = {
  fallback?: string;
  excludeMixins?: boolean;
  importOptions?: ImportOptions;
};

function autoimport(opts: Options = {}) {
  const { fallback, importOptions = {}, excludeMixins } = opts;
  const cwd = process.cwd();
  const pkgPath = `${cwd}/package.json`;
  const pkg =
    fs.existsSync(pkgPath) && JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const dev = pkg.name === "@bookingcom/bui-react";
  const themesPath = "@bookingcom/bui-themes";
  const mixinsPath = `${themesPath}/index.css`;
  const commonVariablesPath = `${themesPath}/utilities/variables.css`;

  const importExisting = (root: Root, path: string) => {
    if (dev) {
      root.prepend({ name: "import", params: `"${path}"` });
      return;
    }

    try {
      // Check if it exists in node_modules
      require.resolve(path);
      root.prepend({ name: "import", params: `"${path}"` });
    } catch (e) {
      // Ignore import
      // console.error("Error:", e);
    }
  };

  const importFromModules = (
    root: Root,
    path: string,
    importOptions: ImportOptions = {}
  ) => {
    const { addModulesDirectories = [] } = importOptions;

    importExisting(root, path);
    addModulesDirectories.forEach((modulesPath) => {
      importExisting(root, `${modulesPath}/${path}`);
    });
  };

  return {
    postcssPlugin: "bui-auto-import",
    Once(root: Root) {
      if (fallback) {
        importFromModules(root, commonVariablesPath, importOptions);
        importFromModules(root, fallback, importOptions);
      }

      // Can be helpful for projects using postcss on every fily individually
      // (postcss-loader without mini-css-extract-plugin for example)
      if (!excludeMixins) {
        importFromModules(root, mixinsPath, importOptions);
      }
    },
  };
}

autoimport.postcss = true;
module.exports = autoimport;
