import React from "react";
import FormControl from "../FormControl/index.js";
import Context from "./InputRadioGroup.context.js";
const InputRadioGroupControlled = (props) => {
    const { onChange, name, disabled, value, children, error, id, label, subLabel, required, className, attributes, mixin, } = props;
    const handleItemChange = (args) => {
        const { event, value: fieldValue } = args;
        if (!fieldValue)
            return;
        onChange?.({ name, value: fieldValue, event });
    };
    return (React.createElement(Context.Provider, { value: { onItemChange: handleItemChange, disabled, value, name, error } },
        React.createElement(FormControl, { group: true, id: id, label: label, subLabel: subLabel, required: required, className: className, error: error, disabled: disabled, attributes: attributes, mixin: mixin }, () => children)));
};
export default InputRadioGroupControlled;
