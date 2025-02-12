import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Text, { type TextProps } from "components/Text";
import type * as T from "./Title.types";
import styles from "@bookingcom/bui-core/css/Title.module.css";

const subtitleVariantMap: Record<
  Required<T.Props>["variant"],
  Required<TextProps>["variant"]
> = {
  strong_1: "body_2",
  strong_2: "small_1",
  headline_3: "body_1",
  headline_2: "body_1",
  headline_1: "body_1",
  display_3: "featured_2",
};

const Title = (props: T.Props) => {
  const {
    reversed,
    title,
    subtitle,
    className,
    attributes,
    titleAttributes,
    subtitleAttributes,
    titleTagName,
    subtitleTagName,
    titleClassName,
    subtitleClassName,
    tagName = "div",
    variant = "strong_2",
    color,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    reversed && styles["root--reversed"],
    variant && styles[`root--variant-${variant}`],
    color && styles[`root--color-${color}`],
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const TagName: any = tagName;
  const subtitleVariant = subtitleVariantMap[variant];
  const subtitleClassNames = classNames(styles.subtitle, subtitleClassName);
  const titleClassNames = classNames(styles.title, titleClassName);

  return (
    <TagName {...rootAttributes} className={rootClassName}>
      {title && (
        <Text
          attributes={titleAttributes}
          className={titleClassNames}
          tagName={titleTagName}
          variant={variant}
          color={color ?? "neutral"}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          attributes={subtitleAttributes}
          tagName={subtitleTagName}
          className={subtitleClassNames}
          variant={subtitleVariant}
          color={color ?? "neutral_alt"}
        >
          {subtitle}
        </Text>
      )}
    </TagName>
  );
};

export default Title;
