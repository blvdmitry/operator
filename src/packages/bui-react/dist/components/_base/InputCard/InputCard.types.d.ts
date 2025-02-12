import React from "react";
import type * as G from "../../../types/global";
import type { CardProps } from "../../Card";
import type { IconSVG } from "../../Icon";
export type Props = {
    id?: string;
    children?: React.ReactNode;
    input: (args: {
        id: string;
        className?: string;
    }) => React.ReactNode;
    showInputElement?: boolean;
    showDivider?: boolean;
    additionalContent?: React.ReactNode;
    disabled?: boolean;
    error?: React.ReactNode | boolean;
    inputElementVerticalAlignment?: "top" | "center";
    elevated?: boolean;
    checked: boolean | null;
    highlightText?: string;
    highlightIcon?: IconSVG;
    className?: string;
    attributes?: G.Attributes<"label">;
    mixin?: CardProps["mixin"];
};
