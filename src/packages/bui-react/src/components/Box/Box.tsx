import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import {
  responsiveStyles,
  mixinStyles,
} from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Box.types";
import styles from "@bookingcom/bui-core/css/Box.module.css";

const Box = (props: T.Props) => {
  const {
    padding = 4,
    attributes,
    orientation,
    backgroundColor,
    borderColor,
    borderRadius,
    overflow,
    tagName,
    className,
    children,
    mixin,
  } = props;
  const TagName: any = tagName || "div";
  const rootClassName = classNames(
    styles.root,
    orientation && styles[`root--orientation-${orientation}`],
    backgroundColor && styles[`root--background-color-${backgroundColor}`],
    borderColor && styles[`root--border-color-${borderColor}`],
    borderColor && styles[`root--border-width-100`],
    borderRadius && styles[`root--border-radius-${borderRadius}`],
    overflow && styles[`root--overflow-${overflow}`],
    className,
    mixinClassNames(mixin)
  );

  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...responsiveStyles(padding, "box", "padding"),
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  return (
    <TagName {...rootAttributes} className={rootClassName}>
      {children}
    </TagName>
  );
};

export default Box;
