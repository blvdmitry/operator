import React from "react";
import type * as T from "./Flyout.types";
declare const _default: React.ForwardRefExoticComponent<{
    id?: string | undefined;
    triggerType?: "click" | "focus" | "hover" | undefined;
    position?: import("@bookingcom/bui-core/utilities/flyout").FlyoutPosition | undefined;
    forcePosition?: boolean | undefined;
    availableFallbacks?: import("@bookingcom/bui-core/utilities/flyout").FlyoutPosition[] | undefined;
    trapFocusMode?: import("@bookingcom/bui-core/utilities/a11y").TrapMode | undefined;
    navigationMode?: import("@bookingcom/bui-core/utilities/a11y").NavigationMode | undefined;
    children?: React.ReactNode;
    onOpen?: (() => void) | undefined;
    onClose?: (() => void) | undefined;
    onAfterOpen?: ((e: TransitionEvent | React.TransitionEvent<Element>) => void) | undefined;
    onAfterClose?: ((e: TransitionEvent | React.TransitionEvent<Element>) => void) | undefined;
    zIndex?: string | number | undefined;
    contentClassName?: string | undefined;
    contentAttributes?: import("../../../types/global").Attributes<"div", void, React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
        ref?: any;
    }> | undefined;
    follow?: boolean | undefined;
    lockClose?: boolean | undefined;
    disableAnimation?: boolean | "hide" | undefined;
    keepMounted?: boolean | undefined;
    timeout?: "short" | "long" | undefined;
    triggerRef?: React.RefObject<HTMLElement> | undefined;
    positionRef?: React.RefObject<HTMLElement> | undefined;
    containerRef?: React.RefObject<HTMLElement> | undefined;
} & {
    active?: undefined;
    defaultActive?: boolean | undefined;
} & Required<{
    position: import("@bookingcom/bui-core/utilities/flyout").FlyoutPosition | undefined;
    trigger: "click" | "focus" | "hover" | undefined;
}> & React.RefAttributes<T.RefProps>>;
export default _default;
