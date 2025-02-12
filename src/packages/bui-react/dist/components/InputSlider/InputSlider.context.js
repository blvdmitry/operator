import React from "react";
import useId from "../../hooks/useId.js";
const Context = React.createContext({});
export const Provider = ({ props, children }) => {
    const id = useId();
    // Currently dragged control id
    const [dragId, setDragId] = React.useState(null);
    // Position delta for the merged tooltip based on the position of handles
    const [mergedTooltipDelta, setMergedTooltipDelta] = React.useState(0);
    let valueVisibility;
    // New props have valueVisibility
    if ("valueVisibility" in props) {
        valueVisibility = props.valueVisibility ? props.valueVisibility : "caption";
    }
    else {
        valueVisibility = props.renderValue === false ? "tooltip" : "caption";
    }
    return (React.createElement(Context.Provider, { value: {
            props,
            id,
            dragId,
            setDragId,
            // Merged tooltip is applicable only when both tooltips are visible
            // which happens only with renderValue === false
            mergedTooltipDelta: valueVisibility === "caption" ? 0 : mergedTooltipDelta,
            setMergedTooltipDelta,
            valueVisibility,
        } }, children));
};
export const useInputSlider = () => {
    const { props, id, dragId, setDragId, mergedTooltipDelta, setMergedTooltipDelta, valueVisibility, } = React.useContext(Context);
    const { min, max, range, interval } = props;
    const minId = `${id}-min`;
    const maxId = `${id}-max`;
    /*
     * Normalize the values based on the min/max and use only minValue/maxValue internally to avoid code duplication
     */
    const normalizeValue = (value) => {
        return Math.max(min, Math.min(max, value));
    };
    const minValue = normalizeValue((range ? props.minValue : props.value) ?? min);
    const maxValue = normalizeValue((range ? props.maxValue : props.value) ?? max);
    /*
     * Transform value to a percentage
     */
    const getPercentValue = React.useCallback((value) => {
        return (value - min) / (max - min);
    }, [min, max]);
    /*
     * Get control value boundaries based on the other control value
     */
    const getBoundaries = React.useCallback((id) => {
        const isMinControl = id === minId;
        if (isMinControl && range)
            return { min, max: maxValue - interval };
        if (range)
            return { min: minValue + interval, max };
        return { min, max };
    }, [range, min, max, minId, maxValue, minValue, interval]);
    return {
        props,
        valueVisibility,
        minValue,
        maxValue,
        minId,
        maxId,
        dragId,
        setDragId,
        mergedTooltipDelta,
        setMergedTooltipDelta,
        getPercentValue,
        getBoundaries,
    };
};
