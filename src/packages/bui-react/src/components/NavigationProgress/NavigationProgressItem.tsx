import React from "react";
import styles from "@bookingcom/bui-core/css/NavigationProgress.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CheckmarkFillIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkFillIcon";
import Text from "components/Text";
import Icon from "components/Icon";
import Hidden from "components/Hidden";
import HiddenVisually from "components/HiddenVisually";
import type * as T from "./NavigationProgress.types";

const NavigationProgressItem = (props: T.ItemProps) => {
  const {
    title,
    content,
    status,
    variant,
    step,
    total,
    className,
    attributes,
  } = props;
  const rootClassName = classNames(
    styles.item,
    status === "current" && styles["item--active"],
    status === "next" && styles["item--disabled"],
    className
  );
  const ariaCurrent = status === "current" && "step";
  const indicator = !status ? <Icon svg={CheckmarkFillIcon} /> : step;

  const titleContent = (
    <Text tagName="strong" variant="strong_2" className={styles.title}>
      <HiddenVisually>{step}:</HiddenVisually>
      {title}
    </Text>
  );

  const label =
    variant === "vertical" ? (
      <div className={styles.header}>
        <Text
          tagName="span"
          variant="strong_2"
          className={styles.indicator}
          attributes={{ "aria-hidden": "true" }}
        >
          {indicator}
        </Text>
        {titleContent}
      </div>
    ) : (
      <>
        <Text
          tagName="span"
          variant="strong_2"
          className={styles.indicator}
          attributes={{ "aria-hidden": "true" }}
        >
          {indicator}
        </Text>
        <Hidden below="medium">{titleContent}</Hidden>
      </>
    );

  const extraContent =
    content && variant === "vertical" && status === "current" ? (
      <div className={styles.content}>{content}</div>
    ) : null;

  const separator = step !== total ? <span className={styles.divider} /> : null;

  return (
    <Text
      color="neutral"
      attributes={{
        ...attributes,
        "aria-current": ariaCurrent,
      }}
      className={rootClassName}
    >
      {label}
      {extraContent}
      {separator}
    </Text>
  );
};

export default NavigationProgressItem;
