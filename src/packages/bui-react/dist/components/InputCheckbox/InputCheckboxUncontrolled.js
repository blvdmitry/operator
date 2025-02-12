import React from "react";
import InputCheckboxControlled from "./InputCheckboxControlled.js";
const InputCheckboxUncontrolled = (props) => {
    const { defaultChecked, onChange, ...controlledProps } = props;
    const [checked, setChecked] = React.useState(defaultChecked || false);
    const handleChange = (args) => {
        setChecked(args.checked);
        onChange?.(args);
    };
    return (React.createElement(InputCheckboxControlled, { ...controlledProps, checked: checked, onChange: handleChange }));
};
export default InputCheckboxUncontrolled;
