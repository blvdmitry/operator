import React from "react";
import FormControl from "../FormControl/index.js";
import Context from "./InputCheckboxGroup.context.js";
const InputCheckboxGroupControlled = (props) => {
    const { onChange, name, disabled, value, children, error, id, label, subLabel, required, className, attributes, mixin, } = props;
    const handleItemChange = (args) => {
        const { event, value: fieldValue, checked } = args;
        if (!fieldValue)
            return;
        let nextValue = [...value];
        if (checked) {
            nextValue.push(fieldValue);
        }
        else {
            nextValue = nextValue.filter((v) => v !== fieldValue);
        }
        if (onChange)
            onChange({ name, value: nextValue, event });
    };
    return (React.createElement(Context.Provider, { value: {
            onItemChange: handleItemChange,
            disabled,
            value,
            name,
            error,
            required,
        } },
        React.createElement(FormControl, { group: true, id: id, label: label, subLabel: subLabel, required: required, className: className, error: error, disabled: disabled, attributes: attributes, mixin: mixin }, () => children)));
};
export default InputCheckboxGroupControlled;
