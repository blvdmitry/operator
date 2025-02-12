import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Text.types";
import styles from "@bookingcom/bui-core/css/Text.module.css";

const Text = (props: T.Props) => {
  const {
    tagName,
    variant = "body_2",
    align,
    decoration,
    children,
    className,
    attributes,
    color,
    bidirectional,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles[`root--variant-${variant}`],
    color && styles[`root--color-${color}`],
    align && styles[`root--text-align-${align}`],
    decoration && styles[`root--text-decoration-${decoration}`],
    className,
    mixinClassNames(mixin)
  );
  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const TagName: any = decoration === "line-through" ? "s" : tagName || "div";

  return (
    <TagName {...rootAttributes} className={rootClassName}>
      {bidirectional ? <bdi>{children}</bdi> : children}
    </TagName>
  );
};

export default Text;
