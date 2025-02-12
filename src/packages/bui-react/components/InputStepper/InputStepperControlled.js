import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import MinusIcon from "@bookingcom/bui-assets-react/streamline/MinusIcon";
import PlusIcon from "@bookingcom/bui-assets-react/streamline/PlusIcon";
import Button from "../Button/index.js";
import Text from "../Text/index.js";
import useId from "../../hooks/useId.js";
import styles from "@bookingcom/bui-core/css/InputStepper.module.css";
import { BUTTON_DELAY, BUTTON_INTERVAL } from "./constants.js";
const InputStepperControlled = (props) => {
    const { id, value: passedValue, name, size = "medium", label, helper, min = 0, max = 100, step = 1, disabled, onChange, className, attributes, mixin, } = props;
    const rootClassName = classNames(styles.root, className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const value = React.useMemo(() => {
        if (passedValue === null)
            return min || 0;
        const withMin = min ? Math.max(passedValue, min) : passedValue;
        return max ? Math.min(withMin, max) : withMin;
    }, [passedValue, min, max]);
    const stepperId = useId(id);
    // When holding a +/- button pressed, events might happen faster than state updates
    // so we're saving it into a ref to keep the onChange value correct
    const valueRef = React.useRef(value);
    const timeoutRef = React.useRef(null);
    const isOperationDisabled = (op, value) => {
        return op === "-"
            ? disabled || value === null || value <= min || value - step < min
            : disabled || value === null || value >= max || value + step > max;
    };
    const changeValue = (value) => {
        if (value < min || value > max)
            return;
        onChange?.({ name, value });
    };
    const handleOperation = (op) => {
        const value = valueRef.current;
        if (value === null || isOperationDisabled(op, value))
            return;
        const nextValue = op === "-" ? value - step : value + step;
        changeValue(nextValue);
        return nextValue;
    };
    const clearOperationTimeout = React.useCallback(() => {
        if (!timeoutRef.current)
            return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }, []);
    /**
     * set up a timeout of BUTTON_DELAY ms
     * no-op during this delay period, after one click op has been triggered;
     * when the delay period ends, recursively start later timeouts to
     * consecutively trigger op every BUTTON_INTERVAL ms
     */
    const setupOperation = (op) => {
        const nextValue = handleOperation(op);
        if (nextValue === undefined)
            return;
        timeoutRef.current = setTimeout(() => setupOperation(op), timeoutRef.current ? BUTTON_INTERVAL : BUTTON_DELAY);
    };
    const handleChange = (e) => {
        changeValue(+e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "-" || e.key === "+")
            handleOperation(e.key);
    };
    React.useEffect(() => clearOperationTimeout, [clearOperationTimeout]);
    React.useEffect(() => {
        valueRef.current = value;
    }, [value]);
    /* remove title and subtitle in the following block once deprecated */
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        React.createElement("input", { type: "range", className: styles.input, id: stepperId, min: min, max: max, step: step, value: value, "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, onChange: handleChange, onKeyDown: handleKeyDown, disabled: disabled }),
        label && (React.createElement("div", { className: styles["label-wrapper"] },
            React.createElement("label", { className: styles.label, htmlFor: stepperId }, label),
            helper && (React.createElement(Text, { variant: "small_1", color: "neutral_alt", className: styles["helper-text"] }, helper)))),
        React.createElement("div", { className: styles.wrapper },
            React.createElement(Button, { icon: MinusIcon, variant: "tertiary", size: size, disabled: isOperationDisabled("-", value), className: styles.subtract, attributes: {
                    tabIndex: -1,
                    type: "button",
                    "aria-hidden": "true",
                    onMouseDown: () => setupOperation("-"),
                    onMouseUp: clearOperationTimeout,
                    onMouseLeave: clearOperationTimeout,
                } }),
            React.createElement("span", { className: styles.value, "aria-hidden": "true" }, value),
            React.createElement(Button, { icon: PlusIcon, variant: "tertiary", size: size, disabled: isOperationDisabled("+", value), className: styles.add, attributes: {
                    tabIndex: -1,
                    type: "button",
                    "aria-hidden": "true",
                    onMouseDown: () => setupOperation("+"),
                    onMouseUp: clearOperationTimeout,
                    onMouseLeave: clearOperationTimeout,
                } }))));
};
export default InputStepperControlled;
