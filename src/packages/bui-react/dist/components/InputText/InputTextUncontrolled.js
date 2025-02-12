import React from "react";
import InputTextControlled from "./InputTextControlled.js";
const InputTextUncontrolled = (props) => {
    const { defaultValue, onChange } = props;
    const [value, setValue] = React.useState(defaultValue || "");
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputTextControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputTextUncontrolled;
