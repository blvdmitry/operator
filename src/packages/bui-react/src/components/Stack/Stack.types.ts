import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type AlignItems = "start" | "end" | "center" | "stretch" | "baseline";
export type AlignSelf = "start" | "center" | "end";
export type JustifyContent = "start" | "center" | "end" | "space-between";
export type Wrap = "wrap" | "nowrap" | "wrap-reverse";
export type Direction = "column" | "column-reverse" | "row" | "row-reverse";

export type ItemProps = {
  children?: React.ReactNode;
  tagName?: keyof JSX.IntrinsicElements;
  grow?: boolean;
  shrink?: boolean;
  split?: boolean;
  alignSelf?: AlignSelf;
  className?: string;
  attributes?: G.Attributes;
};

export type Props = {
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  attributes?: G.Attributes;
  children?: React.ReactNode;
  direction?: Responsive<Direction>;
  gap?: Responsive<number>;
  alignItems?: Responsive<AlignItems>;
  justifyContent?: Responsive<JustifyContent>;
  wrap?: Responsive<Wrap>;
  grow?: Responsive<boolean>;
  alignSelf?: Responsive<AlignSelf>;
  split?: boolean;
  mixin?: Mixin;
  divided?: boolean;
};
