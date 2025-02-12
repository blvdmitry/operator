import React from "react";
import Stack from "../Stack/index.js";
import Avatar from "../Avatar/index.js";
import Hidden from "../Hidden/index.js";
import Text, {} from "../Text/index.js";
const titleVariantMap = {
    small: "small_1",
    medium: "strong_2",
    large: "strong_1",
};
const AvatarBlock = (props) => {
    const { title, subtitle, avatar, className, attributes, size = "medium", color, mixin, } = props;
    const renderText = (variant) => (React.createElement(Text, { variant: variant, color: color ?? "neutral" }, title));
    const renderTexts = () => {
        if (typeof size !== "object") {
            return renderText(titleVariantMap[size]);
        }
        const hiddenTextNodes = Object.keys(size).reduce((acc, value) => {
            const sizeValue = size[value];
            if (!sizeValue)
                return acc;
            acc[sizeValue] = {
                s: true,
                m: true,
                l: true,
                ...acc[sizeValue],
                [value]: false,
            };
            return acc;
        }, {});
        return (React.createElement(React.Fragment, null, Object.keys(hiddenTextNodes).map((key) => (React.createElement(Hidden, { hide: hiddenTextNodes[key], key: key }, renderText(titleVariantMap[key]))))));
    };
    return (React.createElement(Stack, { attributes: attributes, className: className, direction: "row", alignItems: "center", gap: 2, mixin: mixin },
        React.createElement(Avatar, { ...avatar, size: size }),
        React.createElement(Stack.Item, { grow: true },
            renderTexts(),
            subtitle && (React.createElement(Text, { variant: "small_1", color: color ?? "neutral_alt" }, subtitle)))));
};
export default AvatarBlock;
