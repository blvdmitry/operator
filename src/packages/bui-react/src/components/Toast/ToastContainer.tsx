import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import {
  nextFrame,
  isKeyboardMode,
} from "@bookingcom/bui-core/utilities/helpers";
import { trapFocus } from "@bookingcom/bui-core/utilities/a11y";
import Keys from "@bookingcom/bui-core/constants/keys";
import Toast from "components/Toast";
import type { ActionableProps } from "components/Actionable";
import useKeyboardCallback from "hooks/useKeyboardCallback";
import type * as T from "./Toast.types";
import styles from "@bookingcom/bui-core/css/Toast.module.css";

const TIMEOUT_MAP = {
  short: 4000,
  long: 8000,
};

const ToastContainer = (props: T.ContainerProps) => {
  const { timeout = "short", toast, id, active, onRemove, attributes } = props;
  const timeoutInMs =
    typeof timeout === "string"
      ? TIMEOUT_MAP[timeout]
      : timeout || TIMEOUT_MAP.short;
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [status, setStatus] = React.useState("entering");
  const toastRef = React.useRef<HTMLDivElement>(null);
  const releaseFocusRef = React.useRef<ReturnType<typeof trapFocus>>(null);
  const rootClassName = classNames(
    styles.container,
    (status === "entering" || status === "entered") &&
      styles["root--enter-settings"],
    status === "entering" && styles["root--enter-from"],
    (status === "exiting" || status === "exited") &&
      styles["root--exit-settings"],
    status === "exited" && styles["root--exit-to"],
    toast.className
  );

  const stopTimer = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const hide = React.useCallback(() => {
    stopTimer();
    setStatus("exiting");
  }, [stopTimer]);

  const startTimer = React.useCallback(() => {
    timerRef.current = setTimeout(hide, timeoutInMs);
  }, [hide, timeoutInMs]);

  const handleActionClick: ActionableProps["onClick"] = (e) => {
    hide();
    toast.action?.onClick?.(e);
  };

  const handleMouseEnter = () => {
    if (status === "entered") stopTimer();
  };

  const handleMouseLeave = () => {
    if (status === "entered") startTimer();
  };

  const handleTransitionEnd = () => {
    if (status === "exited" || !active) onRemove(id);
  };

  useKeyboardCallback(Keys.ESCAPE, () => {
    hide();
  });

  React.useEffect(() => {
    if (status === "exiting") {
      if (releaseFocusRef.current) releaseFocusRef.current();
      nextFrame(() => setStatus("exited"));
    }
  }, [status, hide]);

  React.useEffect(() => {
    if (toastRef.current && isKeyboardMode()) {
      releaseFocusRef.current = trapFocus(toastRef.current, {
        trapMode: "soft",
        onNavigateOutside: () => hide(),
      });
    }

    nextFrame(() => setStatus("entered"));

    // Don't auto-dismiss toast if focus is trapped
    if (!releaseFocusRef.current) startTimer();
  }, [startTimer, hide]);

  return (
    <Toast
      {...toast}
      action={
        toast.action && {
          ...toast.action,
          onClick: handleActionClick,
        }
      }
      className={rootClassName}
      attributes={{
        ...attributes,
        ...toast.attributes,
        ref: toastRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTransitionEnd: handleTransitionEnd,
      }}
    />
  );
};

export default ToastContainer;
