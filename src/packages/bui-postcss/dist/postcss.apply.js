"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_1 = require("postcss");
function apply(options) {
    const preserve = options?.preserve || false;
    const applyDefinitions = {};
    return {
        postcssPlugin: "bui-apply",
        Once(root) {
            root.walkRules(":root", (ruleRoot) => {
                // Walk rules with name "--name" syntax
                ruleRoot.walkRules((rule) => {
                    if (rule.selector.startsWith("--")) {
                        const selector = rule.selector;
                        applyDefinitions[selector] = rule.clone();
                        rule.remove();
                    }
                });
                // Walk declarations for "--name:" syntax
                ruleRoot.walkDecls(/^--/, (decl) => {
                    // We need only declaration sets
                    if (!decl.value.startsWith("{"))
                        return;
                    const rule = (0, postcss_1.parse)(`${decl.prop} ${decl.value}`)?.nodes?.[0];
                    // Work only with rules (AtRules, Comments, Decls are not supported)
                    if (!rule || rule.type !== "rule")
                        return;
                    applyDefinitions[decl.prop] = rule.clone();
                    decl.remove();
                });
                if (ruleRoot.nodes.length === 0)
                    ruleRoot.remove();
            });
            root.walkAtRules("apply", (atRule) => {
                const applyParams = atRule.params.replace(/[()]/g, "");
                // Remove apply's that are not defined
                if (applyParams in applyDefinitions === false) {
                    if (!preserve)
                        atRule.remove();
                    return false;
                }
                const indent = atRule.raws?.before?.replace(/(\n)+/g, "\n");
                // Fix indentation for nodes
                const definitionNodes = applyDefinitions[applyParams].nodes.map((node) => {
                    const clone = node.clone();
                    clone.raws.before = indent;
                    return clone;
                });
                if (preserve) {
                    atRule.prepend(definitionNodes);
                }
                else {
                    atRule.replaceWith(definitionNodes);
                }
            });
        },
    };
}
apply.postcss = true;
module.exports = apply;
