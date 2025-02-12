import { toCamelCase } from "../helpers";
export const getWarningText = (props, deprecations, options) => {
    if (!props || !deprecations) {
        return;
    }
    const deprecationKeys = Object.keys(deprecations);
    const messages = [];
    for (let index = 0; index < deprecationKeys.length; index++) {
        const key = String(deprecationKeys[index]);
        const value = deprecations[key];
        // In Vue, events are passed through `props` in camel case and with `on-` prefix
        // But messages should be communicated with keys people expect: @button-click not onButtonClick
        // For that purpose we do additional checks for camel-cased events with `on-` prefix
        const checkPossibleEventKey = options?.supportAutoCasing
            ? toCamelCase(`on-${key}`)
            : `on-${key}`;
        const checkKey = options?.supportAutoCasing ? toCamelCase(key) : key;
        // No deprecated prop in props
        if (!(checkKey in props) && !(checkPossibleEventKey in props)) {
            continue;
        }
        // Warn with suggested alternative prop
        if (typeof value === "string") {
            messages.push(`"${key}" prop is deprecated, use "${value}" prop instead.`);
        }
        // No alternative prop
        if (value === false) {
            messages.push(`"${key}" prop is deprecated.`);
        }
        // Deprecated value of prop
        if (typeof value === "object") {
            const valueKeys = Object.keys(value);
            valueKeys.forEach((valueKey) => {
                if (props[key] !== valueKey) {
                    return;
                }
                const alternative = value[valueKey];
                // With alternative
                if (alternative) {
                    messages.push(`"${valueKey}" value of "${key}" prop is deprecated, use "${alternative}" instead.`);
                }
                else {
                    // No alternative
                    messages.push(`"${valueKey}" value of "${key}" prop is deprecated.`);
                }
            });
        }
    }
    return messages;
};
const deprecationWarningFactory = (prefix, method, options) => (props, deprecations) => {
    // Early exit for production env
    if (typeof process !== "undefined" &&
        process.env?.NODE_ENV === "production") {
        return;
    }
    const messages = getWarningText(props, deprecations, options);
    if (messages) {
        messages.forEach((message) => {
            method(`${prefix}: ${message}`);
        });
    }
};
export default deprecationWarningFactory;
