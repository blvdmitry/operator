import React from "react";
import InputTextControlled from "./InputTextControlled.js";
import InputTextUncontrolled from "./InputTextUncontrolled.js";
const InputText = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputTextControlled, { ...props });
    return React.createElement(InputTextUncontrolled, { ...props });
};
export default InputText;
