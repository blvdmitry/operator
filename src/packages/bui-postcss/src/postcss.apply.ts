import { parse, Root, Rule, AtRule } from "postcss";

type Options = {
  preserve?: boolean;
};

function apply(options?: Options) {
  const preserve = options?.preserve || false;
  const applyDefinitions: Record<string, Rule> = {};

  return {
    postcssPlugin: "bui-apply",
    Once(root: Root) {
      root.walkRules(":root", (ruleRoot: Rule) => {
        // Walk rules with name "--name" syntax
        ruleRoot.walkRules((rule: Rule) => {
          if (rule.selector.startsWith("--")) {
            const selector = rule.selector;

            applyDefinitions[selector] = rule.clone();
            rule.remove();
          }
        });

        // Walk declarations for "--name:" syntax
        ruleRoot.walkDecls(/^--/, (decl) => {
          // We need only declaration sets
          if (!decl.value.startsWith("{")) return;

          const rule = parse(`${decl.prop} ${decl.value}`)?.nodes?.[0];

          // Work only with rules (AtRules, Comments, Decls are not supported)
          if (!rule || rule.type !== "rule") return;

          applyDefinitions[decl.prop] = rule.clone();
          decl.remove();
        });

        if (ruleRoot.nodes.length === 0) ruleRoot.remove();
      });

      root.walkAtRules("apply", (atRule: AtRule) => {
        const applyParams = atRule.params.replace(/[()]/g, "");

        // Remove apply's that are not defined
        if (applyParams in applyDefinitions === false) {
          if (!preserve) atRule.remove();

          return false;
        }

        const indent = atRule.raws?.before?.replace(/(\n)+/g, "\n");
        // Fix indentation for nodes
        const definitionNodes = applyDefinitions[applyParams].nodes.map(
          (node) => {
            const clone = node.clone();

            clone.raws.before = indent;

            return clone;
          }
        );

        if (preserve) {
          atRule.prepend(definitionNodes);
        } else {
          atRule.replaceWith(definitionNodes);
        }
      });
    },
  };
}

apply.postcss = true;
module.exports = apply;
