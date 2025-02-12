import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "../../hooks/useId.js";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/InputSwitch.module.css";
const InputSwitch = (props) => {
    const { id, value, defaultValue, onChange, label, name, reversed, disabled, className, ariaLabel, attributes, inputAttributes, mixin, } = props;
    const switchId = useId(id);
    const rootClassNames = classNames(styles.root, className, reversed && styles["root--reversed"]);
    const handleChange = (event) => {
        if (!onChange)
            return;
        onChange({ name, value: event.target.checked, event });
    };
    return (React.createElement(Text, { attributes: attributes, className: rootClassNames, mixin: mixin, variant: "body_2" },
        React.createElement("input", { ...inputAttributes, type: "checkbox", name: name, checked: value ?? undefined, defaultChecked: defaultValue, id: switchId, disabled: disabled, className: styles.trigger, "aria-label": ariaLabel, "aria-checked": value ?? false, role: "switch", onChange: handleChange }),
        React.createElement("label", { htmlFor: switchId, className: styles.inner, "aria-live": "polite" },
            React.createElement("span", { className: styles.indicator }),
            label && React.createElement("span", { className: styles.label }, label),
            React.createElement("span", { className: styles.hitbox }))));
};
export default InputSwitch;
