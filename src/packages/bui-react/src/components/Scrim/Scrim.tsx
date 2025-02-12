import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import type * as T from "./Scrim.types";
import styles from "@bookingcom/bui-core/css/Scrim.module.css";

const Scrim = (props: T.Props) => {
  const {
    children,
    backgroundSlot,
    fill,
    position = "full",
    centered,
    attributes,
    className,
    borderRadius,
  } = props;
  const rootClassName = classNames(
    styles.root,
    !!backgroundSlot && styles["root--with-background"],
    fill && styles["root--fill"],
    centered && styles["root--centered"],
    position && styles[`root--position-${position}`],
    borderRadius && styles[`root--border-radius-${borderRadius}`],
    className
  );

  return (
    <div {...attributes} className={rootClassName}>
      {backgroundSlot}
      <div className={styles.scrim}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Scrim;
