import React from "react";
import InputCheckboxGroupControlled from "./InputCheckboxGroupControlled.js";
const InputCheckboxGroupUncontrolled = (props) => {
    const { onChange, defaultValue } = props;
    const [value, setValue] = React.useState(defaultValue || []);
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputCheckboxGroupControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputCheckboxGroupUncontrolled;
