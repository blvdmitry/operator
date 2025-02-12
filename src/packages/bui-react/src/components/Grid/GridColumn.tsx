import React from "react";
import styles from "@bookingcom/bui-core/css/Grid.module.css";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import type { Responsive } from "@bookingcom/bui-core/types";
import Stack from "components/Stack";
import type * as T from "./Grid.types";

const GridColumn = (props: T.ColumnProps) => {
  const {
    size: passedSize = 12,
    sizeMedium,
    sizeLarge,
    offset: passedOffset,
    offsetMedium,
    offsetLarge,
    align,
    children,
    className,
    tagName,
    attributes,
  } = props;

  const responsiveOffset: Responsive<T.Offset> | undefined =
    typeof passedOffset === "object" || passedOffset === undefined
      ? passedOffset
      : { s: passedOffset };

  if (responsiveOffset && offsetMedium) responsiveOffset.m = offsetMedium;
  if (responsiveOffset && offsetLarge) responsiveOffset.l = offsetLarge;

  const responsiveSize: Responsive<T.GridSize> | undefined =
    typeof passedSize === "object" || passedSize === undefined
      ? passedSize
      : { s: passedSize };

  if (responsiveSize && sizeMedium) responsiveSize.m = sizeMedium;
  if (responsiveSize && sizeLarge) responsiveSize.l = sizeLarge;

  const rootClassName = classNames(
    className,
    styles.column,
    responsiveClassNames(styles, "column--size", responsiveSize),
    responsiveClassNames(styles, "column--offset", responsiveOffset)
  );

  return (
    <Stack.Item
      tagName={tagName}
      attributes={attributes}
      className={rootClassName}
      alignSelf={align}
    >
      {children}
    </Stack.Item>
  );
};

export default GridColumn;
