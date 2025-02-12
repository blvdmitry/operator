import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import type * as T from "./Hidden.types";
import styles from "@bookingcom/bui-core/css/Hidden.module.css";

const viewportSizeOrder: T.Props["above"][] = [
  "small",
  "medium",
  "large",
  "xlarge",
];

const Hidden = (props: T.Props) => {
  const { above, below, children } = props;
  const aboveIndex = viewportSizeOrder.indexOf(above);
  const belowIndex = viewportSizeOrder.indexOf(below);
  const isHiddenInSmall = belowIndex !== -1 && belowIndex > 0;
  const isHiddenInMedium =
    (belowIndex !== -1 && belowIndex > 1) ||
    (aboveIndex !== -1 && aboveIndex < 1);
  const isHiddenInLarge =
    (belowIndex !== -1 && belowIndex > 2) ||
    (aboveIndex !== -1 && aboveIndex < 2);
  const isHiddenInXLarge = aboveIndex !== -1 && aboveIndex < 3;

  const className = classNames(
    isHiddenInSmall
      ? styles["root--hidden--small"]
      : styles["root--visible--small"],
    isHiddenInMedium
      ? styles["root--hidden--medium"]
      : styles["root--visible--medium"],
    isHiddenInLarge
      ? styles["root--hidden--large"]
      : styles["root--visible--large"],
    isHiddenInXLarge
      ? styles["root--hidden--xlarge"]
      : styles["root--visible--xlarge"]
  );

  if (typeof children === "function") return <>{children({ className })}</>;
  return <div className={className}>{children}</div>;
};

export default Hidden;
