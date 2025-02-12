import { AtRule, Declaration, Rule, Root } from "postcss";

const prefix = "--bui";

function responsiveVars() {
  return {
    postcssPlugin: "bui-responsive-vars",
    // TODO: in the future, this plugin should be rewritten to event-based architechture
    // For now, postcss-rtlcss is blocking us from that
    Once(root: Root) {
      // Collect all used properties across modifiers
      root.walkAtRules("bui-responsive-vars", (atRule: AtRule) => {
        const options = {
          unit: false,
          literal: false,
          important: false,
        };

        atRule.walkAtRules(
          new RegExp("(bui-literal|bui-unit|bui-important)"),
          (atRule: AtRule) => {
            if (atRule.name === "bui-literal") options.literal = true;
            if (atRule.name === "bui-unit") options.unit = true;
            if (atRule.name === "bui-important") options.important = true;
          }
        );

        const [selector, cssVar, ...cssProperties] = atRule.params
          .replace(/\s/g, "")
          .split(",");

        function createSelectorWithRule(
          cssProperty: string,
          viewport: string,
          spaced: boolean = false
        ) {
          const varName = `${prefix}_${cssVar}_${
            spaced ? "spaced_" : ""
          }${cssProperty}--${viewport}`;

          return new Rule({
            selector: `${selector}[style*="${varName}"]`,
            nodes: [
              new Declaration({
                prop: `${prefix}_${cssVar}_${cssProperty}`,
                value: spaced
                  ? `calc(var(${varName}) * var(--bui_spacing_1x))`
                  : `var(${varName})`,
              }),
            ],
          });
        }

        const baseRules: Rule[] = [];
        const mediumRules: Rule[] = [];
        const largeRules: Rule[] = [];
        const xLargeRules: Rule[] = [];

        cssProperties.forEach((cssProperty) => {
          baseRules.push(
            new Rule({
              selector,
              nodes: [
                new Declaration({
                  prop: cssProperty,
                  value: `var(${prefix}_${cssVar}_${cssProperty})`,
                  important: options.important,
                }),
              ],
            })
          );

          if (options.literal) {
            baseRules.push(createSelectorWithRule(cssProperty, "s"));
            mediumRules.push(createSelectorWithRule(cssProperty, "m"));
            largeRules.push(createSelectorWithRule(cssProperty, "l"));
            xLargeRules.push(createSelectorWithRule(cssProperty, "xl"));
          }

          if (options.unit) {
            baseRules.push(createSelectorWithRule(cssProperty, "s", true));
            mediumRules.push(createSelectorWithRule(cssProperty, "m", true));
            largeRules.push(createSelectorWithRule(cssProperty, "l", true));
            xLargeRules.push(createSelectorWithRule(cssProperty, "xl", true));
          }
        });

        if (!options.literal && !options.unit) return;

        atRule.replaceWith(
          baseRules,
          new AtRule({
            name: "media",
            params: "(--bui_medium_viewport)",
            nodes: mediumRules,
          }),
          new AtRule({
            name: "media",
            params: "(--bui_large_viewport)",
            nodes: largeRules,
          }),
          new AtRule({
            name: "media",
            params: "(--bui_xlarge_viewport)",
            nodes: xLargeRules,
          })
        );
      });
    },
  };
}

responsiveVars.postcss = true;
module.exports = responsiveVars;
