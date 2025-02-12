import React from "react";
import DropdownMenuControlled from "./DropdownMenuControlled";
import type * as T from "./DropdownMenu.types";

const DropdownMenuUncontrolled = (props: T.Props) => {
  const { onItemChoose, onOpen, onClose } = props;
  const [active, setActive] = React.useState(false);

  const handleItemChoose: T.Props["onItemChoose"] = (item, index) => {
    setActive(false);
    if (onItemChoose) onItemChoose(item, index);
  };

  const handleOpen = () => {
    setActive(true);
    if (onOpen) onOpen();
  };

  const handleClose = () => {
    setActive(false);
    if (onClose) onClose();
  };

  return (
    <DropdownMenuControlled
      {...props}
      active={active}
      onItemChoose={handleItemChoose}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};

export default DropdownMenuUncontrolled;
