import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as TBubble from "../Bubble/Bubble.types";
import type * as G from "../../types/global";
export type Props = {
    value: TBubble.Props["text"] | boolean;
    variant?: TBubble.Props["variant"];
    ariaLabel?: string;
    children: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        padding: false;
    }>;
};
