import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Bubble from "components/Bubble";
import type * as T from "./BubbleContainer.types";
import styles from "@bookingcom/bui-core/css/BubbleContainer.module.css";

const BubbleContainer = (props: T.Props) => {
  const {
    children,
    value,
    variant = "destructive",
    ariaLabel,
    className,
    attributes,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  // true shows an empty bubble
  const bubbleValue = typeof value === "boolean" ? undefined : value;
  const showBubble =
    value === true || typeof value === "string" || typeof value === "number";

  return (
    <div {...rootAttributes} className={rootClassName}>
      {children}

      {showBubble && (
        <Bubble
          variant={variant}
          text={bubbleValue}
          className={styles.value}
          ariaLabel={ariaLabel}
        />
      )}
    </div>
  );
};

export default BubbleContainer;
