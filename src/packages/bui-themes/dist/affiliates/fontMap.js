"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontsToGenerate = void 0;
var FontFamily;
(function (FontFamily) {
    FontFamily["Heading"] = "font_family_heading";
    FontFamily["Body"] = "font_family_body";
})(FontFamily || (FontFamily = {}));
exports.fontsToGenerate = {
    display_1: FontFamily.Heading,
    display_2: FontFamily.Heading,
    display_3: FontFamily.Heading,
    featured_1: FontFamily.Heading,
    featured_2: FontFamily.Heading,
    featured_3: FontFamily.Heading,
    headline_1: FontFamily.Heading,
    headline_2: FontFamily.Heading,
    headline_3: FontFamily.Heading,
    strong_1: FontFamily.Body,
    strong_2: FontFamily.Body,
    emphasized_1: FontFamily.Body,
    emphasized_2: FontFamily.Body,
    body_1: FontFamily.Body,
    body_2: FontFamily.Body,
    small_1: FontFamily.Body,
    small_2: FontFamily.Body,
};
