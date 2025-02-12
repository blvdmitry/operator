import React from "react";
import InputRadioGroupControlled from "./InputRadioGroupControlled.js";
import InputRadioGroupUncontrolled from "./InputRadioGroupUncontrolled.js";
const InputRadioGroup = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputRadioGroupControlled, { ...props });
    return React.createElement(InputRadioGroupUncontrolled, { ...props });
};
export default InputRadioGroup;
