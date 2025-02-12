import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CheckmarkFillIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkFillIcon";
import FormControl from "../FormControl/index.js";
import Text from "../Text/index.js";
import Icon from "../Icon/index.js";
import Stack from "../Stack/index.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import useComposeRefs from "../../hooks/useComposeRefs.js";
import useId from "../../hooks/useId.js";
import { useInputCheckboxGroup } from "../InputCheckboxGroup/index.js";
import styles from "@bookingcom/bui-core/css/InputCheckbox.module.css";
const InputCheckboxControlled = (props) => {
    const { error, required, label, helper, className, onChange, onFocus, onBlur, attributes, value, indeterminate, inputAttributes, children, startSlot, startSlotVerticalAlignment = "center", icon, mixin, } = props;
    const checkboxGroup = useInputCheckboxGroup();
    const name = checkboxGroup?.name || props.name;
    const disabled = checkboxGroup?.disabled || props.disabled;
    const checked = (checkboxGroup ? checkboxGroup.value?.includes(value) : props.checked) ||
        false;
    const requiredWithGroupFallback = checkboxGroup?.required !== undefined ? checkboxGroup.required : required;
    const showAsterisk = checkboxGroup?.required === undefined && required;
    const internalRef = React.useRef(null);
    const syncRefs = useComposeRefs(internalRef, inputAttributes?.ref);
    const id = useId(props.id);
    const rootClassName = classNames(styles.root, className, (!!error || !!checkboxGroup?.error) && styles["root--error"]);
    const handleChange = (event) => {
        if (!name) {
            // eslint-disable-next-line no-console
            console.error("[BUI:InputCheckbox] Missing name property");
            return;
        }
        const checkArgs = {
            name,
            value,
            checked: event.target.checked,
            event,
        };
        if (checkboxGroup?.onItemChange) {
            checkboxGroup?.onItemChange(checkArgs);
        }
        else {
            onChange?.(checkArgs);
        }
        internalRef.current.indeterminate = !!indeterminate && !checked;
    };
    useIsomorphicLayoutEffect(() => {
        internalRef.current.indeterminate = !!indeterminate && !checked;
    }, [indeterminate, checked]);
    return (React.createElement(React.Fragment, null,
        React.createElement(FormControl, { id: id, error: error, required: requiredWithGroupFallback, disabled: disabled, className: rootClassName, attributes: attributes, mixin: mixin }, (controlAttributes) => (React.createElement(React.Fragment, null,
            React.createElement("input", { ...inputAttributes, ...controlAttributes, className: styles.input, type: "checkbox", name: name, disabled: disabled, checked: checked, value: value, onFocus: onFocus || inputAttributes?.onFocus, onBlur: onBlur || inputAttributes?.onBlur, onChange: handleChange, ref: syncRefs }),
            React.createElement(Stack, { direction: "row", tagName: "label", className: styles.container, attributes: { htmlFor: controlAttributes.id } },
                React.createElement("span", { className: styles.hitbox }),
                React.createElement("span", { className: styles.field },
                    React.createElement(Icon, { svg: CheckmarkFillIcon, className: styles["checkbox-icon"] })),
                icon && (React.createElement("span", { className: styles.icon },
                    React.createElement(Icon, { svg: icon, size: "small" }))),
                startSlot && (React.createElement(Stack, { direction: "row", alignItems: startSlotVerticalAlignment, className: styles.start }, startSlot)),
                (label || helper) && (React.createElement(Stack.Item, { tagName: "span", grow: true },
                    label && (React.createElement(Text, { color: disabled ? "disabled" : "neutral", variant: "body_2" },
                        label,
                        showAsterisk && (React.createElement("span", { className: classNames(styles.required, disabled && styles["required--disabled"]), "aria-hidden": "true" }, "*")))),
                    helper && (React.createElement(Text, { variant: "small_1", color: disabled ? "disabled" : "neutral_alt", className: styles.helper }, helper)))))))),
        children && React.createElement("div", { className: styles.bottom }, children)));
};
export default InputCheckboxControlled;
