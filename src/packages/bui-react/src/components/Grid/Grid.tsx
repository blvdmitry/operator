import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import Stack, { type StackProps } from "components/Stack";
import type * as T from "./Grid.types";
import GridColumn from "./GridColumn";
import styles from "@bookingcom/bui-core/css/Grid.module.css";

const sizeMapping: Record<NonNullable<T.Props["size"]>, T.Props["gap"]> = {
  medium: { s: 4, m: 6 },
  small: 4,
};

const Grid = (props: T.Props) => {
  const {
    children,
    className,
    align,
    justify = "start",
    bleed,
    reversed,
    size = "medium",
    direction: passedDirection,
    sizing,
    gap: passedGap,
    tagName,
    columns = 12,
    attributes,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    size && styles[`root--size-${size}`],
    sizing && styles[`root--sizing-${sizing}`],
    responsiveClassNames(styles, "root--columns", columns)
  );
  const gap = (passedGap || (bleed ? 0 : undefined)) ?? sizeMapping[size];
  const direction: StackProps["direction"] =
    (passedDirection &&
      (passedDirection === "reverse" ? "row-reverse" : passedDirection)) ||
    (reversed ? "row-reverse" : "row");

  return (
    <Stack
      tagName={tagName}
      attributes={attributes}
      className={rootClassName}
      justifyContent={justify}
      alignItems={align}
      gap={gap}
      direction={direction}
      mixin={mixin}
    >
      {children}
    </Stack>
  );
};

Grid.Column = GridColumn;
export default Grid;
