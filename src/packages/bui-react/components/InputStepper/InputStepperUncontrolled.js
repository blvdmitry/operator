import React from "react";
import InputStepperControlled from "./InputStepperControlled.js";
const InputStepperUncontrolled = (props) => {
    const { defaultValue, onChange, min } = props;
    const defaultState = defaultValue === undefined ? min ?? null : defaultValue;
    const [value, setValue] = React.useState(defaultState);
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(InputStepperControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default InputStepperUncontrolled;
