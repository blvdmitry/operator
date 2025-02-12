import React from "react";
import ReactDOM from "react-dom";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { useFlyoutContext } from "./Flyout.context";
import type * as T from "./Flyout.types";
import styles from "@bookingcom/bui-core/css/_base/Flyout.module.css";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";

const FlyoutContent: React.FC<T.ContentProps> = (props) => {
  const { children, arrowSlot, className, attributes } = props;
  const [mounted, setMounted] = React.useState(false);
  const {
    flyout,
    id,
    flyoutElRef,
    handleTransitionEnd,
    handleMouseEnter,
    handleMouseLeave,
    contentClassName,
    contentAttributes,
    flyoutContainerRef,
    follow,
    disableAnimation,
  } = useFlyoutContext();
  const { styles: positionStyles, active, visible, position } = flyout;

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!active) return null;

  const contentClassNames = classNames(
    styles.content,
    visible && styles["content--visible"],
    position && styles[`content--position-${position}`],
    follow && styles["content--follow"],
    disableAnimation === true && styles["content--disable-animation"]
  );
  // className is applied to inner element because it has the transform and is treated like a real root element
  const innerClassNames = classNames(styles.inner, className, contentClassName);
  const content = (
    <div
      className={contentClassNames}
      style={positionStyles}
      ref={flyoutElRef}
      id={id}
      onTransitionEnd={handleTransitionEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div {...contentAttributes} {...attributes} className={innerClassNames}>
        {typeof children === "function"
          ? (children as T.ContentRenderProps)({ position })
          : children}
      </div>
      {arrowSlot}
    </div>
  );

  return (
    mounted &&
    ReactDOM.createPortal(content, flyoutContainerRef?.current || document.body)
  );
};

export default FlyoutContent;
