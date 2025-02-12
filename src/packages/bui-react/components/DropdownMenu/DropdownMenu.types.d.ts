import * as React from "react";
import type { PopoverProps } from "../Popover";
import type { ListItemProps } from "../ListItem";
import type { FlyoutTriggerProps } from "../_base/Flyout";
import type * as G from "../../types/global";
export type Item = {
    text: React.ReactNode;
    onChoose?: (item: Item, index: number) => void;
    textSlot?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes;
} & Pick<ListItemProps, "preventDefault" | "startSlot" | "endSlot" | "disabled" | "href" | "icon">;
type Section = {
    items: Item[];
};
export type Props = {
    triggerDisplay?: FlyoutTriggerProps["display"];
    navigationMode?: "arrows" | "tab-and-arrows";
    children: FlyoutTriggerProps["children"];
    items?: Item[];
    sections?: Section[];
    onItemChoose?: (item: Item, index: number) => void;
    triggerClassName?: string;
    triggerType?: Extract<PopoverProps["triggerType"], "click" | "focus">;
    attributes?: G.Attributes<"div">;
} & Pick<PopoverProps, "disableAnimation" | "active" | "position" | "forcePosition" | "containerRef" | "availableFallbacks" | "onOpen" | "onClose" | "id">;
export type ItemProps = Omit<Item, "onChoose"> & Pick<ListItemProps, "onClick"> & {
    divider?: boolean;
};
export type SectionProps = Section & {
    divider?: boolean;
    onItemChoose?: Props["onItemChoose"];
};
export {};
