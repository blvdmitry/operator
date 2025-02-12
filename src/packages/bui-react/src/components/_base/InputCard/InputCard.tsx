import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box from "components/Box";
import Card from "components/Card";
import Divider from "components/Divider";
import Stack from "components/Stack";
import HiddenVisually from "components/HiddenVisually";
import useId from "hooks/useId";
import type * as T from "./InputCard.types";
import styles from "@bookingcom/bui-core/css/_base/InputCard.module.css";

const InputCard = (props: T.Props) => {
  const {
    error,
    className,
    disabled,
    attributes,
    checked,
    inputElementVerticalAlignment = "top",
    elevated,
    additionalContent,
    input,
    showInputElement = true,
    children,
    mixin,
  } = props;

  const id = useId(props.id);
  const rootClassName = classNames(
    styles.root,
    elevated && styles["root--elevated"],
    checked && styles["root--checked"],
    !disabled && !!error && styles["root--error"],
    disabled && styles["root--disabled"],
    className
  );

  return (
    <Card
      fill
      tagName="label"
      variant={elevated ? "elevated" : "neutral"}
      className={rootClassName}
      attributes={{
        ...attributes,
        htmlFor: id,
      }}
      mixin={mixin}
    >
      <Box>
        <Stack
          direction="row"
          gap={showInputElement ? 4 : 0}
          alignItems={
            inputElementVerticalAlignment === "top" ? "start" : "center"
          }
        >
          {showInputElement ? (
            input({ id })
          ) : (
            <HiddenVisually>
              {({ className }) => input({ id, className })}
            </HiddenVisually>
          )}
          <Stack.Item grow>{children}</Stack.Item>
        </Stack>
      </Box>
      {additionalContent && (
        <>
          <Divider />
          <Box>{additionalContent}</Box>
        </>
      )}
    </Card>
  );
};

export default InputCard;
