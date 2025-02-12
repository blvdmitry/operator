import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { isRTL } from "@bookingcom/bui-core/utilities/helpers";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import { useInputSlider } from "./InputSlider.context.js";
import styles from "@bookingcom/bui-core/css/InputSlider.module.css";
const InputSliderTooltip = (props) => {
    const { tooltipRef, id, mergedTooltipRef, rootRef } = props;
    const [deltaX, setDeltaX] = React.useState(0);
    const [mergedDeltaX, setMergedDeltaX] = React.useState(0);
    const { props: inputSliderProps, minId, mergedTooltipDelta, minValue, maxValue, } = useInputSlider();
    const { renderTooltipValue } = inputSliderProps;
    const controlValue = id === minId ? minValue : maxValue;
    // Merged tooltip uses min handle as its origin and gets its position adjusted from there
    const hasMergedTooltip = !!(mergedTooltipDelta && id === minId);
    const tooltipWrapperRef = React.useRef(null);
    const tooltipClassName = classNames(styles["handle-tooltip"], !!mergedTooltipDelta && styles["handle-tooltip--hidden-content"]);
    const OFFSET = 14;
    /**
     * Update tooltip delta based on the input slider boundaries
     * Used for both, handle tooltips and merged tooltip
     */
    const updateDelta = React.useCallback((ref, setter, passedDelta = 0) => {
        if (!ref.current || !rootRef.current)
            return;
        const rootRect = rootRef.current.getBoundingClientRect();
        const rootBoundaries = { left: rootRect.left, right: rootRect.right };
        const rect = ref.current.getBoundingClientRect();
        const leftPosition = rect.left + OFFSET;
        const rightPosition = rect.right - OFFSET;
        if (leftPosition <= rootBoundaries.left) {
            setter(rootBoundaries.left - leftPosition);
            return;
        }
        if (rightPosition >= rootBoundaries.right - passedDelta) {
            setter(rootBoundaries.right - rightPosition);
            return;
        }
        setter(passedDelta);
    }, []);
    const renderContent = (value) => {
        if (renderTooltipValue)
            return renderTooltipValue(value);
        return value;
    };
    // Runs on first render when rootRef is ready,
    // so correct initial postition on the tooltip is set
    React.useEffect(() => {
        updateDelta(tooltipWrapperRef, setDeltaX);
    }, [rootRef, updateDelta]);
    useIsomorphicLayoutEffect(() => {
        updateDelta(tooltipWrapperRef, setDeltaX);
        if (!hasMergedTooltip)
            return;
        updateDelta(mergedTooltipRef, setMergedDeltaX, mergedTooltipDelta);
    }, [
        controlValue,
        updateDelta,
        tooltipWrapperRef.current,
        mergedTooltipRef.current,
        mergedTooltipDelta,
        hasMergedTooltip,
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { className: tooltipClassName, ref: tooltipWrapperRef },
            React.createElement("span", { ref: tooltipRef, className: styles["handle-tooltip-content"], style: { transform: `translateX(${deltaX}px)` } }, renderContent(controlValue))),
        hasMergedTooltip && (React.createElement("span", { className: styles["handle-tooltip"], ref: mergedTooltipRef },
            React.createElement("span", { className: styles["handle-tooltip-content"], style: { transform: `translateX(${mergedDeltaX}px)` } },
                renderContent(minValue),
                " - ",
                renderContent(maxValue))))));
};
const InputSliderControl = (props, ref) => {
    const { id, ariaLabel, onChange, onDragStart } = props;
    const { props: inputSliderProps, valueVisibility, getBoundaries, getPercentValue, minId, minValue, maxValue, dragId, } = useInputSlider();
    const { disabled, interval, ariaValuetext } = inputSliderProps;
    const rtl = isRTL();
    const handleClassName = classNames(styles.handle, (valueVisibility === "tooltip" || dragId === id) &&
        styles["handle--visible"], dragId === id && styles["handle--active"]);
    const controlValue = id === minId ? minValue : maxValue;
    const percentValue = getPercentValue(controlValue);
    const direction = rtl ? "right" : "left";
    const boundaries = getBoundaries(id);
    const ariaValuetextRender = props.range
        ? (ariaValuetext && ariaValuetext(minValue, maxValue)) ||
            `${minValue} - ${maxValue}`
        : ariaValuetext && ariaValuetext(minValue, undefined);
    const ariaValue = ariaValuetextRender;
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: "range", className: styles.input, value: controlValue, min: boundaries.min, max: boundaries.max, step: interval, "aria-valuetext": ariaValue, disabled: disabled, "aria-label": ariaLabel, onChange: onChange }),
        React.createElement("div", { className: handleClassName, ref: ref, style: { [direction]: `${percentValue * 100}%` }, onMouseDown: () => onDragStart(id), onTouchStart: () => onDragStart(id), role: "none" }, valueVisibility !== "hidden" && React.createElement(InputSliderTooltip, { ...props }))));
};
export default React.forwardRef(InputSliderControl);
