import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";
import styles from "@bookingcom/bui-core/css/_base/Flyout.module.css";

const FlyoutArrow: React.FC<T.ArrowProps> = (props) => {
  const { flyout, flyoutArrowElRef } = useFlyoutContext();
  const { position } = flyout;
  const { className, offset, size, background, shadow } = props;

  const arrowClassName = classNames(
    styles.arrow,
    position && styles[`arrow--position-${position}`],
    className
  );

  const arrowStyles = {
    "--bui-flyout-arrow-offset": `var(--bui_spacing_${offset}x)`,
    "--bui-flyout-arrow-size": `${size}px`,
    "--bui-flyout-arrow-background": `var(--bui_color_background_${background})`,
    ...(shadow
      ? {
          "--bui-flyout-arrow-shadow": `var(--bui_shadow_${shadow})`,
        }
      : {}),
  } as React.CSSProperties;

  return (
    <span className={arrowClassName} style={arrowStyles}>
      <span ref={flyoutArrowElRef} />
      <span />
    </span>
  );
};

export default FlyoutArrow;
