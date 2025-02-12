import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { useTabContext } from "./Tab.context.js";
import styles from "@bookingcom/bui-core/css/Tab.module.css";
const TabPanel = (props) => {
    const { id, children, keepMounted, mixin, className, attributes } = props;
    const { activeTabId } = useTabContext();
    const isActive = id === activeTabId;
    const rootClassName = classNames(styles["item-panel"], isActive && styles["item-panel--active"], mixinClassNames(mixin), className);
    return (React.createElement("div", { ...attributes, role: "tabpanel", id: id, "aria-labelledby": `${id}-tab-trigger`, className: rootClassName, style: mixinStyles(mixin) }, isActive || keepMounted ? children : null));
};
export default TabPanel;
