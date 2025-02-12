import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "components/Icon";
import Actionable from "components/Actionable";
import type * as T from "./Link.types";
import styles from "@bookingcom/bui-core/css/Link.module.css";

const Link = (props: T.Props) => {
  const {
    text,
    children,
    icon,
    iconProps,
    href,
    variant = "primary",
    className,
    attributes,
    onClick,
    disabled,
    preventDefault,
    iconPosition = "start",
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    styles[`root--variant-${variant}`],
    icon && styles["root--icon"],
    disabled && styles["root--disabled"]
  );

  const renderIcon = (position: T.Props["iconPosition"]) => {
    if (!icon || iconPosition !== position) return null;

    const iconClassName = classNames(
      iconPosition && (!!text || !!children) && styles[`icon--${iconPosition}`]
    );

    return <Icon {...iconProps} className={iconClassName} svg={icon} />;
  };

  return (
    <Actionable
      disabled={disabled}
      href={!disabled ? href : undefined}
      className={rootClassName}
      onClick={onClick}
      attributes={attributes}
      preventDefault={preventDefault}
      mixin={mixin}
    >
      {renderIcon("start")}
      <span className={styles.text}>{text || children}</span>
      {renderIcon("end")}
    </Actionable>
  );
};

export default Link;
