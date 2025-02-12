import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "../Icon";
import type { PressHandler } from "../Actionable/Actionable.types";
import type * as TText from "../Text/Text.types";
import type * as G from "../../types/global";
type WithCloseProps = {
    onClose: PressHandler;
    closeAriaLabel: string;
};
type WithoutCloseProps = {
    onClose?: never;
    closeAriaLabel?: never;
};
type CloseProps = WithCloseProps | WithoutCloseProps;
type OnlyIconProps = {
    icon?: IconSVG;
    text?: never;
    ariaLabel: string;
} | {
    icon?: IconSVG;
    text: React.ReactNode;
    ariaLabel?: string;
};
export type Props = {
    variant?: "outline" | "brand-primary" | "brand-genius-primary" | "constructive" | "accent" | "callout" | "destructive" | "media" | "disabled";
    alternative?: boolean;
    text?: React.ReactNode;
    icon?: IconSVG;
    iconColor?: "brand_genius_secondary";
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"span">;
    mixin?: Mixin<{
        padding: false;
    }, TText.Props["mixin"]>;
} & CloseProps & OnlyIconProps;
export {};
