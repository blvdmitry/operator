import React from "react";
import { KettleIcon } from "@bookingcom/bui-assets-react/streamline";
import ListItem from "components/ListItem";
import Avatar from "components/Avatar";
import Bubble from "components/Bubble";
import readme from "components/ListItem/ListItem.mdx";

export const controls = [
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
    defaultValue: true,
  },
  {
    type: "string",
    label: "Start slot",
    propertyName: "startSlot",
  },
  {
    type: "string",
    label: "Content",
    propertyName: "children",
    defaultValue: "Trips",
  },
  {
    type: "string",
    label: "End slot",
    propertyName: "endSlot",
    defaultValue: "2",
  },
  {
    type: "enum",
    label: "Spacing",
    propertyName: "spacing",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  {
    type: "enum",
    label: "VerticalAlignment",
    propertyName: "verticalAlignment",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "Baseline", value: "baseline" },
    ],
  },
  {
    type: "boolean",
    label: "Rounded Corners",
    propertyName: "roundedCorners",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "string",
    label: "Href",
    propertyName: "href",
    defaultValue: "http://booking.com",
  },
];

export default {
  name: "Components/Containers/List item",
  readme,
  keywords: ["entry", "item"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=2480%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["ListItem"],
    },
  },
  playground: {
    template: (props: any) => <ListItem {...props} />,
    controls,
  },
  examples: {
    spacing: {
      template: () => (
        <>
          <ListItem icon={KettleIcon} spacing="small" onClick={() => {}}>
            Small
          </ListItem>
          <ListItem icon={KettleIcon} onClick={() => {}}>
            Medium
          </ListItem>
          <ListItem icon={KettleIcon} spacing="large" onClick={() => {}}>
            Large
          </ListItem>
        </>
      ),
    },
    active: {
      template: () => (
        <ListItem icon={KettleIcon} active onClick={() => {}}>
          Active List Item
        </ListItem>
      ),
    },
    disabled: {
      template: () => (
        <ListItem icon={KettleIcon} disabled onClick={() => {}}>
          Disabled List Item
        </ListItem>
      ),
    },
    nonInteractive: {
      template: () => (
        <>
          <ListItem icon={KettleIcon}>Non Interactive</ListItem>
          <ListItem spacing="medium" edgeSpacing icon={KettleIcon}>
            Non Interactive with padding
          </ListItem>
        </>
      ),
    },
    slots: {
      name: "With Slots",

      template: () => (
        <ListItem
          startSlot={<Avatar src="https://picsum.photos/48" />}
          endSlot={<Bubble />}
          onClick={() => {}}
        >
          Your booking for CitizenM London Shoreditch is confirmed
        </ListItem>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Avatar", "Bubble"],
        },
      },
    },
  },
};
