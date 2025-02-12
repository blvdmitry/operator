#!/usr/bin/env node
const path = require("path");
const yargs = require("yargs");
const fs = require("fs-extra");
const execa = require("execa");

yargs
  .scriptName("bui-theme-install")
  .options({
    theme: {
      describe: "The theme to fetch from design-api",
      demandOption: true,
      type: "array",
    },
    output: {
      describe: "The directory to install the theme in",
      demandOption: true,
      type: "string",
    },
  })
  .command(
    "$0",
    "Install themes",
    () => {},
    async (argv) => {
      const { theme: themes, output: themesDir } = argv;
      themes.forEach((themeId) => {
        const themeDir = path.join(themesDir, themeId);

        execa.commandSync(
          `theme-install --theme="${themeId}" --output="${themesDir}"`,
          { stdout: process.stdout, shell: true }
        );

        ["light", "dark"].forEach((mode) => {
          const modeDir = path.resolve(themeDir, mode);
          const theme = fs.readFileSync(`${modeDir}.json`, "utf-8");

          fs.writeFileSync(`${modeDir}.ts`, `export default ${theme}`, "utf-8");
        });

        fs.moveSync(`${themeDir}/mixins.css`, `${themesDir}/mixins.css`, {
          overwrite: true,
        });
      });

      fs.writeFileSync(
        `${themesDir}/themes.ts`,
        `export default [${themes.map((t) => `"${t}"`).join(", ")}];\n`,
        "utf-8"
      );
    }
  )
  .help().argv;
