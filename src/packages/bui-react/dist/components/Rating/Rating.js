import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import StarIcon from "@bookingcom/bui-assets-react/streamline/StarIcon";
import StarHalfIcon from "@bookingcom/bui-assets-react/streamline/StarHalfIcon";
import StarOutlineIcon from "@bookingcom/bui-assets-react/streamline/StarOutlineIcon";
import CircleIcon from "@bookingcom/bui-assets-react/streamline/CircleIcon";
import CircleHalfIcon from "@bookingcom/bui-assets-react/streamline/CircleHalfIcon";
import DiamondFillIcon from "@bookingcom/bui-assets-react/streamline/DiamondFillIcon";
import DiamondHalfIcon from "@bookingcom/bui-assets-react/streamline/DiamondHalfIcon";
import SquareRatingIcon from "@bookingcom/bui-assets-react/fallback/SquareRatingIcon";
import Icon, {} from "../Icon/index.js";
import styles from "@bookingcom/bui-core/css/Rating.module.css";
const sizeMap = {
    smaller: "smallest",
    small: "smaller",
    medium: "small",
    large: "medium",
    larger: "large",
};
const Rating = (props) => {
    const { className, attributes, ariaLabel, tagName, variant = "stars", showEmpty, value, size = "medium", mixin, } = props;
    const rootClassName = classNames(styles.root, className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const TagName = tagName || "div";
    const iconSize = sizeMap[size];
    const icons = [];
    const checkIfHalf = (index) => index + 1 - value === 0.5;
    const checkIsEmpty = (index) => showEmpty && index + 1 - value >= 1;
    const getSVG = (index) => {
        const isHalf = checkIfHalf(index);
        const isEmpty = checkIsEmpty(index);
        if (isHalf && variant === "stars")
            return StarHalfIcon;
        if (isEmpty && variant === "stars")
            return StarOutlineIcon;
        if (isHalf && variant === "circles")
            return CircleHalfIcon;
        if (isHalf && variant === "diamonds")
            return DiamondHalfIcon;
        if (variant === "circles")
            return CircleIcon;
        if (variant === "diamonds")
            return DiamondFillIcon;
        if (variant === "squares")
            return SquareRatingIcon;
        return StarIcon;
    };
    const numOfStartToRender = showEmpty && value < 5 ? 5 : Math.ceil(value);
    for (let i = 0; i < numOfStartToRender; i += 1) {
        const svg = getSVG(i);
        const isEmpty = checkIsEmpty(i);
        icons.push(React.createElement(Icon, { className: classNames(styles.item, isEmpty && styles["item--empty"]), key: i, svg: svg, size: iconSize, attributes: { "aria-hidden": "true" } }));
    }
    return (React.createElement(TagName, { ...rootAttributes, className: rootClassName, role: "img", "aria-label": ariaLabel || attributes?.["aria-label"] }, icons));
};
export default Rating;
