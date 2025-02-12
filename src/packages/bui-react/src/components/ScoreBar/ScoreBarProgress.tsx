import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import type * as T from "./ScoreBarProgress.types";
import styles from "@bookingcom/bui-core/css/ScoreBar.module.css";

const Progress = (props: T.Props) => {
  const {
    value,
    color,
    className,
    minValue = 0,
    maxValue = 100,
    attributes,
  } = props;

  const rootClassName = classNames(
    styles.root,
    color && styles[`root--color-${color}`],
    className
  );

  const role =
    props.role || (attributes?.role as string | undefined) || "progressbar";
  const barWidth = (value * 100) / (maxValue - minValue);

  return (
    <div
      {...attributes}
      className={rootClassName}
      role={role}
      aria-valuenow={value}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-live="polite"
    >
      <span className={styles.value} style={{ width: `${barWidth}%` }} />
    </div>
  );
};

export default Progress;
