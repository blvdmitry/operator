import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { ResponsiveStyles } from "@bookingcom/bui-core/utilities/styles/responsiveStyles";
export type Props = {
    hidden?: boolean;
    children: React.ReactNode | ((props: {
        className: string;
        style: ResponsiveStyles;
    }) => void);
    mixin?: Mixin;
};
