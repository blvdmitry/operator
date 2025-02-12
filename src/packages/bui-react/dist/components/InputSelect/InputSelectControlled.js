"use client";
import React from "react";
import { find } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import FormControl from "../FormControl/index.js";
import Icon from "../Icon/index.js";
import Image from "../Image/index.js";
import Avatar from "../Avatar/index.js";
import styles from "@bookingcom/bui-core/css/InputSelect.module.css";
const InputSelectStartContent = (props) => {
    const { startIcon, startImage, startAvatar } = props;
    if (startIcon) {
        return (React.createElement(Icon, { svg: startIcon, size: "medium", className: classNames(styles["start-content"], styles["start-icon"]), color: "neutral" }));
    }
    if (startImage) {
        return (React.createElement(Image, { ...startImage, width: "20px", height: "20px", className: classNames(styles["start-content"], styles["start-image"]) }));
    }
    if (startAvatar) {
        return (React.createElement("div", { className: classNames(styles["start-content"], styles["start-avatar-wrapper"]) },
            React.createElement(Avatar, { ...startAvatar, size: "small", className: styles["start-avatar"] })));
    }
    return null;
};
const InputSelectStatusIcon = (props) => {
    const { disabled, success, error } = props;
    if (!disabled && success) {
        return (React.createElement(Icon, { svg: CheckmarkSelectedIcon, color: "constructive", size: "medium" }));
    }
    if (!disabled && error) {
        return React.createElement(Icon, { svg: WarningIcon, color: "destructive", size: "medium" });
    }
    return null;
};
const InputSelectEndIcons = (props) => {
    const { disabled, error, success } = props;
    return (React.createElement("span", { className: styles.endIconContainer },
        React.createElement(InputSelectStatusIcon, { disabled: disabled, error: error, success: success }),
        React.createElement(Icon, { svg: ArrowNavDownIcon, className: styles.arrowIcon, size: "medium", color: "neutral" })));
};
const InputSelectOption = (option) => {
    return (React.createElement("option", { value: option.value, key: option.key || option.value, "data-key": option.key || option.value, disabled: option.disabled }, option.text));
};
const InputSelectOptgroup = (optgroup, index) => {
    return (React.createElement("optgroup", { key: index, label: optgroup.label, disabled: optgroup.disabled }, optgroup.options.map(InputSelectOption)));
};
const InputSelect = (props) => {
    const { label, subLabel, options, optgroups, placeholder, disabled, id, name, value, defaultValue, success, error, helper, className, inputClassName, attributes, inputAttributes, size = "medium", startIcon, startImage, startAvatar, hideValue, required, bordered = true, onChange, onFocus, onBlur, onClick, children, mixin, } = props;
    const handleChange = (event) => {
        const { value } = event.target;
        if (onChange)
            onChange({ name, value, event });
    };
    const allOptions = options ||
        optgroups?.reduce((acc, group) => {
            acc.push(...group.options);
            return acc;
        }, []);
    const selectedOption = find(allOptions || [], (option) => option.value === value);
    const isPlaceholderSelected = !selectedOption && !value && !children && placeholder;
    const wrapperClassNames = classNames(styles.wrapper, styles[`root--size-${size}`], (startIcon || startImage || startAvatar) &&
        styles["root--has-start-content"], !disabled && !!success && styles["root--status-success"], !disabled && !!error && styles["root--status-error"], disabled && styles["root--disabled"], isPlaceholderSelected && styles["root--placeholder"], !bordered && styles["root--borderless"], hideValue && styles["root--hide-value"]);
    const selectClassNames = classNames(styles.field, inputClassName);
    const handleClick = (e) => {
        onClick?.(e);
        inputAttributes?.onClick?.(e);
    };
    return (React.createElement(FormControl, { attributes: attributes, className: className, label: label, subLabel: subLabel, required: required, error: error, success: success, helper: helper, disabled: disabled, id: id, mixin: mixin }, (controlAttributes) => (React.createElement("div", { className: wrapperClassNames }, options || optgroups ? (React.createElement(React.Fragment, null,
        React.createElement(InputSelectStartContent, { startIcon: startIcon, startImage: startImage, startAvatar: startAvatar }),
        React.createElement("select", { className: selectClassNames, disabled: disabled, name: name, value: value ?? undefined, defaultValue: defaultValue, onChange: handleChange, onFocus: onFocus, onBlur: onBlur, ...inputAttributes, ...controlAttributes },
            placeholder && React.createElement("option", { value: "" }, placeholder),
            options
                ? options.map(InputSelectOption)
                : optgroups.map(InputSelectOptgroup)),
        React.createElement(InputSelectEndIcons, { disabled: disabled, error: error, success: success }))) : (React.createElement("button", { ...inputAttributes, ...controlAttributes, type: "button", className: selectClassNames, disabled: disabled, onClick: handleClick },
        React.createElement(InputSelectStartContent, { startIcon: startIcon, startImage: startImage, startAvatar: startAvatar }),
        children || placeholder,
        React.createElement(InputSelectEndIcons, { disabled: disabled, error: error, success: success })))))));
};
export default InputSelect;
