"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSSVariablesByMode = exports.variablesTemplate = exports.mixinsTemplate = void 0;
var mixinsTemplate_1 = require("./mixinsTemplate");
Object.defineProperty(exports, "mixinsTemplate", { enumerable: true, get: function () { return __importDefault(mixinsTemplate_1).default; } });
var variablesTemplate_1 = require("./variablesTemplate");
Object.defineProperty(exports, "variablesTemplate", { enumerable: true, get: function () { return __importDefault(variablesTemplate_1).default; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "generateCSSVariablesByMode", { enumerable: true, get: function () { return helpers_1.generateCSSVariablesByMode; } });
