import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as TActionable from "../Actionable/Actionable.types";
import type * as G from "../../types/global";
export type Props = Pick<TActionable.Props, "onClick" | "href"> & {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    label?: React.ReactNode;
    originalTitle?: React.ReactNode;
    variant?: "detailed" | "simplified";
    datetime?: string;
    className?: string;
    attributes?: G.Attributes<"time">;
    mixin?: Mixin<{
        height: false;
    }, TActionable.Props["mixin"]>;
};
