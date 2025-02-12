import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import Icon from "components/Icon";
import Text from "components/Text";
import Actionable from "components/Actionable";
import type * as T from "./Badge.types";
import styles from "@bookingcom/bui-core/css/Badge.module.css";

const Badge = (props: T.Props) => {
  const {
    variant,
    alternative,
    text,
    icon,
    ariaLabel,
    className,
    attributes,
    onAfterClose,
    closeAriaLabel,
    shown,
    children,
    mixin,
  } = props;
  const [shownState, setShown] = React.useState(true);
  const rootClassName = classNames(
    styles.root,
    className,
    alternative && styles["root--alt"],
    variant && styles[`root--variant-${variant}`],
    icon && !text && !children && styles["root--icon-only"]
  );
  const isControlled = typeof shown === "boolean";
  const shouldRender = isControlled ? shown : shownState;

  if (!shouldRender) return null;

  const handleClose = () => {
    if (!isControlled) setShown(false);
    if (onAfterClose) onAfterClose();
  };

  return (
    <Text
      variant="small_1"
      tagName="span"
      className={rootClassName}
      attributes={{
        ...attributes,
        "aria-label": ariaLabel,
        role:
          ariaLabel && icon && !text && !children ? "img" : attributes?.role,
      }}
      mixin={mixin}
    >
      {icon && <Icon svg={icon} size="smaller" />}
      {(text || children) && (
        <span className={styles.text}>{text || children}</span>
      )}

      {onAfterClose && closeAriaLabel && (
        <Actionable
          onClick={handleClose}
          className={styles["close-icon"]}
          attributes={{ "aria-label": closeAriaLabel }}
        >
          <Icon svg={CloseIcon} size="smallest" />
        </Actionable>
      )}
    </Text>
  );
};

export default Badge;
