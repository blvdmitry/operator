import React from "react";
import InputTextareaControlled from "./InputTextareaControlled.js";
import InputTextareaUncontrolled from "./InputTextareaUncontrolled.js";
const InputTextarea = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputTextareaControlled, { ...props });
    return React.createElement(InputTextareaUncontrolled, { ...props });
};
export default InputTextarea;
