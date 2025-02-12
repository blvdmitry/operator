import React from "react";
import { useInputCheckboxGroup } from "../InputCheckboxGroup/index.js";
import InputCheckboxCardControlled from "./InputCheckboxCardControlled.js";
import InputCheckboxCardUncontrolled from "./InputCheckboxCardUncontrolled.js";
const InputCheckboxCard = (props) => {
    const { value } = props;
    const checkboxGroup = useInputCheckboxGroup();
    const resolvedProps = {
        ...props,
        name: checkboxGroup?.name || props.name,
        disabled: checkboxGroup?.disabled || props.disabled,
        checked: checkboxGroup && value
            ? checkboxGroup.value?.includes(value)
            : props.checked,
        defaultChecked: checkboxGroup ? undefined : props.defaultChecked,
        onChange: checkboxGroup?.onItemChange || props?.onChange,
    };
    if (resolvedProps.checked !== undefined) {
        return (React.createElement(InputCheckboxCardControlled, { ...resolvedProps }));
    }
    return (React.createElement(InputCheckboxCardUncontrolled, { ...resolvedProps }));
};
export default InputCheckboxCard;
