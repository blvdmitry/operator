import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { BoxProps } from "../Box";
export type Props = {
    variant?: "neutral" | "elevated" | "success" | "error" | "callout" | "accent" | "highlighted" | "hint";
    attributes?: G.Attributes;
    fill?: boolean;
    className?: string;
    children?: React.ReactNode;
    bleed?: boolean | 0;
    tagName?: keyof JSX.IntrinsicElements;
    mixin?: Mixin<{
        margin: false;
    }, BoxProps["mixin"]>;
};
