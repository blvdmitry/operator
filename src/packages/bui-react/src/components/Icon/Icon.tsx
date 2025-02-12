import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Icon.types";
import styles from "@bookingcom/bui-core/css/Icon.module.css";

const Icon = (props: T.Props) => {
  const {
    svg: Component,
    className,
    size = "small",
    display,
    color,
    attributes,
    ariaLabel,
    mixin,
  } = props;

  const rootClassName = classNames(
    styles.root,
    className,
    display && styles[`root--display-${display}`],
    responsiveClassNames(styles, "root--size", size),
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

  const icon = typeof Component === "object" ? Component : <Component />;
  const role = ariaLabel ? "img" : undefined;

  return (
    <span
      {...rootAttributes}
      role={role}
      className={rootClassName}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel ? "true" : undefined}
    >
      {icon}
    </span>
  );
};

export default Icon;
