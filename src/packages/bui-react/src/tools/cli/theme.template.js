module.exports = (theme) =>
  `
/*
** Generated from tools/cli/theme.template.js
*/
import lightTheme from "@bookingcom/bui-themes/${theme.id}/light";
import darkTheme from "@bookingcom/bui-themes/${theme.id}/dark";
import "@bookingcom/bui-themes/${theme.id}/variables.css";

const theme = {
  lightDefinition: lightTheme,
  darkDefinition: darkTheme,
  lightAttributes: { "data-bui-theme": "${theme.id}-light" },
  darkAttributes: { "data-bui-theme": "${theme.id}-dark" },
};

export default theme;
`.trimStart();
