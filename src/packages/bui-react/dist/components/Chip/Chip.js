import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import { useInputCheckboxGroup } from "../InputCheckboxGroup/index.js";
import { ArrowMenuIcon } from "@bookingcom/bui-assets-react/streamline";
import Icon from "../Icon/index.js";
import HiddenVisually from "../HiddenVisually/index.js";
import Text from "../Text/index.js";
import Bubble from "../Bubble/index.js";
import Actionable, {} from "../Actionable/index.js";
import styles from "@bookingcom/bui-core/css/Chip.module.css";
const ToggleChip = (props) => {
    const { label, icon, elevated, dismissible, onChange, onFocus, onBlur, className, attributes, value, wide, inputAttributes, mixin, defaultChecked = false, checked, } = props;
    const checkboxGroup = useInputCheckboxGroup();
    const name = checkboxGroup?.name || props.name;
    const disabled = checkboxGroup?.disabled || props.disabled;
    const groupChecked = checkboxGroup?.value?.includes(value);
    const checkedOrgroupChecked = checkboxGroup ? groupChecked : checked;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const inputChecked = React.useMemo(() => {
        return dismissible || (checkedOrgroupChecked ?? uncontrolledChecked);
    }, [dismissible, checkedOrgroupChecked, uncontrolledChecked]);
    const rootClassName = classNames(styles.root, className, elevated && styles["root--elevated"], disabled && styles["root--disabled"], inputChecked && styles["root--selected"], wide && styles["root--wide"], mixinClassNames(mixin));
    const rootAttributes = {
        ...(dismissible
            ? {
                attributes: {
                    ...attributes,
                    ...("ariaLabel" in props && {
                        "aria-label": props.ariaLabel,
                    }),
                },
            }
            : attributes),
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const handleChange = (event, isChecked) => {
        if (checkboxGroup) {
            checkboxGroup.onItemChange({ event, value, checked: isChecked, name });
        }
        else if (checked !== undefined && onChange) {
            onChange({ name, checked: isChecked, value, event });
        }
        else {
            setUncontrolledChecked(isChecked);
            if (onChange)
                onChange({ name, checked: isChecked, value, event });
        }
    };
    const handleInputChange = (event) => {
        const { checked: eventChecked } = event.target;
        handleChange(event, eventChecked);
    };
    const handleDismissibleClick = (event) => {
        handleChange(event, false);
    };
    const renderInput = (param) => (React.createElement("input", { ...inputAttributes, className: classNames(param?.className, styles.input), name: name, checked: inputChecked, value: value, type: "checkbox", disabled: disabled, onChange: handleInputChange, onFocus: onFocus, onBlur: onBlur }));
    const renderContent = () => (React.createElement("span", { className: styles.trigger },
        icon && React.createElement(Icon, { svg: icon, scale: true }),
        React.createElement(Text, { tagName: "span", variant: "emphasized_2" }, label),
        dismissible && React.createElement(Icon, { svg: CloseIcon, scale: true })));
    return dismissible ? (React.createElement(Actionable, { className: rootClassName, ...rootAttributes, onClick: handleDismissibleClick }, renderContent())) : (React.createElement("label", { className: rootClassName, ...rootAttributes },
        React.createElement(HiddenVisually, null, renderInput),
        renderContent()));
};
const ActionChip = (props) => {
    const { label, icon, elevated, disabled, onFocus, onBlur, onClick, className, attributes, bubble, checked, wide, mixin, } = props;
    const rootClassName = classNames(styles.root, elevated && styles["root--elevated"], disabled && styles["root--disabled"], checked && styles["root--selected"], wide && styles["root--wide"], className);
    const handleClick = (e) => {
        onClick?.(e);
        attributes?.onClick?.(e);
    };
    const handleFocus = (e) => {
        onFocus?.(e);
        attributes?.onFocus?.(e);
    };
    const handleBlur = (e) => {
        onBlur?.(e);
        attributes?.onBlur?.(e);
    };
    return (React.createElement(Actionable, { className: rootClassName, attributes: {
            ...attributes,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onClick: handleClick,
        }, disabled: disabled, mixin: mixin },
        React.createElement("span", { className: styles.trigger },
            icon && React.createElement(Icon, { svg: icon, scale: true }),
            React.createElement(Text, { tagName: "span", variant: "emphasized_2" }, label),
            bubble?.text && !disabled && checked && (React.createElement(Bubble, { text: bubble.text, ariaLabel: bubble.ariaLabel, variant: "action" })),
            React.createElement(Icon, { svg: ArrowMenuIcon, scale: true }))));
};
const Chip = (props) => {
    return props.variant === "action" ? (React.createElement(ActionChip, { ...props })) : (React.createElement(ToggleChip, { ...props }));
};
export default Chip;
