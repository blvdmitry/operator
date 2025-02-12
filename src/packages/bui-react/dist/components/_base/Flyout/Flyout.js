import React from "react";
import FlyoutUncontrolled from "./FlyoutUncontrolled.js";
import FlyoutControlled from "./FlyoutControlled.js";
import FlyoutTrigger from "./FlyoutTrigger.js";
import FlyoutContent from "./FlyoutContent.js";
import FlyoutArrow from "./FlyoutArrow.js";
const FlyoutBase = (props, ref) => {
    const { active } = props;
    if (typeof active === "boolean")
        return (React.createElement(FlyoutControlled, { ...props, ref: ref }));
    return (React.createElement(FlyoutUncontrolled, { ...props, ref: ref }));
};
const Flyout = React.forwardRef(FlyoutBase);
Flyout.Trigger = FlyoutTrigger;
Flyout.Content = FlyoutContent;
Flyout.Arrow = FlyoutArrow;
export default Flyout;
