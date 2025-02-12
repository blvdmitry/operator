"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPrefixToKeys = exports.shade = exports.tint = void 0;
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const tint = (color, weight = 50) => {
    return tinycolor2_1.default.mix(color, "#ffffff", weight).toHexString();
};
exports.tint = tint;
const shade = (color, weight = 50) => {
    return tinycolor2_1.default.mix(color, "#000000", weight).toHexString();
};
exports.shade = shade;
function addPrefixToKeys(obj, prefix) {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
        newObj[prefix + key] = obj[key];
    });
    return newObj;
}
exports.addPrefixToKeys = addPrefixToKeys;
