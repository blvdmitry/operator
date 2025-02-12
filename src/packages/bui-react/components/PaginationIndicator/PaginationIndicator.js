import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import usePrevious from "../../hooks/usePrevious.js";
import { Direction } from "./PaginationIndicator.types.js";
import styles from "@bookingcom/bui-core/css/PaginationIndicator.module.css";
const MAX_AMOUNT = 7;
const THRESHOLD = (MAX_AMOUNT - 1) / 2;
const PaginationIndicator = (props) => {
    const { total, activeIndex = 0, variant = "primary", className, attributes, mixin, } = props;
    const isStatic = React.useCallback(() => total <= MAX_AMOUNT, [total]);
    const getStartIndex = React.useCallback(() => {
        if (isStatic())
            return 0;
        if (activeIndex <= THRESHOLD)
            return 0;
        // 7 out of 15 left - start index is 8
        if (activeIndex >= total - 1 - THRESHOLD)
            return total - MAX_AMOUNT;
        return activeIndex - THRESHOLD;
    }, [activeIndex, isStatic, total]);
    const containerRef = React.useRef(null);
    const [ghostDirection, setGhostDirection] = React.useState(null);
    const [startIndex, setStartIndex] = React.useState(getStartIndex());
    const [animated, setAnimatedState] = React.useState(true);
    const animatedRef = React.useRef(true);
    const previousActiveIndex = usePrevious(activeIndex);
    const rootClassName = classNames(styles.root, className, variant && styles[`root--variant-${variant}`], ghostDirection && styles[`root--ghost-${ghostDirection}`], !animated && styles["root--not-animated"], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const setAnimated = (animated) => {
        setAnimatedState(animated);
        animatedRef.current = animated;
    };
    const handleTransitionEnd = (event) => {
        if (event.target !== containerRef.current || event.pseudoElement)
            return;
        setAnimated(false);
    };
    React.useEffect(() => {
        if (animated)
            return;
        setGhostDirection(null);
    }, [animated]);
    React.useEffect(() => {
        if (ghostDirection)
            return;
        nextFrame(() => {
            setAnimated(true);
        });
    }, [ghostDirection]);
    React.useEffect(() => {
        const direction = previousActiveIndex && activeIndex < previousActiveIndex
            ? Direction.start
            : Direction.end;
        const lastIndex = total - 1;
        const endThreshold = lastIndex - THRESHOLD;
        // Shouldn't slide dots when getting to centered position from edge
        const isAtStartEdge = activeIndex < THRESHOLD ||
            (direction === Direction.end && activeIndex === THRESHOLD);
        const isAtEndEdge = activeIndex > endThreshold ||
            (direction === Direction.start && activeIndex === endThreshold);
        const isAtEdge = isAtStartEdge || isAtEndEdge;
        // Start static index change
        if (isStatic() || isAtEdge || !animatedRef.current) {
            setStartIndex(getStartIndex());
            return;
        }
        if (previousActiveIndex === activeIndex)
            return;
        // Start sliding animation
        setGhostDirection(direction);
        setStartIndex(getStartIndex());
    }, [activeIndex, getStartIndex, isStatic, previousActiveIndex, total]);
    const renderItems = () => {
        let selectionDelta = 0;
        if (ghostDirection === "start")
            selectionDelta = -1;
        if (ghostDirection === "end")
            selectionDelta = 1;
        const itemAmount = Math.min(MAX_AMOUNT, total);
        const items = [];
        const isSliderStatic = isStatic();
        const lastIndex = total - 1;
        const activeVisibleIndex = activeIndex - startIndex + selectionDelta;
        const rightExtra = Math.max(THRESHOLD - activeIndex, 0);
        const leftExtra = Math.max(THRESHOLD - (lastIndex - activeIndex), 0);
        const rightModifierIndex = activeVisibleIndex + rightExtra + 1; // we keep one item of the default size
        const leftModifierIndex = activeVisibleIndex - leftExtra - 1;
        for (let i = 0; i < itemAmount; i += 1) {
            const isActive = i === activeVisibleIndex;
            const isSmall = i === rightModifierIndex + 1 || i === leftModifierIndex - 1;
            const isSmaller = i === rightModifierIndex + 2 || i === leftModifierIndex - 2;
            const isHidden = i > rightModifierIndex + 2 || i < leftModifierIndex - 2;
            const itemClassName = classNames(styles.item, isActive && styles["item--active"], !isSliderStatic && isSmall && styles["item--size-small"], !isSliderStatic && isSmaller && styles["item--size-smaller"], !isSliderStatic && isHidden && styles["item--hidden"]);
            items.push(React.createElement("div", { className: itemClassName, key: i }));
        }
        return items;
    };
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        React.createElement("div", { className: styles.container, onTransitionEnd: handleTransitionEnd, ref: containerRef, role: "progressbar", "aria-valuenow": activeIndex, "aria-valuemin": 0, "aria-valuemax": total - 1 }, renderItems())));
};
export default PaginationIndicator;
