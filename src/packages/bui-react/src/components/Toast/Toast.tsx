import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Button, { type ButtonProps } from "components/Button";
import Stack from "components/Stack";
import Text from "components/Text";
import type * as T from "./Toast.types";
import styles from "@bookingcom/bui-core/css/Toast.module.css";

const Toast = (props: T.Props) => {
  const { text, layout = "horizontal", className, attributes, action } = props;
  const rootClassName = classNames(styles.root, className);

  return (
    <div {...attributes} className={rootClassName}>
      <Stack
        direction={layout === "horizontal" ? "row" : "column"}
        alignItems={layout === "horizontal" ? "center" : "start"}
      >
        <Stack.Item grow>
          <Text attributes={{ role: "alert" }}>{text}</Text>
        </Stack.Item>
        {action && (
          <Stack.Item alignSelf={layout === "vertical" ? "end" : undefined}>
            <Button.Aligner
              alignment={["end", "bottom", "top"]}
              className={styles.button}
            >
              <Button
                {...(action as ButtonProps)}
                size="medium"
                variant="tertiary-inherit"
              />
            </Button.Aligner>
          </Stack.Item>
        )}
      </Stack>
    </div>
  );
};

export default Toast;
