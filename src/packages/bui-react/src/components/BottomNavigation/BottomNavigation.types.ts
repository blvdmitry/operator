import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "components/Icon";
import type { ActionableProps } from "components/Actionable";
import type * as TAvatar from "components/Avatar/Avatar.types";
import type * as TBubbleContainer from "components/BubbleContainer/BubbleContainer.types";
import type * as G from "types/global";

type AvatarProps = Omit<TAvatar.Props, "size">;
type Id = string | number;

type WithoutNotification = {
  notificationValue?: never;
  notificationAriaLabel?: never;
};
type WithNotification = {
  notificationValue: TBubbleContainer.Props["value"];
  notificationAriaLabel: TBubbleContainer.Props["ariaLabel"];
};

type WithText = { text: React.ReactNode; ariaLabel?: string };
type WithoutText = { text?: React.ReactNode; ariaLabel: string };
type WithAvatar = { icon?: never; avatar: AvatarProps };
type WithIcon = { icon: IconSVG; avatar?: never };

export type Item = (WithNotification | WithoutNotification) &
  (WithText | WithoutText) &
  (WithAvatar | WithIcon) & {
    id: Id;
    onChoose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  } & Pick<ActionableProps, "attributes" | "href" | "preventDefault">;

export type Props = {
  items: Item[];
  selectedId?: Id;
  onItemChoose?: (
    item: Item,
    event: React.MouseEvent | React.KeyboardEvent
  ) => void;
  className?: string;
  attributes?: G.Attributes;
  mixin?: Mixin<{ padding: false; width: false; height: false }>;
};
