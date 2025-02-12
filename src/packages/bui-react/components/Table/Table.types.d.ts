import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
export type Props = {
    stickyHeader?: boolean;
    borderless?: boolean;
    compact?: boolean;
    children: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"table">;
    mixin?: Mixin<{
        height: false;
    }>;
};
type WithCollapsed = {
    collapsedContent: React.ReactNode;
    expandToggleAriaLabel: string;
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandToggle?: (args: {
        expanded: boolean;
    }) => void;
};
type WithoutCollapsed = Partial<Record<keyof WithCollapsed, never>>;
export type RowProps = {
    active?: boolean;
    verticalAlign?: "top" | "center";
    onClick?: () => void;
    children: React.ReactNode;
    attributes?: G.Attributes<"tr">;
} & (WithCollapsed | WithoutCollapsed);
export type BodyProps = {
    children: React.ReactNode;
};
export type HeadProps = {
    children: React.ReactNode;
};
export type CellProps = {
    align?: "start" | "center" | "end";
    rowSpan?: number;
    colSpan?: number;
    width?: "auto" | `${number}px` | `${number}%`;
    children?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"td">;
    mixin?: Mixin<{
        width: false;
    }>;
};
export type HeadingProps = CellProps & {
    attributes?: G.Attributes<"td">;
};
export type PrivateCellProps = HeadingProps & {
    tagName: "td" | "th";
};
export type Context = {
    scrollRef: React.RefObject<HTMLDivElement>;
    tableHeadRef: React.RefObject<HTMLTableSectionElement>;
};
export {};
