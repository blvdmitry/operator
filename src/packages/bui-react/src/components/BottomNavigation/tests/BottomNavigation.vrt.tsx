import React from "react";
import env from "@bookingcom/bui-env-react";
import {
  KettleIcon,
  PersonHalfIcon,
} from "@bookingcom/bui-assets-react/streamline";
import BottomNavigation from "components/BottomNavigation";

const defaultItems = [
  {
    id: "item-1",
    icon: KettleIcon,
    text: "Label 1",
  },
  {
    id: "item-2",
    icon: KettleIcon,
    text: "Label 2",
    notificationValue: true,
    notificationAriaLabel: "item 2 aria label",
  },
  {
    id: "item-3",
    icon: KettleIcon,
    text: "Label 3",
    notificationValue: "4",
    notificationAriaLabel: "item 3 aria label",
  },
];

const itemsWithAvatar = [
  {
    id: "item-1",
    icon: KettleIcon,
    text: "Label",
  },
  {
    id: "item-2",
    icon: KettleIcon,
    text: "Label",
    notificationValue: true,
    notificationAriaLabel: "item 2 aria label",
  },
  {
    id: "item-3",
    avatar: {
      icon: PersonHalfIcon,
    },
    text: "Avatar",
    notificationValue: "4",
    notificationAriaLabel: "item 3 aria label",
  },
];

env.test.vrt({
  defaultUnselected: <BottomNavigation items={defaultItems} />,
  defaultSelected: (
    <BottomNavigation items={defaultItems} selectedId="item-3" />
  ),
  withAvatarUnselected: <BottomNavigation items={itemsWithAvatar} />,
  withAvatarSelected: (
    <BottomNavigation items={itemsWithAvatar} selectedId="item-3" />
  ),
});
