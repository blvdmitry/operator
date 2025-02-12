import React from "react";
import InputTextareaControlled from "./InputTextareaControlled.js";
const InputTextareaUncontrolled = (props) => {
    const { defaultValue, onChange } = props;
    const [value, setValue] = React.useState(defaultValue || "");
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputTextareaControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputTextareaUncontrolled;
