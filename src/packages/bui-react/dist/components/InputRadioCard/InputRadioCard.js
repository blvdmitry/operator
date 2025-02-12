import React from "react";
import { useInputRadioGroup } from "../InputRadioGroup/index.js";
import InputRadioCardControlled from "./InputRadioCardControlled.js";
import InputRadioCardUncontrolled from "./InputRadioCardUncontrolled.js";
const InputRadioCard = (props) => {
    const { value } = props;
    const radioGroup = useInputRadioGroup();
    const resolvedProps = {
        ...props,
        name: radioGroup?.name || props.name,
        disabled: radioGroup?.disabled || props.disabled,
        checked: radioGroup?.value !== undefined && value
            ? radioGroup.value === value
            : props.checked,
        defaultChecked: radioGroup ? undefined : props.defaultChecked,
        onChange: radioGroup?.onItemChange || props?.onChange,
    };
    if (resolvedProps.checked !== undefined) {
        return (React.createElement(InputRadioCardControlled, { ...resolvedProps }));
    }
    return (React.createElement(InputRadioCardUncontrolled, { ...resolvedProps }));
};
export default InputRadioCard;
