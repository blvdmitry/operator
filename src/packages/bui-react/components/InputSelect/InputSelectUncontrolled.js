import React from "react";
import InputSelectControlled from "./InputSelectControlled.js";
const InputSelectUncontrolled = (props) => {
    const { defaultValue, onChange } = props;
    const [value, setValue] = React.useState(defaultValue || "");
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputSelectControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputSelectUncontrolled;
