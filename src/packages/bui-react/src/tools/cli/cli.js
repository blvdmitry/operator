#!/usr/bin/env node
const yargs = require("yargs");
const fs = require("fs-extra");
const path = require("path");
const template = require("./theme.template");
const { default: themes } = require("@bookingcom/bui-themes");

const argv = yargs
  .scriptName("bui-theme-install")
  .command(
    "$0",
    "Install themes",
    () => {},
    async (argv) => {
      const srcPath = path.join(__dirname, "../../../src");
      const themesDir = path.join(srcPath, "themes");
      themes.forEach((themeId) => {
        fs.writeFileSync(
          `${themesDir}/${themeId}.tsx`,
          template({ id: themeId }),
          "utf-8"
        );
        console.log(`Installed ${themeId} theme`);
      });
    }
  )
  .help().argv;
