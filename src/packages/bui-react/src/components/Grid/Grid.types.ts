import React from "react";
import type { StackProps } from "components/Stack";
import type { Responsive } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Props = {
  children?: React.ReactNode;
  align?: StackProps["alignItems"];
  justify?: StackProps["justifyContent"];
  gap?: StackProps["gap"];
  bleed?: boolean;
  reversed?: boolean;
  columns?: Responsive<Exclude<GridSize, "half" | "full">>;
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: StackProps["mixin"];

  /** @deprecated Use gap property instead */
  size?: "medium" | "small";
  /** @deprecated Used for BTUI migration only. Will be removed in v9. */
  sizing?: "equal" | "fit" | "auto";
  /** @deprecated Used for BTUI migration only. Will be removed in v10 :) */
  direction?: "column" | "reverse" | "column-reverse";
};

export type GridSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "half"
  | "full";

export type Offset = GridSize | "auto";

export type ColumnProps = {
  children?: React.ReactNode;
  size?: Responsive<GridSize>;
  align?: "center" | "end";
  offset?: Responsive<Offset>;
  tagName?: keyof JSX.IntrinsicElements;
  className?: string;
  attributes?: G.Attributes<"div">;

  /** @deprecated Use responsive size property syntax instead */
  sizeMedium?: GridSize;
  /** @deprecated Use responsive size property syntax instead */
  sizeLarge?: GridSize;
  /** @deprecated Use responsive offset property syntax instead */
  offsetMedium?: Offset;
  /** @deprecated Use responsive offset property syntax instead */
  offsetLarge?: Offset;
};
