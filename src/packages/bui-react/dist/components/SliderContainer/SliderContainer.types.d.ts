import React from "react";
import type { SliderProps, SliderRef, SliderRefProps, SliderContainerProps, SliderControlProps } from "../_base/Slider";
import type * as G from "../../types/global";
export type RefProps = SliderRefProps;
export type Ref = SliderRef;
type BaseProps = {
    infinite?: boolean;
    /** @deprecated use navigationControlsVisibility prop instead */
    showNavigationControls?: boolean;
    navigationControlsVisibility?: "always" | "hover" | "never";
    isScrollEnabled?: boolean;
    children: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
    previousButtonAriaLabel: string;
    nextButtonAriaLabel: string;
    containerAriaLabel?: string;
    className?: string;
    attributes?: G.Attributes<"div">;
    onAfterNavigate?: SliderContainerProps["onAfterNavigate"];
    onNavigationControlClick?: SliderControlProps["onNavigationControlClick"];
};
export type Props = Pick<SliderProps, "defaultActiveIndex"> & BaseProps & ({
    variant?: "content";
    borderRadius?: never;
} | {
    variant?: "media";
    borderRadius?: 100 | 200 | 300;
});
export type ItemProps = {
    children?: React.ReactNode;
    src?: string;
};
export type Compound = React.ForwardRefExoticComponent<Props & {
    ref?: SliderRef;
}> & {
    Item: React.ComponentType<ItemProps>;
};
export {};
