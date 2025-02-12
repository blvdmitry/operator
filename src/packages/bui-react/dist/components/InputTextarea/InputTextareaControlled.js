import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { calculateTextareaHeight } from "@bookingcom/bui-core/utilities/input";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import FormControl from "../FormControl/index.js";
import styles from "@bookingcom/bui-core/css/InputTextarea.module.css";
const InputTextareaControlled = (props) => {
    const { id, onChange, name, label, subLabel, disabled, placeholder, size = "medium", rows, required, maximumLength, showLengthCounter, inputAttributes, onFocus, onBlur, error, success, helper, className, attributes, minVisibleLines = 2, maxVisibleLines, mixin, } = props;
    const value = props.value || "";
    const rootClassName = classNames(styles.root, className, !!error && styles["root--status-error"], size && styles[`root--size-${size}`]);
    const valueLength = value?.length || 0;
    const textareaRef = React.useRef(null);
    const handleChange = (event) => {
        if (!onChange)
            return;
        onChange({ name, value: event.target.value, event });
    };
    useIsomorphicLayoutEffect(() => {
        if (!textareaRef.current)
            return;
        if (maxVisibleLines) {
            const { height, minHeight } = calculateTextareaHeight(textareaRef.current, minVisibleLines, maxVisibleLines);
            textareaRef.current.style.minHeight = minHeight || "";
            textareaRef.current.style.height = height;
        }
        else {
            // Prioritize "rows" attribute for non-resizable textareas
            const minRows = Number(inputAttributes?.rows) || minVisibleLines;
            textareaRef.current.style.minHeight =
                calculateTextareaHeight(textareaRef.current, minRows).minHeight || "";
        }
    }, [
        value,
        textareaRef,
        minVisibleLines,
        maxVisibleLines,
        inputAttributes?.rows,
    ]);
    return (React.createElement(FormControl, { id: id, attributes: attributes, className: rootClassName, label: label, subLabel: subLabel, error: error, success: success, helper: helper, disabled: disabled, required: required, labelEndSlot: !!maximumLength &&
            showLengthCounter &&
            `${valueLength} / ${maximumLength}`, mixin: mixin }, (attributes) => (React.createElement("div", { className: styles.wrapper },
        React.createElement("textarea", { ref: textareaRef, onFocus: onFocus, onBlur: onBlur, ...inputAttributes, ...attributes, rows: rows, disabled: disabled, name: name, className: styles.field, placeholder: placeholder, value: value, onChange: handleChange, maxLength: maximumLength }),
        React.createElement("div", { className: styles.decorator })))));
};
export default InputTextareaControlled;
