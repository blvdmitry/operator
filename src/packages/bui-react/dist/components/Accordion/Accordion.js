import React from "react";
import AccordionControlled from "./AccordionControlled.js";
import AccordionUncontrolled from "./AccordionUncontrolled.js";
const Accordion = (props) => {
    const { active } = props;
    if (active !== undefined)
        return React.createElement(AccordionControlled, { ...props });
    return React.createElement(AccordionUncontrolled, { ...props });
};
export default Accordion;
