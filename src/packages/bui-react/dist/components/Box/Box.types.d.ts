import React from "react";
import type * as G from "../../types/global";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
export type Props = {
    children?: React.ReactNode;
    padding?: Responsive<number>;
    backgroundColor?: "destructive_alt" | "constructive_alt" | "accent_alt" | "callout_alt" | "action_alt" | "neutral_alt" | "elevation_one" | "elevation_two" | "brand_primary" | "brand_primary_dynamic";
    borderColor?: "action" | "destructive" | "constructive" | "accent" | "callout" | "neutral" | "neutral_alt";
    overflow?: "hidden" | "auto";
    borderRadius?: 100 | 200 | 300 | "circle";
    tagName?: keyof JSX.IntrinsicElements;
    className?: string;
    attributes?: G.Attributes;
    mixin?: Mixin;
};
