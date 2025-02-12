import React from "react";
import InputCheckboxGroupControlled from "./InputCheckboxGroupControlled.js";
import InputCheckboxGroupUncontrolled from "./InputCheckboxGroupUncontrolled.js";
const InputCheckboxGroup = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputCheckboxGroupControlled, { ...props });
    return React.createElement(InputCheckboxGroupUncontrolled, { ...props });
};
export default InputCheckboxGroup;
