import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "../../hooks/useId.js";
import Text from "../Text/index.js";
import FormControl from "../FormControl/index.js";
import Icon from "../Icon/index.js";
import Stack from "../Stack/index.js";
import { useInputRadioGroup } from "../InputRadioGroup/index.js";
import styles from "@bookingcom/bui-core/css/InputRadio.module.css";
const InputRadio = (props) => {
    const { label, helper, className, onChange, onFocus, onBlur, value, attributes, inputAttributes, error, icon, mixin, } = props;
    const id = useId(props.id);
    const radioGroup = useInputRadioGroup();
    const name = radioGroup?.name || props.name;
    const disabled = radioGroup?.disabled || props.disabled;
    const checked = radioGroup ? radioGroup.value === value : props.checked;
    const defaultChecked = radioGroup ? undefined : props.defaultChecked;
    const rootClassName = classNames(styles.root, className, (!!error || !!radioGroup?.error) && styles["root--error"]);
    const handleChange = (event) => {
        const { checked } = event.target;
        if (!name) {
            // eslint-disable-next-line no-console
            console.error("[BUI:InputRadio] Missing name property");
            return;
        }
        if (radioGroup?.onItemChange) {
            radioGroup.onItemChange({ name, value, checked, event });
        }
        else {
            onChange?.({ name, value, checked, event });
        }
    };
    return (React.createElement(FormControl, { id: id, error: error, disabled: disabled, className: rootClassName, attributes: attributes, mixin: mixin }, (controlAttributes) => (React.createElement(React.Fragment, null,
        React.createElement("input", { ...inputAttributes, ...controlAttributes, className: styles.input, type: "radio", name: name, disabled: disabled, checked: checked === null ? false : checked, defaultChecked: defaultChecked, value: value, onFocus: onFocus || inputAttributes?.onFocus, onBlur: onBlur || inputAttributes?.onBlur, onChange: handleChange }),
        React.createElement(Stack, { direction: "row", tagName: "label", className: styles.container, attributes: { htmlFor: controlAttributes.id } },
            React.createElement("span", { className: styles.hitbox }),
            React.createElement("span", { className: styles.field }),
            icon && (React.createElement("span", { className: styles.icon },
                React.createElement(Icon, { svg: icon, size: "small" }))),
            (label || helper) && (React.createElement(Stack.Item, { tagName: "span", grow: true, className: styles.content },
                label && (React.createElement(Text, { color: disabled ? "disabled" : "neutral", className: styles.label, variant: "body_2" }, label)),
                helper && (React.createElement(Text, { variant: "small_1", color: disabled ? "disabled" : "neutral_alt", className: styles.helper }, helper)))))))));
};
export default InputRadio;
