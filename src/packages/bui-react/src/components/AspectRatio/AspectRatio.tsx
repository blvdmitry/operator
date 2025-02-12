import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import {
  responsiveStyles,
  mixinStyles,
} from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./AspectRatio.types";
import styles from "@bookingcom/bui-core/css/AspectRatio.module.css";

const getAspectRatio = (ratio: string) => {
  const [w, h] = ratio.split(":");
  return +w / +h;
};

const AspectRatio = (props: T.Props) => {
  const {
    children,
    ratio = "1:1",
    className,
    attributes,
    width,
    mixin,
  } = props;
  const rootClassNames = classNames(
    styles.root,
    className,
    mixinClassNames(mixin)
  );
  const rootStyle = {
    ...responsiveStyles(width, "aspect_ratio", "width"),
    ...mixinStyles(mixin),
  };
  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const wrapperStyle = {
    ...responsiveStyles(
      ratio,
      "aspect_ratio",
      "padding-top",
      (value) => `${(1 / getAspectRatio(value as string)) * 100}%`
    ),
  };

  return (
    /* Padding applied to inner element to work correctly inside flex
    elements. Otherwise it will take the full height of the parent flex
    element instead of being a ratio to width */
    <div
      {...rootAttributes}
      style={{ ...((attributes?.style || {}) as object), ...rootStyle }}
      className={rootClassNames}
    >
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default AspectRatio;
