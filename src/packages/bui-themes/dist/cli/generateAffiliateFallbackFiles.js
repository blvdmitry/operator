"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const api_1 = require("./api");
const generateFiles = (apiTheme, options) => {
    const themeDir = path_1.default.join(options.outputDir, apiTheme.id);
    /** Transform an API theme response and transform it for the affiliate values fallback */
    const theme = (0, api_1.transformTheme)(apiTheme);
    const themePath = path_1.default.resolve(themeDir, "affiliateFallback.ts");
    fs_1.default.writeFileSync(themePath, `
/* Fallback theme generated for affiliate theming */    
export default ${JSON.stringify(theme, null, 2)};
`, "utf-8");
};
exports.default = generateFiles;
