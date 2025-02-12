import React from "react";
import { classNames, responsiveClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import Stack, {} from "../Stack/index.js";
import GridColumn from "./GridColumn.js";
import styles from "@bookingcom/bui-core/css/Grid.module.css";
const Grid = (props) => {
    const { children, className, align, justify = "start", bleed, reversed, gap: passedGap = { s: 4, m: 6 }, tagName, columns = 12, attributes, mixin, } = props;
    const rootClassName = classNames(styles.root, className, responsiveClassNames(styles, "root--columns", columns));
    const gap = bleed ? 0 : passedGap;
    const direction = reversed ? "row-reverse" : "row";
    return (React.createElement(Stack, { tagName: tagName, attributes: attributes, className: rootClassName, justifyContent: justify, alignItems: align, gap: gap, direction: direction, mixin: mixin }, children));
};
Grid.Column = GridColumn;
export default Grid;
