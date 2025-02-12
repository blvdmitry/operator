import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import Button from "components/Button";
import type * as T from "./Calendar.types";
import { ControlType } from "./Calendar.types";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

const CalendarControl = React.forwardRef<HTMLButtonElement, T.ControlProps>(
  (props, ref) => {
    const { onClick, label, type } = props;

    const isPrevious = type === ControlType.previous;
    const className = isPrevious
      ? classNames(styles.control, styles["control--prev"])
      : classNames(styles.control, styles["control--next"]);
    const icon = isPrevious ? ArrowNavLeftIcon : ArrowNavRightIcon;

    return (
      <Button
        ref={ref}
        className={className}
        variant="tertiary-neutral"
        icon={icon}
        size="large"
        attributes={{
          "aria-label": label,
        }}
        onClick={onClick}
      />
    );
  }
);

export default CalendarControl;
