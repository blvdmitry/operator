import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "../Icon";
import type * as G from "../../types/global";
import type * as TBubble from "../Bubble/Bubble.types";
import type * as TDropdownMenu from "../DropdownMenu/DropdownMenu.types";
export type DropdownMenuItem = TDropdownMenu.Item;
export type ContextProps = Pick<Props, "variant" | "fillEqually" | "vertical" | "moreLabel" | "edgeGradient"> & {
    activeTabId?: string;
    rootRef: React.RefObject<HTMLDivElement>;
    navRef: React.RefObject<HTMLUListElement>;
    moreRef: React.RefObject<HTMLLIElement>;
    buttonRefs: React.RefObject<HTMLElement[]>;
    getButtonRef: (el: HTMLButtonElement | null, index: number) => void;
    changeTab: (id: string, index: number, options?: {
        focus?: boolean;
    }) => void;
};
export type TriggerList = {
    children?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes;
    tagName?: keyof JSX.IntrinsicElements;
};
export type TriggerPrivate = Trigger & {
    isOverflow: boolean;
    isMobile: boolean;
    getItemStyle: () => React.CSSProperties;
    handleKeys: (event: React.KeyboardEvent) => void;
    triggerIndex: number;
    triggersCount: number;
    hasParentRole?: boolean;
};
export type Trigger = {
    id: string;
    text: React.ReactNode;
    title?: React.ReactNode;
    icon?: IconSVG;
    bubble?: TBubble.Props;
    href?: string;
    linkAttributes?: G.Attributes;
    native?: boolean;
};
export type Panel = {
    id: string;
    children?: React.ReactNode;
    attributes?: G.Attributes;
    className?: string;
    tagName?: keyof JSX.IntrinsicElements;
    keepMounted?: boolean;
    mixin?: Mixin;
};
type BaseProps = {
    children?: React.ReactNode;
    variant?: "underlined" | "rounded";
    color?: "inherit";
    moreLabel?: string;
    onTabChange?: (id: string) => void;
    vertical?: boolean;
    fillEqually?: boolean;
    edgeGradient?: boolean;
    className?: string;
    borderless?: boolean;
    attributes?: G.Attributes<"div">;
};
export type ControlledProps = BaseProps & {
    activeTabId: string;
    defaultActiveTabId?: never;
};
export type UncontrolledProps = BaseProps & {
    activeTabId?: never;
    defaultActiveTabId?: string;
};
export type Props = ControlledProps | UncontrolledProps;
export type Compound = React.ExoticComponent<Props> & {
    Trigger: React.ComponentType<Trigger>;
    TriggerList: React.ComponentType<TriggerList>;
    Panel: React.ComponentType<Panel>;
};
export {};
