import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { useTabContext } from "./Tab.context";
import type * as T from "./Tab.types";
import styles from "@bookingcom/bui-core/css/Tab.module.css";

const TabPanel = (props: T.Panel) => {
  const { id, children, keepMounted, mixin, className, attributes } = props;
  const { activeTabId } = useTabContext();
  const isActive = id === activeTabId;
  const rootClassName = classNames(
    styles["item-panel"],
    isActive && styles["item-panel--active"],
    mixinClassNames(mixin),
    className
  );

  if (!isActive && !keepMounted) return null;

  return (
    <div
      {...attributes}
      role="tabpanel"
      id={id}
      className={rootClassName}
      style={mixinStyles(mixin)}
    >
      {children}
    </div>
  );
};

export default TabPanel;
