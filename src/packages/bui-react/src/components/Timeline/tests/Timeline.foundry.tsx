import React from "react";
import { InboxIcon } from "@bookingcom/bui-assets-react/streamline";
import Placeholder from "components/Placeholder";
import Timeline from "components/Timeline";
import readme from "components/Timeline/Timeline.mdx";

export const controls = [
  {
    type: "array",
    label: "Items",
    propertyName: "items",
    item: {
      type: "object",
      controls: [
        {
          type: "slot",
          label: "Content",
          propertyName: "children",
          defaultValue: "Enter content",
        },
        {
          type: "enum",
          label: "Line variant",
          propertyName: "lineVariant",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
          ],
          defaultValue: "solid",
        },
        {
          type: "icon",
          label: "Marker",
          propertyName: "marker",
        },
        {
          type: "enum",
          label: "Marker color",
          propertyName: "markerColor",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Neutral Alt", value: "neutral_alt" },
            { label: "Constructive", value: "constructive" },
            { label: "Destructive", value: "destructive" },
            { label: "Accent", value: "accent" },
            { label: "Callout", value: "callout" },
            { label: "White", value: "white" },
            { label: "Brand Primary", value: "brand_primary" },
            {
              label: "Brand Genius Secondary",
              value: "brand_genius_secondary",
            },
            { label: "Inherit", value: "inherit" },
          ],
        },
      ],
    },
    defaultValue: [
      {
        title: "Tue, 24 Nov 2016",
        children: "Placeholder text",
      },
      {
        title: "Mon, 23 Nov 2016 from 13:00 to 16:00",
        children: "Placeholder text",
      },
      {
        title: "Sun, 22 Nov 2016 from 14:00 to 15:30",
        children: "Placeholder text",
      },
    ],
    required: true,
  },
];

export default {
  name: "Components/Containers/Timeline",
  readme,
  keywords: ["list"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=132%3A555",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Timeline"],
    },
  },
  playground: {
    template: (props: any) => (
      <Timeline>
        {props.items.map((item: any, index: number) => (
          <Timeline.Item {...item} key={`item-${index}`} />
        ))}
      </Timeline>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Timeline>
          <Placeholder />
          <Timeline.Item>
            <Placeholder />
          </Timeline.Item>
        </Timeline>
      ),
    },
    marker: {
      template: () => (
        <Timeline>
          <Timeline.Item marker={InboxIcon}>
            <Placeholder />
          </Timeline.Item>
          <Timeline.Item>
            <Placeholder />
          </Timeline.Item>
        </Timeline>
      ),
    },
    markerColor: {
      template: () => (
        <Timeline>
          <Timeline.Item marker={InboxIcon} markerColor="constructive">
            <Placeholder />
          </Timeline.Item>
          <Timeline.Item markerColor="constructive">
            <Placeholder />
          </Timeline.Item>
        </Timeline>
      ),
    },
    lineVariant: {
      template: () => (
        <Timeline>
          <Timeline.Item marker={InboxIcon} lineVariant="dashed">
            <Placeholder />
          </Timeline.Item>
          <Timeline.Item>
            <Placeholder />
          </Timeline.Item>
        </Timeline>
      ),
    },
  },
};
