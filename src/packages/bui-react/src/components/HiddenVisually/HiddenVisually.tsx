import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import type * as T from "./HiddenVisually.types";
import styles from "@bookingcom/bui-core/css/HiddenVisually.module.css";

const HiddenVisually = (props: T.Props) => {
  const { children, tagName } = props;
  const className = classNames(styles.root);
  const TagName = tagName || "div";

  if (typeof children === "function") return <>{children({ className })}</>;
  return <TagName className={className}>{children}</TagName>;
};

export default HiddenVisually;
