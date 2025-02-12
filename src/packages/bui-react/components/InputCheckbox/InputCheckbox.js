import React from "react";
import InputCheckboxControlled from "./InputCheckboxControlled.js";
import InputCheckboxUncontrolled from "./InputCheckboxUncontrolled.js";
const InputCheckbox = (props) => {
    const { checked, indeterminate } = props;
    if (checked !== undefined || indeterminate !== undefined)
        return React.createElement(InputCheckboxControlled, { ...props });
    return React.createElement(InputCheckboxUncontrolled, { ...props });
};
export default InputCheckbox;
