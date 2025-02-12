import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Button from "components/Button";
import Stack from "components/Stack";
import type * as T from "./ActionBar.types";
import styles from "@bookingcom/bui-core/css/ActionBar.module.css";

const ActionBar = (props: T.Props) => {
  const {
    children,
    topContent,
    topContentFill = false,
    button,
    fillEqually,
    size = "medium",
    elevated = false,
    className,
    attributes,
    verticalAlignment = "center",
    mixin,
  } = props;

  const shouldButtonContainerGrow = !children || fillEqually;
  const rootClassName = classNames(
    styles.root,
    className,
    mixinClassNames(mixin)
  );
  const containerClassName = classNames(
    styles.container,
    responsiveClassNames(styles, "container--size", size),
    responsiveClassNames(styles, "container--elevated", elevated)
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
      <Stack direction="column" gap={2} className={containerClassName}>
        {topContent && (
          <Stack.Item
            grow
            className={classNames(
              styles["top-content"],
              topContentFill ? styles["top-content--fill"] : null
            )}
          >
            {topContent}
          </Stack.Item>
        )}
        <Stack
          direction="row"
          alignItems={verticalAlignment}
          gap={2}
          className={styles.content}
        >
          {children && <Stack.Item grow>{children}</Stack.Item>}
          <Stack.Item grow={shouldButtonContainerGrow}>
            {button && <Button {...button} wide />}
          </Stack.Item>
        </Stack>
      </Stack>
    </div>
  );
};

export default ActionBar;
