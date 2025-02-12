import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import DateItem from "components/DateItem";
import Stack from "components/Stack";
import Divider from "components/Divider";
import type * as T from "./DateRange.types";
import styles from "@bookingcom/bui-core/css/DateRange.module.css";

const DateRange = (props: T.Props) => {
  const { from, to, attributes, className, variant, mixin } = props;
  const rootClassNames = classNames(
    styles.root,
    className,
    variant && styles[`root--variant-${variant}`],
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
    <div {...rootAttributes} className={rootClassNames}>
      <DateItem {...from} variant={variant} className={styles.item} />
      <Stack.Item>
        <Divider vertical />
      </Stack.Item>
      <DateItem {...to} variant={variant} className={styles.item} />
    </div>
  );
};

export default DateRange;
