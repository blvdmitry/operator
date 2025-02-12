import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import type * as T from "./Flyout.types";
import { useFlyoutContext } from "./Flyout.context";
import styles from "@bookingcom/bui-core/css/_base/Flyout.module.css";

const FlyoutTrigger = (props: T.TriggerProps) => {
  const { children, className, display } = props;
  const {
    id,
    flyoutTriggerRef,
    triggerType,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    handleClick,
    flyout,
    focusTrapped,
  } = useFlyoutContext();
  const isFocus = triggerType === "focus";
  const isHover = triggerType === "hover";
  const isClick = triggerType === "click";

  const a11yAttributes = focusTrapped
    ? { "aria-controls": id }
    : { "aria-describedby": id };

  const childrenAttributes: T.TriggerAttributes = {
    ...(flyout.active ? a11yAttributes : {}),
    ...(!isHover
      ? {
          "aria-expanded": flyout.active,
        }
      : {}),
  };

  if (isHover || isFocus) {
    childrenAttributes.onFocus = handleFocus;
    childrenAttributes.onBlur = handleBlur;
  }

  if (isHover) {
    childrenAttributes.onMouseMove = handleMouseMove;
    childrenAttributes.onMouseEnter = handleMouseEnter;
    childrenAttributes.onMouseLeave = handleMouseLeave;
  }

  if (isClick || isFocus) {
    childrenAttributes.onClick = handleClick;
  }

  const rootClassNames = classNames(
    styles.root,
    className,
    display && styles[`root--display-${display}`]
  );

  return (
    <span ref={flyoutTriggerRef} className={rootClassNames}>
      {children(childrenAttributes)}
    </span>
  );
};

export default FlyoutTrigger;
