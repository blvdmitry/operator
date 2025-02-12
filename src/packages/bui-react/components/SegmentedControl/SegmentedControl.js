import React from "react";
import SegmentedControlControlled from "./SegmentedControlControlled.js";
import SegmentedControlUncontrolled from "./SegmentedControlUncontrolled.js";
const SegmentedControl = (props) => {
    const { value } = props;
    if (value !== undefined)
        return React.createElement(SegmentedControlControlled, { ...props });
    return React.createElement(SegmentedControlUncontrolled, { ...props });
};
export default SegmentedControl;
