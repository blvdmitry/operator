"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function autoimport(opts = {}) {
    const { fallback, importOptions = {}, excludeMixins } = opts;
    const cwd = process.cwd();
    const pkgPath = `${cwd}/package.json`;
    const pkg = fs_1.default.existsSync(pkgPath) && JSON.parse(fs_1.default.readFileSync(pkgPath, "utf-8"));
    const dev = pkg.name === "@bookingcom/bui-react";
    const themesPath = "@bookingcom/bui-themes";
    const mixinsPath = `${themesPath}/index.css`;
    const commonVariablesPath = `${themesPath}/utilities/variables.css`;
    const importExisting = (root, path) => {
        if (dev) {
            root.prepend({ name: "import", params: `"${path}"` });
            return;
        }
        try {
            // Check if it exists in node_modules
            require.resolve(path);
            root.prepend({ name: "import", params: `"${path}"` });
        }
        catch (e) {
            // Ignore import
            // console.error("Error:", e);
        }
    };
    const importFromModules = (root, path, importOptions = {}) => {
        const { addModulesDirectories = [] } = importOptions;
        importExisting(root, path);
        addModulesDirectories.forEach((modulesPath) => {
            importExisting(root, `${modulesPath}/${path}`);
        });
    };
    return {
        postcssPlugin: "bui-auto-import",
        Once(root) {
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
