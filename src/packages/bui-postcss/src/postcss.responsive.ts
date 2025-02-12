import Tokenizer from "css-selector-tokenizer";
import { AtRule, Root, Rule, Declaration } from "postcss";

function addModifierToSelector(
  selector: string,
  modifier: string,
  viewport?: "m" | "l" | "xl"
) {
  const tokenizedSelector = Tokenizer.parse(selector);

  tokenizedSelector.nodes = tokenizedSelector.nodes.map((selectors) => {
    const firstClassSelectorNode = selectors.nodes.find(
      (node) => node.type === "class"
    );

    return {
      ...selectors,
      nodes: selectors.nodes.map((node) => {
        return {
          ...node,
          name:
            node === firstClassSelectorNode
              ? `${node.name}-${modifier}${viewport ? `--${viewport}` : ""}`
              : node.name,
        } as Tokenizer.ElementNode;
      }),
    };
  });

  return Tokenizer.stringify(tokenizedSelector);
}

function responsive() {
  return {
    postcssPlugin: "bui-responsive",
    // TODO: in the future, this plugin should be rewritten to event-based architechture
    // For now, postcss-rtlcss is blocking us from that
    Once(root: Root) {
      root.walkAtRules("bui-responsive", (atRule: AtRule) => {
        const selector = atRule.params;
        const baseRules: Rule[] = [];
        const mediumRules: Rule[] = [];
        const largeRules: Rule[] = [];
        const xLargeRules: Rule[] = [];
        const uniqueProps: Record<string, Declaration> = {};

        // Collect all used properties across modifiers
        atRule.walkAtRules("bui-modifier", (modifierAtRule) => {
          modifierAtRule.nodes.forEach((node) => {
            if (node.type !== "decl") return;

            uniqueProps[node.prop] = node;
          });
        });

        atRule.walkAtRules("bui-modifier", (modifierAtRule) => {
          const propsToReset: Declaration[] = [];
          const childProps: Set<string> = new Set();
          const modifiers = modifierAtRule.params
            .split(",")
            .map((str) => str.trim());

          // Collect overriding props
          modifierAtRule.walkDecls((decl) => {
            childProps.add(decl.prop);
          });

          // Reset used props that are not overridden yet.
          // This is based on the idea that in order for responsive properties to work correctly,
          // every single used prop in any modifier should be reset/overridden in all others.
          if (modifiers.length === 1) {
            Object.values(uniqueProps).forEach((node) => {
              if (!childProps.has(node.prop)) {
                propsToReset.push(
                  new Declaration({ ...node, value: "initial" })
                );
              }
            });
          }

          const nodes = [...propsToReset, ...modifierAtRule.nodes];

          baseRules.push(
            new Rule({
              selector: modifiers
                .map((modifier) => addModifierToSelector(selector, modifier))
                .join(","),
              nodes,
            })
          );
          mediumRules.push(
            new Rule({
              selector: modifiers
                .map((modifier) =>
                  addModifierToSelector(selector, modifier, "m")
                )
                .join(","),
              nodes,
            })
          );
          largeRules.push(
            new Rule({
              selector: modifiers
                .map((modifier) =>
                  addModifierToSelector(selector, modifier, "l")
                )
                .join(","),
              nodes,
            })
          );
          xLargeRules.push(
            new Rule({
              selector: modifiers
                .map((modifier) =>
                  addModifierToSelector(selector, modifier, "xl")
                )
                .join(","),
              nodes,
            })
          );
        });

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

responsive.postcss = true;
module.exports = responsive;
