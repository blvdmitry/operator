import React from "react";
import FlyoutControlled from "./FlyoutControlled.js";
const FlyoutUncontrolled = (props, ref) => {
    const { defaultActive, onClose, onOpen } = props;
    const [active, setActive] = React.useState(defaultActive || false);
    const handleClose = () => {
        setActive(false);
        if (onClose)
            onClose();
    };
    const handleOpen = () => {
        setActive(true);
        if (onOpen)
            onOpen();
    };
    return (React.createElement(FlyoutControlled, { ...props, ref: ref, defaultActive: undefined, active: active, onClose: handleClose, onOpen: handleOpen }));
};
export default React.forwardRef(FlyoutUncontrolled);
