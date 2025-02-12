import React from "react";
import type { ViewportKey, ViewportName } from "@bookingcom/bui-core/types";
import Stack from "components/Stack";
import Avatar from "components/Avatar";
import Hidden from "components/Hidden";
import Text, { type TextProps } from "components/Text";
import type * as T from "./AvatarBlock.types";

const titleVariantMap: Record<NonNullable<T.Size>, TextProps["variant"]> = {
  small: "small_1",
  medium: "strong_2",
  large: "strong_1",
};
const breakpointMap: Record<ViewportKey, ViewportName> = {
  s: "small",
  m: "medium",
  l: "large",
  xl: "xlarge",
};

const AvatarBlock = (props: T.Props) => {
  const {
    title,
    subtitle,
    avatar,
    className,
    attributes,
    size = "medium",
    color,
    mixin,
  } = props;

  const renderText = (variant: TextProps["variant"], className?: string) => (
    <Text variant={variant} color={color ?? "neutral"} className={className}>
      {title}
    </Text>
  );

  const renderTexts = () => {
    if (typeof size !== "object") {
      return renderText(titleVariantMap[size]);
    }

    const keys = (["s", "m", "l", "xl"] as Array<keyof typeof size>).filter(
      (viewport) => size[viewport]
    );

    return (
      <>
        {keys.map((sizeKey, index) => (
          <Hidden
            above={
              index + 1 === keys.length ? undefined : breakpointMap[sizeKey]
            }
            below={breakpointMap[sizeKey]}
            key={sizeKey}
          >
            {({ className }) =>
              renderText(titleVariantMap[size[sizeKey]!], className)
            }
          </Hidden>
        ))}
      </>
    );
  };

  return (
    <Stack
      attributes={attributes}
      className={className}
      direction="row"
      alignItems="center"
      gap={2}
      mixin={mixin}
    >
      <Avatar {...avatar} size={size} />

      <Stack.Item grow>
        {renderTexts()}
        {subtitle && (
          <Text variant="small_1" color={color ?? "neutral_alt"}>
            {subtitle}
          </Text>
        )}
      </Stack.Item>
    </Stack>
  );
};

export default AvatarBlock;
