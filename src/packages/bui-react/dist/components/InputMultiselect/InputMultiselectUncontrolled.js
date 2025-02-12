import React from "react";
import InputMultiselectControlled from "./InputMultiselectControlled.js";
const InputMultiselectUncontrolled = (props) => {
    const { onChange, defaultValue } = props;
    const [value, setValue] = React.useState(defaultValue || []);
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputMultiselectControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputMultiselectUncontrolled;
