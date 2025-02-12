import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Stack from "components/Stack";
import Icon from "components/Icon";
import Button from "components/Button";
import Text from "components/Text";
import type * as T from "./EmptyState.types";
import styles from "@bookingcom/bui-core/css/EmptyState.module.css";

const EmptyState = (props: T.Props) => {
  const {
    icon,
    title,
    text,
    button,
    link,
    topIllustration,
    startIllustration,
    className,
    attributes,
    mixin,
  } = props;
  const topSlot = topIllustration;
  const horizontal = !!startIllustration;
  const rootClassName = classNames(
    styles.root,
    className,
    horizontal && styles["root--horizontal"],
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  return (
    <div {...rootAttributes} className={rootClassName}>
      {startIllustration && (
        <div className={styles.startSlot}>{startIllustration}</div>
      )}

      <Stack gap={6} alignItems="center" className={styles.content}>
        {icon && <Icon svg={icon} size="largest" className={styles.icon} />}
        {topSlot && <div className={styles.slot}>{topSlot}</div>}

        <Stack.Item>
          {title && (
            <Text className={styles.title} tagName="h3" variant="headline_2">
              {title}
            </Text>
          )}
          <Text className={styles.text} tagName="p" variant="body_1">
            {text}
          </Text>
        </Stack.Item>

        <div className={styles.actions}>
          {button && (
            <Button {...button} size="large" wide={false} variant="primary" />
          )}
          {link && (
            <Button
              {...link}
              size="large"
              wide={false}
              variant="tertiary"
              className={styles.link}
            />
          )}
        </div>
      </Stack>
    </div>
  );
};

export default EmptyState;
