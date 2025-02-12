import * as React from "react";
import type { PopoverProps } from "components/Popover";
import type { ListItemProps } from "components/ListItem";
import type { FlyoutTriggerProps } from "components/_base/Flyout";
import type * as G from "types/global";

export type Item = {
  text: React.ReactNode;
  onChoose?: (item: Item, index: number) => void;
  textSlot?: React.ReactNode;
  className?: string;
  attributes?: G.Attributes;
} & Pick<
  ListItemProps,
  "preventDefault" | "startSlot" | "endSlot" | "disabled" | "href" | "icon"
>;

type Section = {
  items: Item[];
};

export type Props = {
  id?: string;
  triggerDisplay?: FlyoutTriggerProps["display"];
  navigationMode?: "arrows" | "tab-and-arrows";
  children: FlyoutTriggerProps["children"];
  items?: Item[];
  sections?: Section[];
  onItemChoose?: (item: Item, index: number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  triggerClassName?: string;
  triggerType?: Extract<PopoverProps["triggerType"], "click" | "focus">;
  attributes?: G.Attributes<"div">;
} & Pick<PopoverProps, "disableAnimation" | "active" | "position">;

export type ItemProps = Omit<Item, "onChoose"> &
  Pick<ListItemProps, "onClick"> & {
    divider?: boolean;
  };

export type SectionProps = Section & {
  divider?: boolean;
  onItemChoose?: Props["onItemChoose"];
};
