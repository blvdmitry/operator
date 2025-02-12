"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const css_1 = require("../transforms/css");
const api_1 = require("./api");
const generateCSSFiles = (apiTheme, options) => {
    const theme = (0, api_1.transformTheme)(apiTheme);
    const themeDir = path_1.default.join(options.outputDir, theme.meta.id);
    fs_1.default.mkdirSync(themeDir, { recursive: true });
    // variables.css files generation
    const variablesCSSPath = path_1.default.resolve(themeDir, "variables.css");
    const variablesCode = (0, css_1.variablesTemplate)(theme, options.fontFaces);
    fs_1.default.writeFileSync(variablesCSSPath, variablesCode, "utf-8");
    // mixins.css file generation
    const mixinsCSSPath = path_1.default.resolve(themeDir, "mixins.css");
    const mixinsCSS = (0, css_1.mixinsTemplate)(theme);
    fs_1.default.writeFileSync(mixinsCSSPath, mixinsCSS, "utf-8");
};
exports.default = generateCSSFiles;
