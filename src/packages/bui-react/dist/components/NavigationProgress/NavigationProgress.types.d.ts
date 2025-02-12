import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { StackProps } from "../Stack";
export type Item = {
    title: string;
    content?: React.ReactNode;
    status?: "current" | "next";
    titleTagName?: keyof JSX.IntrinsicElements;
    className?: string;
    attributes?: G.Attributes<"li">;
};
export type ItemProps = Item & {
    variant: Props["variant"];
    step: number;
    total: number;
};
export type Props = {
    items: Item[];
    className?: string;
    attributes?: G.Attributes<"ol">;
    mixin?: Mixin<{
        height: false;
    }, StackProps["mixin"]>;
} & ({
    variant: "vertical";
    renderMobileProgress?: never;
    showLabel?: never;
} | {
    variant?: "horizontal";
    renderMobileProgress: (step: number, total: number) => React.ReactNode;
    showLabel?: boolean;
});
