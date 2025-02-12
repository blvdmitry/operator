"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const css_selector_tokenizer_1 = __importDefault(require("css-selector-tokenizer"));
const postcss_1 = require("postcss");
function addModifierToSelector(selector, modifier, viewport) {
    const tokenizedSelector = css_selector_tokenizer_1.default.parse(selector);
    tokenizedSelector.nodes = tokenizedSelector.nodes.map((selectors) => {
        const firstClassSelectorNode = selectors.nodes.find((node) => node.type === "class");
        return {
            ...selectors,
            nodes: selectors.nodes.map((node) => {
                return {
                    ...node,
                    name: node === firstClassSelectorNode
                        ? `${node.name}-${modifier}${viewport ? `--${viewport}` : ""}`
                        : node.name,
                };
            }),
        };
    });
    return css_selector_tokenizer_1.default.stringify(tokenizedSelector);
}
function responsive() {
    return {
        postcssPlugin: "bui-responsive",
        // TODO: in the future, this plugin should be rewritten to event-based architechture
        // For now, postcss-rtlcss is blocking us from that
        Once(root) {
            root.walkAtRules("bui-responsive", (atRule) => {
                const selector = atRule.params;
                const baseRules = [];
                const mediumRules = [];
                const largeRules = [];
                const xLargeRules = [];
                const uniqueProps = {};
                // Collect all used properties across modifiers
                atRule.walkAtRules("bui-modifier", (modifierAtRule) => {
                    modifierAtRule.nodes?.forEach((node) => {
                        if (node.type !== "decl")
                            return;
                        uniqueProps[node.prop] = node;
                    });
                });
                atRule.walkAtRules("bui-modifier", (modifierAtRule) => {
                    const propsToReset = [];
                    const childProps = new Set();
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
                                propsToReset.push(new postcss_1.Declaration({ ...node, value: "initial" }));
                            }
                        });
                    }
                    const nodes = [...propsToReset, ...(modifierAtRule.nodes || [])];
                    baseRules.push(new postcss_1.Rule({
                        selector: modifiers
                            .map((modifier) => addModifierToSelector(selector, modifier))
                            .join(","),
                        nodes,
                    }));
                    mediumRules.push(new postcss_1.Rule({
                        selector: modifiers
                            .map((modifier) => addModifierToSelector(selector, modifier, "m"))
                            .join(","),
                        nodes,
                    }));
                    largeRules.push(new postcss_1.Rule({
                        selector: modifiers
                            .map((modifier) => addModifierToSelector(selector, modifier, "l"))
                            .join(","),
                        nodes,
                    }));
                    xLargeRules.push(new postcss_1.Rule({
                        selector: modifiers
                            .map((modifier) => addModifierToSelector(selector, modifier, "xl"))
                            .join(","),
                        nodes,
                    }));
                });
                atRule.replaceWith(baseRules, new postcss_1.AtRule({
                    name: "media",
                    params: "(--bui_medium_viewport)",
                    nodes: mediumRules,
                }), new postcss_1.AtRule({
                    name: "media",
                    params: "(--bui_large_viewport)",
                    nodes: largeRules,
                }), new postcss_1.AtRule({
                    name: "media",
                    params: "(--bui_xlarge_viewport)",
                    nodes: xLargeRules,
                }));
            });
        },
    };
}
responsive.postcss = true;
module.exports = responsive;
