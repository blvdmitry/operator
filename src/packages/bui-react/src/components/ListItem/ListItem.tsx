import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "components/Icon";
import Stack from "components/Stack";
import Actionable from "components/Actionable";
import type * as T from "./ListItem.types";
import styles from "@bookingcom/bui-core/css/ListItem.module.css";

const spacingMap = {
  small: 2,
  medium: 3,
  large: 4,
} as const;

const ListItem = (props: T.Props) => {
  const {
    icon,
    startSlot,
    children,
    endSlot,
    spacing = "medium",
    edgeSpacing = false,
    verticalAlignment = "center",
    href,
    disabled,
    active,
    roundedCorners,
    onClick,
    preventDefault,
    className,
    attributes,
    mixin,
  } = props;
  const isInteractive = !!(
    onClick ||
    href ||
    attributes?.type ||
    attributes?.onClick ||
    attributes?.href
  );
  const isRoundedCorners = roundedCorners;
  const rootClassName = classNames(
    styles.root,
    styles[`root--spacing-${spacing}`],
    isRoundedCorners && styles["root--roundedCorners"],
    isInteractive && styles["root--interactive"],
    edgeSpacing && styles["root--edge-spacing"],
    active && isInteractive && styles["root--active"],
    className
  );

  return (
    <Actionable
      onClick={onClick}
      preventDefault={preventDefault}
      className={rootClassName}
      disabled={disabled}
      href={href}
      attributes={attributes}
      mixin={mixin}
    >
      <Stack
        direction="row"
        alignItems={verticalAlignment}
        gap={spacingMap[spacing]}
      >
        {(icon || startSlot) && (
          <Stack.Item>
            {icon ? (
              <Icon
                display="block"
                svg={icon}
                size={spacing === "large" ? "medium" : "small"}
                color={disabled && !active ? "neutral_alt" : undefined}
              />
            ) : (
              startSlot
            )}
          </Stack.Item>
        )}
        <Stack.Item grow className={styles.content}>
          {children}
        </Stack.Item>
        {endSlot && <Stack.Item>{endSlot}</Stack.Item>}
      </Stack>
    </Actionable>
  );
};

export default ListItem;
