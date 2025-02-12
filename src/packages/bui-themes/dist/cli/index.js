"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const generateCSSFiles_1 = __importDefault(require("./generateCSSFiles"));
const generateJSFiles_1 = __importDefault(require("./generateJSFiles"));
const generateAffiliateFallbackFiles_1 = __importDefault(require("./generateAffiliateFallbackFiles"));
const getTheme_1 = __importDefault(require("./getTheme"));
const colors = {
    gray: (s) => `\x1b[2;37m${s}\x1b[0m`,
    yellow: (s) => `\x1b[33m${s}\x1b[0m`,
};
const cli = async (argv) => {
    const { theme: themeId, output: relativeOutputPath, fallback } = argv;
    if (!themeId) {
        return console.error("--theme argument is missing");
    }
    if (!relativeOutputPath) {
        return console.error("--output argument is missing");
    }
    const { theme, fontFaces } = await (0, getTheme_1.default)(themeId);
    const outputDir = path_1.default.resolve(process.cwd(), relativeOutputPath);
    const themeDir = path_1.default.join(outputDir, themeId);
    console.log(`Building ${theme.name} theme...`);
    console.log(colors.gray(`Output dir: ${outputDir}`));
    // Only cleaning up the folders when building the first set of themes without a fallback
    fs_extra_1.default.rmSync(themeDir, { force: true, recursive: true });
    if (!fs_extra_1.default.existsSync(outputDir))
        fs_extra_1.default.mkdirSync(outputDir);
    console.log(`${colors.gray("> Generating files:")} ${colors.yellow("css")}`);
    (0, generateCSSFiles_1.default)(theme, { outputDir, fontFaces });
    console.log(`${colors.gray("> Generating files:")} ${colors.yellow("json")}`);
    (0, generateJSFiles_1.default)(theme, { outputDir });
    console.log(`${colors.gray("> Generating files:")} ${colors.yellow("js")}`);
    ["light", "dark"].forEach((mode) => {
        const modeDir = path_1.default.resolve(themeDir, mode);
        const theme = fs_extra_1.default.readFileSync(`${modeDir}.json`, "utf-8");
        fs_extra_1.default.writeFileSync(`${modeDir}.ts`, `export default ${theme}`, "utf-8");
    });
    fs_extra_1.default.moveSync(`${themeDir}/mixins.css`, `${outputDir}/mixins.css`, {
        overwrite: true,
    });
    if (fallback) {
        console.log(`${colors.gray("> Generating files:")} ${colors.yellow("affiliates fallback")}`);
        (0, generateAffiliateFallbackFiles_1.default)(theme, { outputDir });
    }
    console.log(`Installed theme: ${theme.id}@${theme.version}\n`);
};
exports.default = cli;
