import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import Keys from "@bookingcom/bui-core/constants/keys";
import type * as T from "./Actionable.types";
import styles from "@bookingcom/bui-core/css/Actionable.module.css";

const Actionable = (props: T.Props, ref: T.Ref) => {
  const {
    children,
    className,
    insetFocus,
    attributes,
    tagName,
    preventDefault,
    onClick,
    mixin,
    wide,
  } = props;

  const rootClassNames = classNames(
    styles.root,
    className,
    insetFocus && styles["focus-inset"],
    mixinClassNames(mixin),
    responsiveClassNames(styles, "root--wide", wide)
  );
  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const href = props.href || attributes?.href;
  const type = props.type || attributes?.type;
  const disabled = props.disabled || attributes?.disabled;
  const clickHandler = onClick || (attributes?.onClick as T.Props["onClick"]);
  const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
  const isLink = Boolean(href || attributes?.href);
  const isButton = Boolean(clickHandler || hasFocusHandler || type);
  let TagName: any;

  if (isLink) {
    rootAttributes.href = href;
    TagName = "a";
  } else if (isButton && (!tagName || tagName === "button")) {
    TagName = "button";
    rootAttributes.type = type || "button";
  } else if (isButton) {
    const isFocusable = tagName === "label";
    const simulateButton = !isFocusable || clickHandler || hasFocusHandler;

    TagName = tagName || "span";
    rootAttributes.role = simulateButton ? "button" : undefined;
    rootAttributes.tabIndex = simulateButton ? 0 : undefined;
  } else {
    TagName = tagName || "span";
  }

  const handleClick: T.Props["onClick"] = (event) => {
    if (preventDefault) event.preventDefault();
    if (onClick && !disabled) onClick(event);
    if (attributes?.onClick && !disabled)
      (attributes?.onClick as T.Props["onClick"])!(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const simulatingButton = rootAttributes.role === "button";

    if (!simulatingButton || isLink) return;

    const key = normalizeKey(event.key);
    if (key !== Keys.SPACE && key !== Keys.ENTER) return;

    event.preventDefault();
    handleClick(event);
  };

  return (
    <TagName
      ref={ref}
      {...rootAttributes}
      disabled={disabled}
      className={rootClassNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </TagName>
  );
};

export default React.forwardRef(Actionable);
