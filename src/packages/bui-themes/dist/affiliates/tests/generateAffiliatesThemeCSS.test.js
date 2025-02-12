"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const generateAffiliatesThemeCSS_1 = __importDefault(require("../generateAffiliatesThemeCSS"));
(0, vitest_1.describe)("generateAffiliatesThemeCSS", () => {
    (0, vitest_1.it)("should generate CSS output with the given options", () => {
        const output = (0, generateAffiliatesThemeCSS_1.default)("affiliate-x", {
            colors: {
                color_accent_background: "#ffb700",
                color_on_accent_background: "#242424",
                color_accent_background_alt: "#e6a800",
                color_constructive_background: "#008234",
                color_cta_background: "#0071C2",
                color_brand_primary_background: "#003580",
            },
            units: { border_radius_100: "4px" },
            fonts: {
                font_family_heading: "Roboto, Open Sans, Segoe UI, tahoma, sans-serif",
                font_family_body: "Roboto, Segoe UI, tahoma, sans-serif",
            },
        });
        (0, vitest_1.expect)(output).toMatchSnapshot();
    });
    (0, vitest_1.it)("should throw an error when the themId doesn't start with 'affiliate-x'", () => {
        (0, vitest_1.expect)(() => (0, generateAffiliatesThemeCSS_1.default)("foo", {})).toThrowError();
    });
});
