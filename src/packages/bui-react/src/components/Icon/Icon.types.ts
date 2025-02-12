import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Size =
  | "smallest"
  | "smaller"
  | "small"
  | "medium"
  | "large"
  | "larger"
  | "largest";
export type Color =
  | "destructive"
  | "callout"
  | "accent"
  | "constructive"
  | "neutral"
  | "neutral_alt"
  | "white"
  | "action"
  | "brand_genius_secondary"
  | "disabled";
export type SVG = React.ReactElement | React.ComponentType;

export type Props = {
  svg: SVG;
  size?: Responsive<Size>;
  color?: Color;
  display?: "block";
  ariaLabel?: string;
  className?: string;
  attributes?: G.Attributes<"span">;
  mixin?: Mixin<{ padding: false; width: false; height: false }>;
};
