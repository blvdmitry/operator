import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text from "components/Text";
import type * as T from "./Bubble.types";
import styles from "@bookingcom/bui-core/css/Bubble.module.css";

const Bubble = (props: T.Props) => {
  const {
    ariaLabel,
    variant = "neutral",
    text = "",
    maxValue = 99,
    className,
    attributes,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    variant && styles[`root--variant-${variant}`]
  );
  let bubbleText = text;
  if (typeof text === "number") {
    bubbleText = text <= maxValue ? text : `${maxValue}+`;
  }

  return (
    <Text
      attributes={{ ...attributes, "aria-label": ariaLabel }}
      className={rootClassName}
      variant="small_1"
      mixin={mixin}
    >
      {bubbleText}
    </Text>
  );
};

export default Bubble;
