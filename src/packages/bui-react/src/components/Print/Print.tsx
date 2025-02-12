import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Print.types";
import styles from "@bookingcom/bui-core/css/Print.module.css";

const Print = (props: T.Props) => {
  const { hidden, children, mixin } = props;
  const className = classNames(
    styles.root,
    hidden && styles["root--hidden"],
    mixinClassNames(mixin)
  );
  const rootStyles = mixinStyles(mixin);

  if (typeof children === "function")
    return <>{children({ className, style: rootStyles })}</>;
  return (
    <div className={className} style={rootStyles}>
      {children}
    </div>
  );
};

export default Print;
