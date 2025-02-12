import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";
import type { BoxProps } from "components/Box";

export type Props = {
  variant?:
    | "neutral"
    | "elevated"
    | "success"
    | "error"
    | "callout"
    | "accent"
    | "hint";
  attributes?: G.Attributes;
  fill?: boolean;
  className?: string;
  children?: React.ReactNode;
  bleed?: boolean;
  tagName?: keyof JSX.IntrinsicElements;
  mixin?: Mixin<{ margin: false }, BoxProps["mixin"]>;
};
