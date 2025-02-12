"use strict";
/**
 * Node client for using theming utilities
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAffiliatesThemeCSS = exports.default = void 0;
var themes_1 = require("./themes/themes");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(themes_1).default; } });
var affiliates_1 = require("./affiliates");
Object.defineProperty(exports, "generateAffiliatesThemeCSS", { enumerable: true, get: function () { return affiliates_1.generateAffiliatesThemeCSS; } });
