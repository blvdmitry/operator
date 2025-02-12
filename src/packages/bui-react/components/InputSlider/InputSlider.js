import React from "react";
import InputSliderControlled from "./InputSliderControlled.js";
import InputSliderUncontrolled from "./InputSliderUncontrolled.js";
const InputSlider = (props) => {
    const { value, minValue, maxValue } = props;
    const resolvedProps = {
        min: 0,
        max: 100,
        interval: 1,
        ...props,
    };
    if (value !== undefined ||
        (minValue !== undefined && maxValue !== undefined)) {
        return (React.createElement(InputSliderControlled, { ...resolvedProps }));
    }
    return (React.createElement(InputSliderUncontrolled, { ...resolvedProps }));
};
export default InputSlider;
