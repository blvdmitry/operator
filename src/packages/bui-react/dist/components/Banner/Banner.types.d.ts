import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconProps } from "../Icon";
import type * as TBox from "../Box/Box.types";
import type * as TButton from "../Button/Button.types";
import type * as TImage from "../Image/Image.types";
import type * as G from "../../types/global";
type Image = {
    src: string;
    alt: string;
    contentMode?: TImage.Props["contentMode"];
};
type WithClose = {
    dismissible?: true;
    onClose?: () => void;
    closeAriaLabel: string;
};
type WithoutClose = {
    dismissible: false;
    onClose?: never;
    closeAriaLabel?: string;
};
export type Props = (WithClose | WithoutClose) & {
    children?: React.ReactNode;
    startImage?: Image;
    topImage?: Image;
    title?: React.ReactNode;
    text?: React.ReactNode;
    titleTagName?: keyof JSX.IntrinsicElements;
    actions?: TButton.Props[];
    startIcon?: IconProps["svg"];
    startIconColor?: IconProps["color"];
    variant?: "neutral" | "hint" | "callout" | "highlighted";
    bleed?: boolean | 0;
    className?: string;
    attributes?: G.Attributes;
    mixin?: Mixin<{
        margin: false;
    }, TBox.Props["mixin"]>;
};
export {};
