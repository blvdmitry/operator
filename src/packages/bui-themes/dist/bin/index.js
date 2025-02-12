#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cli_1 = __importDefault(require("../cli"));
const themes = ["traveller", "traveller_ex", "rentalcars", "legacy"];
const themesDir = "src/themes";
themes.forEach(async (theme) => {
    await (0, cli_1.default)({
        theme,
        output: themesDir,
        fallback: theme === "traveller",
    });
});
fs_1.default.writeFileSync(`${themesDir}/themes.ts`, `export default [${themes.map((t) => `"${t}"`).join(", ")}];\n`, "utf-8");
