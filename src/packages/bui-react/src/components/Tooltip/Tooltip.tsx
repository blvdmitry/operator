import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "hooks/useId";
import Flyout from "components/_base/Flyout";
import type * as T from "./Tooltip.types";
import styles from "@bookingcom/bui-core/css/Tooltip.module.css";

const Tooltip = (props: T.Props) => {
  const {
    children,
    text,
    hideArrow,
    follow,
    zIndex,
    attributes,
    className,
    onOpen,
    onClose,
    position = "top",
    containerRef,
    active,
    defaultActive,
    triggerDisplay,
    disableAnimation,
  } = props;
  const visibilityProps = active !== undefined ? { active } : { defaultActive };
  const id = useId();
  const contentClassName = classNames(styles.root);
  const arrowClassName = classNames(
    styles.arrow,
    (hideArrow || follow) && styles["arrow--hide"]
  );

  return (
    <Flyout
      id={id}
      position={position}
      onOpen={onOpen}
      onClose={onClose}
      triggerType="hover"
      zIndex={zIndex}
      contentClassName={contentClassName}
      follow={follow}
      timeout="long"
      containerRef={containerRef}
      disableAnimation={disableAnimation}
      {...visibilityProps}
    >
      <Flyout.Trigger display={triggerDisplay}>{children}</Flyout.Trigger>
      <Flyout.Content
        className={className}
        attributes={attributes}
        arrowSlot={
          <Flyout.Arrow
            offset={2}
            size={7}
            background="inverted"
            shadow={100}
            className={arrowClassName}
          />
        }
      >
        {text}
      </Flyout.Content>
    </Flyout>
  );
};

export default Tooltip;
