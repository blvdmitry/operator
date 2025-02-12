import React from "react";
import InputSelectControlled from "./InputSelectControlled.js";
import InputSelectUncontrolled from "./InputSelectUncontrolled.js";
const InputSelect = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(InputSelectControlled, { ...props });
    return React.createElement(InputSelectUncontrolled, { ...props });
};
export default InputSelect;
