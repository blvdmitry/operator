import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import FormControl, {} from "../FormControl/index.js";
import Button from "../Button/index.js";
import Icon from "../Icon/index.js";
import styles from "@bookingcom/bui-core/css/InputText.module.css";
const InputTextControlled = (props) => {
    const { id, onChange, name, value, label, subLabel, disabled, type, placeholder, prefix, suffix, className, inputClassName, decoratorClassName, attributes, onFocus, onBlur, inputAttributes, prefixAttributes, suffixAttributes, startSlot, startIcon, endIcon, error, success, helper, size = "medium", maximumLength, showLengthCounter, clearButtonVisibility = "never", clearButtonAriaLabel, clearButtonAttributes, required, bordered = true, mixin, } = props;
    let { endSlot } = props;
    const containerRef = React.createRef();
    const internalInputRef = React.createRef();
    const inputRef = inputAttributes?.ref ||
        internalInputRef;
    const [isFocused, setFocused] = React.useState(false);
    const valueLength = value?.length || 0;
    const isClearButtonRendered = (clearButtonVisibility === "always" ||
        (clearButtonVisibility === "on-edit" && isFocused)) &&
        valueLength > 0;
    const rootClassName = classNames(className, styles.root, !!error && !isFocused && styles["root--status-error"], !error && !!success && !isFocused && styles["root--status-success"], size && styles[`root--size-${size}`], disabled && styles["root--disabled"], !bordered && styles["root--borderless"]);
    let validationIcon = null;
    if (!disabled && !isFocused && success) {
        validationIcon = (React.createElement(Icon, { svg: CheckmarkSelectedIcon, color: "constructive", size: "medium" }));
    }
    if (!disabled && !isFocused && error) {
        validationIcon = (React.createElement(Icon, { svg: WarningIcon, color: "destructive", size: "medium" }));
    }
    const handleInputChange = (event) => {
        onChange?.({ name, value: event.target.value, event });
        inputAttributes?.onChange?.(event);
    };
    const handleClearButtonClick = () => {
        const inputEl = inputRef.current;
        if (!inputEl)
            return;
        /**
         * Triggering the event programmatically since inputAttributes.onChange need an event passed to its call
         */
        const event = new Event("input");
        const prevValue = inputEl.value;
        inputEl.value = "";
        inputEl.dispatchEvent(event);
        handleInputChange(event);
        inputEl.value = prevValue;
        inputEl.focus();
    };
    const handleClearButtonBlur = () => {
        requestAnimationFrame(() => {
            if (containerRef.current &&
                !containerRef.current.contains(document.activeElement)) {
                setFocused(false);
            }
        });
    };
    const handleInputFocus = (event) => {
        setFocused(true);
        onFocus?.(event);
        inputAttributes?.onFocus?.(event);
    };
    const handleInputBlur = (event) => {
        onBlur?.(event);
        inputAttributes?.onBlur?.(event);
        if (clearButtonVisibility === "never") {
            setFocused(false);
            return;
        }
        // Don't change the focused state in case we're focused on the clear button or any other actionable element
        // We keep this operation async to give the browser time to focus on the button before we unmount it
        requestAnimationFrame(() => {
            if (containerRef.current &&
                !containerRef.current.contains(document.activeElement)) {
                setFocused(false);
            }
        });
    };
    if (isClearButtonRendered) {
        validationIcon = null;
        endSlot = (React.createElement(Button.Aligner, { alignment: "end" },
            React.createElement(Button, { variant: "tertiary-neutral", size: size, onClick: handleClearButtonClick, onBlur: handleClearButtonBlur, icon: CloseIcon, attributes: {
                    "aria-label": clearButtonAriaLabel,
                    ...(clearButtonAttributes || {}),
                } })));
    }
    const renderField = (controlAttributes) => {
        const inputClassNames = classNames(styles.control, inputClassName);
        const decoratorClassNames = classNames(styles.decorator, decoratorClassName);
        return (React.createElement("div", { ref: containerRef, className: styles.field },
            startIcon && (React.createElement(Icon, { className: classNames(styles.icon, styles["icon--start"]), svg: startIcon, size: "medium" })),
            startSlot && !startIcon && (React.createElement("div", { className: classNames(styles.side, styles["side--start"]) }, startSlot)),
            React.createElement("input", { ref: inputRef, disabled: disabled, type: type, name: name, className: inputClassNames, placeholder: placeholder, value: value === null ? "" : value, maxLength: maximumLength, ...inputAttributes, ...controlAttributes, onFocus: handleInputFocus, onBlur: handleInputBlur, onChange: handleInputChange }),
            React.createElement("div", { className: decoratorClassNames }),
            validationIcon && (React.createElement("div", { className: classNames(styles.side, styles["side--end"]) }, validationIcon)),
            endIcon && (React.createElement(Icon, { className: classNames(styles.icon, styles["icon--end"]), svg: endIcon, size: "medium" })),
            endSlot && !endIcon && (React.createElement("div", { className: classNames(styles.side, styles["side--end"]) }, endSlot))));
    };
    const renderGroup = (controlAttributes) => {
        return (React.createElement(React.Fragment, null,
            prefix && (React.createElement("div", { ...prefixAttributes, className: styles.addon }, prefix)),
            renderField(controlAttributes),
            suffix && (React.createElement("div", { ...suffixAttributes, className: styles.addon }, suffix))));
    };
    return (React.createElement(FormControl, { attributes: attributes, className: rootClassName, label: label, error: error, success: success, helper: helper, disabled: disabled, required: required, subLabel: subLabel, labelEndSlot: !!maximumLength &&
            showLengthCounter &&
            `${valueLength} / ${maximumLength}`, id: id || inputAttributes?.id, mixin: mixin, ref: attributes?.ref }, (controlAttributes) => (React.createElement("div", { className: styles.content }, prefix || suffix
        ? renderGroup(controlAttributes)
        : renderField(controlAttributes)))));
};
export default InputTextControlled;
