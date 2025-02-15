import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
export type Props = {
    variant?: "display_3" | "headline_1" | "headline_2" | "headline_3" | "strong_1" | "strong_2";
    color?: "inherit";
    align?: "start" | "center" | "end";
    title?: React.ReactNode;
    titleTagName?: any;
    titleClassName?: string;
    titleAttributes?: G.Attributes<"div"> | G.Attributes<"label">;
    subtitle?: React.ReactNode;
    subtitleTagName?: any;
    subtitleClassName?: string;
    subtitleAttributes?: G.Attributes<"div"> | G.Attributes<"label">;
    reversed?: boolean;
    tagName?: keyof JSX.IntrinsicElements;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }>;
};
