import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Divider.types";
import styles from "@bookingcom/bui-core/css/Divider.module.css";

const Divider = (props: T.Props) => {
  const { className, vertical = false, attributes, mixin } = props;
  const rootClassName = classNames(
    styles.root,
    responsiveClassNames(styles, "root--vertical", vertical),
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

  return <hr {...rootAttributes} className={rootClassName} />;
};

export default Divider;
