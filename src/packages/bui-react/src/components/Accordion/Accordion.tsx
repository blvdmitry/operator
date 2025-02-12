import React from "react";
import AccordionControlled from "./AccordionControlled";
import AccordionUncontrolled from "./AccordionUncontrolled";
import type * as T from "./Accordion.types";

const Accordion = (props: T.Props) => {
  const { active } = props;

  if (active !== undefined)
    return <AccordionControlled {...(props as T.ControlledProps)} />;
  return <AccordionUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default Accordion;
