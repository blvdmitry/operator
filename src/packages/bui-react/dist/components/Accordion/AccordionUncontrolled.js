import React from "react";
import AccordionControlled from "./AccordionControlled.js";
const AccordionUncontrolled = (props) => {
    const { defaultActive, onOpen, onClose } = props;
    const [active, setActive] = React.useState(defaultActive ?? false);
    const handleOpen = () => {
        if (onOpen)
            onOpen();
        setActive(true);
    };
    const handleClose = () => {
        if (onClose)
            onClose();
        setActive(false);
    };
    return (React.createElement(AccordionControlled, { ...props, onOpen: handleOpen, onClose: handleClose, active: active, defaultActive: undefined }));
};
export default AccordionUncontrolled;
