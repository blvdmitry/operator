import React from "react";
import type * as G from "../../types/global";
import type { Mixin } from "@bookingcom/bui-core/types";
export type Props = {
    children: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        margin: false;
        width: false;
    }>;
};
