import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box, { type BoxProps } from "components/Box";
import type * as T from "./Card.types";
import styles from "@bookingcom/bui-core/css/Card.module.css";

const Card = (props: T.Props) => {
  const {
    variant = "neutral",
    attributes,
    fill,
    bleed,
    tagName = "div",
    className,
    children,
    mixin,
  } = props;
  const rootClassName = classNames(
    bleed && globalStyles["bui-u-bleed--small"],
    variant === "elevated" && styles["root--elevated"],
    className
  );

  const colorMap: Record<
    NonNullable<T.Props["variant"]>,
    {
      borderColor: BoxProps["borderColor"];
      backgroundColor: BoxProps["backgroundColor"];
    }
  > = {
    neutral: {
      borderColor: "neutral_alt",
      backgroundColor: "elevation_one",
    },
    elevated: {
      borderColor: "neutral_alt",
      backgroundColor: "elevation_two",
    },
    success: {
      borderColor: "constructive",
      backgroundColor: "constructive_alt",
    },
    error: {
      borderColor: "destructive",
      backgroundColor: "destructive_alt",
    },
    callout: {
      borderColor: "callout",
      backgroundColor: "callout_alt",
    },
    accent: {
      borderColor: "accent",
      backgroundColor: "accent_alt",
    },
    hint: {
      borderColor: "neutral",
      backgroundColor: "neutral_alt",
    },
  };

  return (
    <Box
      tagName={tagName}
      className={rootClassName}
      attributes={attributes}
      borderColor={colorMap[variant].borderColor}
      backgroundColor={colorMap[variant].backgroundColor}
      borderRadius={200}
      overflow="hidden"
      padding={fill ? 0 : 4}
      mixin={mixin}
    >
      {children}
    </Box>
  );
};

export default Card;
