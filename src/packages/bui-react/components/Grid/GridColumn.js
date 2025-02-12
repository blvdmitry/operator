import React from "react";
import styles from "@bookingcom/bui-core/css/Grid.module.css";
import { classNames, responsiveClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import Stack from "../Stack/index.js";
const GridColumn = (props) => {
    const { size = 12, offset, align, children, className, tagName, attributes, } = props;
    const rootClassName = classNames(className, styles.column, responsiveClassNames(styles, "column--size", size), responsiveClassNames(styles, "column--offset", offset));
    return (React.createElement(Stack.Item, { tagName: tagName, attributes: attributes, className: rootClassName, alignSelf: align }, children));
};
export default GridColumn;
