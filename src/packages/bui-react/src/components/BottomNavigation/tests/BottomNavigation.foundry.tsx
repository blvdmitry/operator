import React from "react";
import {
  KettleIcon,
  PersonHalfIcon,
} from "@bookingcom/bui-assets-react/streamline";
import BottomNavigation from "components/BottomNavigation";
import readme from "components/BottomNavigation/BottomNavigation.mdx";
import { controls as AvatarControls } from "components/Avatar/tests/Avatar.foundry";

export const controls = [
  {
    type: "array",
    label: "Items",
    propertyName: "items",
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "Id",
          propertyName: "id",
          required: true,
        },
        {
          type: "string",
          label: "Href",
          propertyName: "href",
        },
        {
          type: "string",
          label: "Label",
          propertyName: "text",
        },
        {
          type: "string",
          label: "Bubble Value",
          propertyName: "notificationValue",
        },
        {
          type: "string",
          label: "Bubble Accessibility Label",
          propertyName: "notificationAriaLabel",
        },
        {
          type: "icon",
          label: "Icon",
          propertyName: "icon",
          defaultValue: true,
        },
        {
          type: "object",
          label: "Avatar",
          propertyName: "avatar",
          controls: AvatarControls,
        },
      ],
    },
    defaultValue: [
      {
        id: "item-1",
        text: "Label1",
        icon: true,
      },
      {
        id: "item-2",
        text: "Label2",
        notificationValue: "3",
        notificationAriaLabel: "accessibility label",
        icon: true,
      },
      {
        id: "item-3",
        text: "Label3",
        icon: true,
      },
    ],
  },
  {
    type: "string",
    label: "Selected Item Id",
    propertyName: "selectedId",
    defaultValue: "item-3",
  },
];

export default {
  name: "Components/Patterns/Bottom navigation",
  readme,
  keywords: ["mobile", "nav bar", "bottom", "navigation"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=3038%3A2940",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["BottomNavigation"],
    },
  },
  playground: {
    template: (props: any) => <BottomNavigation {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <BottomNavigation
          items={[
            {
              icon: KettleIcon,
              text: "Label 1",
              id: "item-1",
            },
            {
              icon: KettleIcon,
              text: "Label 2",
              notificationValue: true,
              notificationAriaLabel: "Update available",
              id: "item-2",
            },
            {
              icon: KettleIcon,
              text: "Label 3",
              id: "item-3",
            },
          ]}
          selectedId="item-2"
          onItemChoose={(item) => console.log(item)}
        />
      ),
    },
    avatar: {
      template: () => (
        <BottomNavigation
          items={[
            {
              icon: KettleIcon,
              text: "Label",
              id: "item-1",
            },
            {
              icon: KettleIcon,
              text: "Label",
              notificationValue: true,
              notificationAriaLabel: "Update available",
              id: "item-2",
            },
            {
              avatar: {
                icon: PersonHalfIcon,
              },
              text: "Avatar",
              id: "item-3",
              notificationValue: "3",
              notificationAriaLabel: "3 new notifications",
            },
          ]}
          selectedId="item-3"
          onItemChoose={(item) => console.log(item)}
        />
      ),
    },
  },
};
