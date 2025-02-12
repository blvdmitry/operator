import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Props = {
  variant?:
    | "display_1"
    | "display_2"
    | "display_3"
    | "featured_1"
    | "featured_2"
    | "featured_3"
    | "headline_1"
    | "headline_2"
    | "headline_3"
    | "strong_1"
    | "strong_2"
    | "emphasized_1"
    | "emphasized_2"
    | "body_1"
    | "body_2"
    | "small_1"
    | "small_2";
  align?: "left" | "center" | "right";
  decoration?: "underline" | "underline-dotted" | "line-through";
  color?:
    | "neutral"
    | "neutral_alt"
    | "action"
    | "constructive"
    | "destructive"
    | "accent"
    | "callout"
    | "white"
    | "disabled"
    | "inherit"
    | "brand_primary"
    | "brand_genius_secondary";
  tagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  attributes?: G.Attributes;
  bidirectional?: boolean;
  mixin?: Mixin<{ height: false }>;
};
