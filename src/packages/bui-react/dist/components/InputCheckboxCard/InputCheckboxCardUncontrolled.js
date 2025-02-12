import React from "react";
import InputCheckboxCardControlled from "./InputCheckboxCardControlled.js";
const InputCheckboxCardUncontrolled = (props) => {
    const { onChange, defaultChecked } = props;
    const [checked, setChecked] = React.useState(defaultChecked || false);
    const handleChange = (args) => {
        setChecked(args.checked);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputCheckboxCardControlled, { ...props, checked: checked, defaultChecked: undefined, onChange: handleChange }));
};
export default InputCheckboxCardUncontrolled;
