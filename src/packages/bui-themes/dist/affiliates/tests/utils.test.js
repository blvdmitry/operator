"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const utils_1 = require("../utils");
(0, vitest_1.describe)("utils", () => {
    (0, vitest_1.it)("tints color", () => {
        const output = (0, utils_1.tint)("#868686", 87);
        (0, vitest_1.expect)(output).toBe("#efefef");
    });
    (0, vitest_1.it)("shades color", () => {
        const output = (0, utils_1.shade)("#FFB700", 50);
        (0, vitest_1.expect)(output).toBe("#805c00");
    });
    (0, vitest_1.it)("adds prefix to keys", () => {
        const input = {
            color: "#FFB700",
            radius: "4px",
        };
        const prefixed = (0, utils_1.addPrefixToKeys)(input, "prefix_");
        (0, vitest_1.expect)(prefixed).toEqual({
            prefix_color: "#FFB700",
            prefix_radius: "4px",
        });
    });
});
