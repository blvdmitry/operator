import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Spinner.types";
import styles from "@bookingcom/bui-core/css/Spinner.module.css";

const Spinner = (props: T.Props) => {
  const {
    size = "medium",
    color = "action",
    className,
    attributes,
    mixin,
  } = props;
  const rootClassNames = classNames(
    styles.root,
    className,
    responsiveClassNames(styles, "root--size", size),
    styles[`root--color-${color}`],
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const ariaLabel =
    props.ariaLabel || (attributes?.["aria-label"] as string | undefined);

  return (
    <div
      {...rootAttributes}
      className={rootClassNames}
      role="progressbar"
      aria-live={ariaLabel ? "polite" : undefined}
      aria-label={ariaLabel}
    >
      <div className={styles.inner} />
    </div>
  );
};

export default Spinner;
