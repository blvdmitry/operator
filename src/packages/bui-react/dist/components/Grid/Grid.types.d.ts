import React from "react";
import type { StackProps } from "../Stack";
import type { Responsive } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
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
};
export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "half" | "full";
export type Offset = GridSize | "auto";
export type ColumnProps = {
    children?: React.ReactNode;
    size?: Responsive<GridSize>;
    align?: "center" | "end";
    offset?: Responsive<Offset>;
    tagName?: keyof JSX.IntrinsicElements;
    className?: string;
    attributes?: G.Attributes<"div">;
};
