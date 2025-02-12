import React from "react";
import styles from "@bookingcom/bui-core/css/SliderContainer.module.css";
import type * as T from "./SliderContainer.types";

const SliderContainerItem = (props: T.ItemProps) => {
  const { src, children } = props;

  return (
    <div
      className={styles.content}
      style={src ? { backgroundImage: `url(${src})` } : undefined}
    >
      {children}
    </div>
  );
};

export default SliderContainerItem;
