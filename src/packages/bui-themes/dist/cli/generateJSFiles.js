"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_1 = require("../transforms/js");
const api_1 = require("./api");
const generateFiles = (apiTheme, options) => {
    const themeDir = path_1.default.join(options.outputDir, apiTheme.id);
    fs_1.default.mkdirSync(path_1.default.join(themeDir, "email"), { recursive: true });
    /** Generate JS for browsers */
    const theme = (0, api_1.transformTheme)(apiTheme);
    const lightThemeJSPath = path_1.default.resolve(themeDir, "light.json");
    const darkThemeJSPath = path_1.default.resolve(themeDir, "dark.json");
    const lightTheme = (0, js_1.variablesTemplate)(theme, "light");
    const darkTheme = (0, js_1.variablesTemplate)(theme, "dark");
    fs_1.default.writeFileSync(lightThemeJSPath, lightTheme, "utf-8");
    fs_1.default.writeFileSync(darkThemeJSPath, darkTheme, "utf-8");
    /* Generate JS for emails */
    const emailTheme = (0, api_1.transformTheme)(apiTheme, { email: true });
    const lightThemeEmailJSPath = path_1.default.resolve(themeDir, "email", "light.json");
    const darkThemeEmailJSPath = path_1.default.resolve(themeDir, "email", "dark.json");
    const lightEmailTheme = (0, js_1.variablesTemplate)(emailTheme, "light");
    const darkEmailTheme = (0, js_1.variablesTemplate)(emailTheme, "dark");
    fs_1.default.writeFileSync(lightThemeEmailJSPath, lightEmailTheme, "utf-8");
    fs_1.default.writeFileSync(darkThemeEmailJSPath, darkEmailTheme, "utf-8");
};
exports.default = generateFiles;
