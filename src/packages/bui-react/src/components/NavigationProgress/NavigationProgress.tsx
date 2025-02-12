import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import NavigationProgressItem from "./NavigationProgressItem";
import Stack from "../Stack";
import Text from "../Text";
import Hidden from "../Hidden";
import HiddenVisually from "../HiddenVisually";
import type * as T from "./NavigationProgress.types";
import styles from "@bookingcom/bui-core/css/NavigationProgress.module.css";

const NavigationProgress = (props: T.Props) => {
  const {
    variant = "horizontal",
    items,
    showLabel = true,
    className,
    attributes,
    renderMobileProgress,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    styles[`root--variant-${variant}`],
    className
  );

  const currentStepIndex = Math.max(
    0,
    props.items.findIndex((item) => item.status === "current")
  );

  const rootAttributes = {
    ...attributes,
    role: attributes?.role || "group",
  };

  const progressTotal =
    variant === "horizontal" && renderMobileProgress ? (
      <span className={styles.step}>
        {renderMobileProgress(currentStepIndex + 1, items.length)}
      </span>
    ) : null;

  return (
    <Stack
      direction="column"
      gap={0}
      alignItems="stretch"
      className={rootClassName}
      attributes={{ ...rootAttributes }}
      mixin={mixin}
    >
      {!props.variant ||
        (props.variant === "horizontal" && (
          <Hidden above="small">
            <HiddenVisually>
              {items[currentStepIndex].title}.{" "}
              {props.renderMobileProgress(currentStepIndex + 1, items.length)}.
            </HiddenVisually>
          </Hidden>
        ))}
      <Stack
        direction={props.variant === "vertical" ? "column" : "row"}
        alignItems={props.variant === "vertical" ? "start" : "center"}
        gap={0}
        className={styles.items}
      >
        {items.map((item, i) => (
          <NavigationProgressItem
            {...item}
            key={item.title}
            variant={variant}
            step={i + 1}
            total={items.length}
          />
        ))}
      </Stack>
      {variant === "horizontal" && showLabel && (
        <Hidden above="small">
          <Stack className={styles["mobile-progress"]} direction="row">
            <Stack.Item grow>
              <Text
                tagName="strong"
                variant="strong_2"
                attributes={{ "aria-hidden": true }}
              >
                {items[currentStepIndex].title}
              </Text>
            </Stack.Item>
            <Text attributes={{ "aria-hidden": true }}>{progressTotal}</Text>
          </Stack>
        </Hidden>
      )}
    </Stack>
  );
};

export default NavigationProgress;
