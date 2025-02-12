import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { ButtonProps } from "../Button";
import type * as TSlider from "../_base/Slider/Slider.types";
import type * as G from "../../types/global";
export type Props = {
    title?: React.ReactNode;
    action?: ButtonProps;
    children?: React.ReactNode;
    size?: "small" | "medium" | "large" | "larger" | "largest";
    ariaLabel?: string;
    previousButtonAriaLabel: string;
    nextButtonAriaLabel: string;
    onAfterNavigate?: TSlider.ContainerProps["onAfterNavigate"];
    className?: string;
    attributes?: G.Attributes<"div">;
    topNavigationOffset?: string;
    mixin?: Mixin<{
        padding: false;
        margin: false;
        height: false;
    }>;
};
export type ItemProps = {
    children?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"li">;
};
export type PrivateItemProps = ItemProps & {
    index: number;
};
export type Compound = React.ForwardRefExoticComponent<Props & {
    ref?: TSlider.Ref;
}> & {
    Item: React.ComponentType<ItemProps>;
};
export type NavigationData = TSlider.NavigationData;
