import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as TButton from "../Button/Button.types";
import type * as G from "../../types/global";
export type Props = {
    title?: React.ReactNode;
    text?: React.ReactNode;
    titleTagName?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    actions?: TButton.Props[];
    variant: "error" | "warning" | "success";
    inline?: Responsive<boolean>;
    bleed?: boolean | 0;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        padding: false;
        margin: false;
    }>;
};
