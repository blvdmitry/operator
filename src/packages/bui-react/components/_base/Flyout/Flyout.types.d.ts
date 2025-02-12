import React from "react";
import type * as G from "../../../types/global";
import type { TrapMode, NavigationMode } from "@bookingcom/bui-core/utilities/a11y";
import type { FlyoutPosition } from "@bookingcom/bui-core/utilities/flyout";
type WithUncontrolled = {
    active?: never;
    defaultActive?: boolean;
};
type WithControlled = {
    active: boolean;
    defaultActive?: never;
};
type BaseProps = {
    id?: string;
    triggerType?: "hover" | "click" | "focus";
    position?: FlyoutPosition;
    forcePosition?: boolean;
    availableFallbacks?: PassedFlyoutOptions["availableFallbacks"];
    trapFocusMode?: TrapMode;
    navigationMode?: NavigationMode;
    children?: React.ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    onAfterOpen?: (e: React.TransitionEvent | TransitionEvent) => void;
    onAfterClose?: (e: React.TransitionEvent | TransitionEvent) => void;
    zIndex?: number | string;
    contentClassName?: string;
    contentAttributes?: G.Attributes<"div">;
    follow?: boolean;
    lockClose?: boolean;
    disableAnimation?: boolean | "hide";
    keepMounted?: boolean;
    timeout?: "short" | "long";
    triggerRef?: React.RefObject<HTMLElement>;
    positionRef?: React.RefObject<HTMLElement>;
    containerRef?: React.RefObject<HTMLElement>;
};
export type DefaultProps = Required<{
    position: BaseProps["position"];
    trigger: BaseProps["triggerType"];
}>;
export type UncontrolledProps = BaseProps & WithUncontrolled;
export type ControlledProps = BaseProps & WithControlled;
export type Props = ControlledProps | UncontrolledProps;
export type TriggerAttributes = G.Attributes<"button"> & G.Attributes<"input">;
export type TriggerProps = {
    children: (attributes: TriggerAttributes) => React.ReactNode;
    display?: "block";
    className?: string;
};
export type ContentRenderProps = (args: {
    position: FlyoutPosition;
}) => React.ReactNode;
export type ContentProps = {
    children: ContentRenderProps | React.ReactNode;
    arrowSlot?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"div">;
};
export type ArrowProps = {
    className?: string;
    offset: number;
    background: "inverted" | "elevation_two";
    shadow?: 100;
    size: 7;
};
export type ContextProps = {
    id: string;
    flyout: ReturnType<UseFlyout>;
    flyoutTriggerRef: React.RefObject<HTMLElement>;
    flyoutPositionRef: React.RefObject<HTMLElement>;
    flyoutContainerRef?: React.RefObject<HTMLElement>;
    flyoutElRef: React.RefObject<HTMLDivElement>;
    flyoutArrowElRef?: React.RefObject<HTMLElement>;
    handleOpen: (e: React.FocusEvent | FocusEvent) => void;
    handleClose: (e: React.FocusEvent | FocusEvent) => void;
    handleFocus: (e: React.FocusEvent | FocusEvent) => void;
    handleBlur: (e: React.FocusEvent | FocusEvent) => void;
    handleMouseEnter: (e: React.MouseEvent | MouseEvent) => void;
    handleMouseLeave: (e: React.MouseEvent | MouseEvent) => void;
    handleMouseMove: (e: React.MouseEvent | MouseEvent) => void;
    handleClick: (e: React.MouseEvent | MouseEvent) => void;
    handleTransitionEnd: (e: React.TransitionEvent | TransitionEvent) => void;
    follow?: boolean;
    focusTrapped: boolean;
} & Pick<Props, "triggerType" | "contentClassName" | "contentAttributes" | "disableAnimation" | "trapFocusMode" | "navigationMode">;
export type RefProps = {
    open: () => void;
    close: () => void;
};
export type Ref = React.Ref<RefProps>;
export type Compound = React.ForwardRefExoticComponent<Props & {
    ref?: Ref;
}> & {
    Trigger: React.ComponentType<TriggerProps>;
    Content: React.ComponentType<ContentProps>;
    Arrow: React.ComponentType<ArrowProps>;
};
type ElementRef = React.RefObject<HTMLElement | null>;
type PassedFlyoutOptions = {
    zIndex?: number | string;
    position?: FlyoutPosition;
    defaultActive?: boolean;
    forcePosition?: boolean;
    keepMounted?: boolean;
    relative?: boolean;
    flyoutArrowElRef: ElementRef;
    flyoutContainerRef?: ElementRef;
    availableFallbacks?: FlyoutPosition[];
};
export type FlyoutOptions = Pick<PassedFlyoutOptions, "forcePosition" | "zIndex"> & {
    position: FlyoutPosition;
    rtl: boolean;
    mobileFallback?: boolean;
};
export type FlyoutStyles = React.CSSProperties;
export type FlyoutState = {
    styles: FlyoutStyles;
    position: FlyoutPosition;
    active: boolean;
    visible: boolean;
};
type FlyoutMoveAction = {
    type: "move";
    payload: {
        x: number;
        y: number;
        isRTL: boolean;
    };
};
type FlyoutRenderAction = {
    type: "render";
    payload?: never;
};
type FlyoutShowAction = {
    type: "show";
    payload?: never;
};
type FlyoutHideAction = {
    type: "hide";
    payload?: never;
};
type FlyoutRemoveAction = {
    type: "remove";
    payload?: {
        keepMounted?: boolean;
    };
};
type FlyoutUpdateAction = {
    type: "update";
    payload: Pick<FlyoutState, "styles" | "position">;
};
export type FlyoutAction = FlyoutMoveAction | FlyoutRenderAction | FlyoutShowAction | FlyoutHideAction | FlyoutRemoveAction | FlyoutUpdateAction;
export type UseFlyout = (originRef: ElementRef, targetRef: ElementRef, options: PassedFlyoutOptions) => Pick<FlyoutState, "styles" | "position" | "active" | "visible"> & {
    render: () => void;
    show: () => void;
    hide: () => void;
    remove: () => void;
    update: () => void;
    move: (targetX: number, targetY: number) => void;
};
export type TriggerHoverEventHandlers = {
    focus: ContextProps["handleOpen"];
    blur: ContextProps["handleClose"];
    mouseMove: ContextProps["handleMouseMove"];
    mouseEnter: ContextProps["handleMouseEnter"];
    mouseLeave: ContextProps["handleMouseLeave"];
};
export type TriggerClickEventHandlers = {
    click: ContextProps["handleClick"];
};
export type TriggerHoverEventListeners = {
    onFocus?: ContextProps["handleOpen"];
    onBlur?: ContextProps["handleClose"];
    onMouseMove?: ContextProps["handleMouseMove"];
    onMouseEnter?: ContextProps["handleMouseEnter"];
    onMouseLeave?: ContextProps["handleMouseLeave"];
};
export type TriggerClickEventListeners = {
    onClick?: ContextProps["handleClick"];
};
export type TriggerAttributesHtml = {
    "aria-describedby"?: string;
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
};
export type TriggerEventSetListeners = (el: HTMLElement, handlers: Partial<Record<keyof GlobalEventHandlersEventMap, (e: any) => void>>) => undefined | (() => void);
export type TriggerEventSetAttributes = (el: HTMLElement, attributes: TriggerAttributesHtml) => () => void;
export {};
