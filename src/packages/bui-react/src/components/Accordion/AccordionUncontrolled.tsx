import React from "react";
import AccordionControlled from "./AccordionControlled";
import type * as T from "./Accordion.types";

const AccordionUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultActive, onOpen, onClose } = props;
  const [active, setActive] = React.useState(defaultActive ?? false);

  const handleOpen = () => {
    if (onOpen) onOpen();
    setActive(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setActive(false);
  };

  return (
    <AccordionControlled
      {...props}
      onOpen={handleOpen}
      onClose={handleClose}
      active={active}
      defaultActive={undefined}
    />
  );
};

export default AccordionUncontrolled;
