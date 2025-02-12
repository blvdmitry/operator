import React from "react";
import InputRadioGroupControlled from "./InputRadioGroupControlled.js";
const InputRadioGroupUncontrolled = (props) => {
    const { defaultValue, onChange } = props;
    const [value, setValue] = React.useState(defaultValue || null);
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputRadioGroupControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputRadioGroupUncontrolled;
