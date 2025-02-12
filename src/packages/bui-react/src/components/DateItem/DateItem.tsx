import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text from "components/Text";
import Actionable from "components/Actionable";
import type * as T from "./DateItem.types";
import styles from "@bookingcom/bui-core/css/DateItem.module.css";

const DateItem = (props: T.Props) => {
  const {
    title,
    subtitle,
    originalTitle,
    label,
    datetime,
    variant,
    onClick,
    href,
    className,
    attributes,
    mixin,
  } = props;

  const rootClassName = classNames(
    styles.root,
    className,
    variant && styles[`root--variant-${variant}`],
    !!(href || onClick) && styles["root--actionable"]
  );

  return (
    <Actionable
      tagName="time"
      className={rootClassName}
      onClick={onClick}
      href={href}
      attributes={{
        ...attributes,
        dateTime: datetime || attributes?.dateTime,
      }}
      mixin={mixin}
    >
      {label && variant === "detailed" && (
        <Text variant="emphasized_2" tagName="h3" className={styles.label}>
          {label}
        </Text>
      )}
      {originalTitle && variant === "detailed" && (
        <Text variant="small_1" decoration="line-through">
          {originalTitle}
        </Text>
      )}
      <Text variant="strong_1" className={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text variant="body_2" color="neutral_alt">
          {subtitle}
        </Text>
      )}
    </Actionable>
  );
};

export default DateItem;
