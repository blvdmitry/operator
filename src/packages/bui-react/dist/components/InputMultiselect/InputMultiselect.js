import React from "react";
import InputMultiselectUncontrolled from "./InputMultiselectUncontrolled.js";
import InputMultiselectControlled from "./InputMultiselectControlled.js";
const InputMultiselect = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputMultiselectControlled, { ...props });
    return React.createElement(InputMultiselectUncontrolled, { ...props });
};
export default InputMultiselect;
