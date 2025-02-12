import React from "react";
import DropdownMenuControlled from "./DropdownMenuControlled.js";
import DropdownMenuUncontrolled from "./DropdownMenuUncontrolled.js";
const DropdownMenu = (props) => {
    const { active } = props;
    if (active !== undefined)
        return React.createElement(DropdownMenuControlled, { ...props });
    return React.createElement(DropdownMenuUncontrolled, { ...props });
};
export default DropdownMenu;
