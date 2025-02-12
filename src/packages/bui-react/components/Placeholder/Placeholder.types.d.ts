import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
export type Props = {
    width?: number | string;
    height?: number | string;
    children?: React.ReactNode;
    mixin?: Mixin<{
        width: false;
        height: false;
    }>;
};
