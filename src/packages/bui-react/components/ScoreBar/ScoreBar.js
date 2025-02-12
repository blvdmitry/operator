import React from "react";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import useId from "../../hooks/useId.js";
import ScoreBarProgress from "./ScoreBarProgress.js";
const ScoreBar = (props) => {
    const { variant, value, labelStart, labelEnd, ariaLabel, className, attributes, mixin, } = props;
    const id = useId();
    const labelId = labelStart ? `${id}-label` : undefined;
    const labeledBy = labelId ? `${id} ${labelId}` : `${id}`;
    return (React.createElement(Stack, { gap: 1, direction: "column", className: className, attributes: attributes, mixin: mixin },
        labelStart && labelEnd && (React.createElement(Stack, { alignItems: "end", justifyContent: "space-between", direction: "row", gap: 2, wrap: "nowrap" },
            React.createElement(Stack.Item, { shrink: true },
                React.createElement(Text, { variant: "emphasized_2", attributes: { id } }, labelStart)),
            React.createElement(Stack.Item, { shrink: true },
                React.createElement(Text, { variant: "emphasized_2", align: "end", attributes: { id: labelId } }, labelEnd)))),
        React.createElement(ScoreBarProgress, { value: value, role: "meter", color: variant, min: 0, max: 1, attributes: {
                "aria-label": ariaLabel,
                "aria-labelledby": labeledBy,
            } })));
};
export default ScoreBar;
