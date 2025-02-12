import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Stack from "../Stack/index.js";
import Text, {} from "../Text/index.js";
import HiddenVisually from "../HiddenVisually/index.js";
import styles from "@bookingcom/bui-core/css/ReviewScore.module.css";
const ReviewScore = (props) => {
    const { score, scoreAriaLabel, reviewCount, rating, ratingReviewAriaLabel, variant, size = "medium", inline, alignment, className, attributes, mixin, } = props;
    const isTextVariant = variant === "text";
    const isAlignedEnd = alignment === "end";
    const shouldSwapScoreOrder = isAlignedEnd && !(inline && variant === "text");
    const rootClassName = classNames(styles.root, className, variant && styles[`root--variant-${variant}`], size && styles[`root--size-${size}`], inline && styles[`root--inline`], isAlignedEnd && styles["root--alignment-end"], !inline && variant !== "text" && styles["root--adjusted-text-gap"]);
    const shouldRenderTitle = !!rating;
    const shouldRenderText = !!reviewCount;
    const titleStyleMap = {
        medium: "emphasized_1",
        small: "emphasized_2",
        smaller: "small_1",
    };
    const titleStyle = titleStyleMap[size];
    const subtitleStyle = size === "medium" ? "small_1" : "small_2";
    return (React.createElement(Stack, { direction: isAlignedEnd ? "row-reverse" : "row", gap: 2, alignItems: "center", attributes: attributes, className: rootClassName, mixin: mixin },
        !isTextVariant && (React.createElement(Text, { variant: titleStyle, className: styles.badge },
            scoreAriaLabel && React.createElement(HiddenVisually, null, scoreAriaLabel),
            score)),
        (shouldRenderTitle || shouldRenderText || isTextVariant) && (React.createElement(Stack.Item, { grow: true, className: styles.content },
            React.createElement(Text, { variant: titleStyle, className: styles.title, color: "neutral", tagName: inline ? "span" : "div" },
                ratingReviewAriaLabel && (React.createElement(HiddenVisually, null, ratingReviewAriaLabel)),
                !shouldSwapScoreOrder && isTextVariant && score,
                shouldRenderTitle && !shouldSwapScoreOrder && " ",
                shouldRenderTitle && rating,
                shouldRenderTitle && shouldSwapScoreOrder && " ",
                shouldSwapScoreOrder && isTextVariant && score),
            shouldRenderTitle && shouldRenderText && (React.createElement(Text, { variant: inline ? titleStyle : subtitleStyle, color: "neutral_alt", className: styles.text, tagName: inline ? "span" : "div" },
                inline && React.createElement(React.Fragment, null, "\u00A0\u00B7\u00A0"),
                reviewCount))))));
};
export default ReviewScore;
