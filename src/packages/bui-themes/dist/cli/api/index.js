"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTheme = void 0;
const colors_1 = __importDefault(require("./tokens/colors"));
const shadows_1 = __importDefault(require("./tokens/shadows"));
const animations_1 = __importDefault(require("./tokens/animations"));
const units_1 = __importDefault(require("./tokens/units"));
const fonts_1 = __importDefault(require("./tokens/fonts"));
const transformTheme = (theme, options) => ({
    meta: {
        id: theme.id,
        name: theme.name,
        version: theme.version,
    },
    colors: (0, colors_1.default)(theme),
    fonts: (0, fonts_1.default)(theme, options),
    shadows: (0, shadows_1.default)(theme),
    animations: (0, animations_1.default)(theme),
    units: (0, units_1.default)(theme),
    viewports: theme.viewports,
});
exports.transformTheme = transformTheme;
