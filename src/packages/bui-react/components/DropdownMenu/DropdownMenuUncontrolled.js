import React from "react";
import DropdownMenuControlled from "./DropdownMenuControlled.js";
const DropdownMenuUncontrolled = (props) => {
    const { onItemChoose, onOpen, onClose } = props;
    const [active, setActive] = React.useState(false);
    const handleItemChoose = (item, index) => {
        setActive(false);
        if (onItemChoose)
            onItemChoose(item, index);
    };
    const handleOpen = () => {
        setActive(true);
        if (onOpen)
            onOpen();
    };
    const handleClose = () => {
        setActive(false);
        if (onClose)
            onClose();
    };
    return (React.createElement(DropdownMenuControlled, { ...props, active: active, onItemChoose: handleItemChoose, onOpen: handleOpen, onClose: handleClose }));
};
export default DropdownMenuUncontrolled;
