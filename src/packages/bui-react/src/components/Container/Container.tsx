import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Container.types";
import styles from "@bookingcom/bui-core/css/Container.module.css";

const Container = (props: T.Props) => {
  const { centered, children, className, attributes, mixin } = props;
  const rootClassName = classNames(
    styles.root,
    centered && styles["root--centered"],
    className,
    mixinClassNames(mixin)
  );

  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  return (
    <div {...rootAttributes} className={rootClassName}>
      {children}
    </div>
  );
};

export default Container;
