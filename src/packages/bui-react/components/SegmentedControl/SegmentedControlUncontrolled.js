import React from "react";
import SegmentedControlControlled from "./SegmentedControlControlled.js";
const SegmentedControlUncontrolled = (props) => {
    const { defaultValue, onChange } = props;
    const [value, setValue] = React.useState(defaultValue || null);
    const handleChange = (args) => {
        setValue(args.value);
        if (onChange)
            onChange(args);
    };
    return (React.createElement(SegmentedControlControlled, { ...props, value: value, defaultValue: undefined, onChange: handleChange }));
};
export default SegmentedControlUncontrolled;
