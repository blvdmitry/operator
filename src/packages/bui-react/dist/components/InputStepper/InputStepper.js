import React from "react";
import InputStepperControlled from "./InputStepperControlled.js";
import InputStepperUncontrolled from "./InputStepperUncontrolled.js";
const InputStepper = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputStepperControlled, { ...props });
    return React.createElement(InputStepperUncontrolled, { ...props });
};
export default InputStepper;
