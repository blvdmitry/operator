import React from "react";
import {
  BookIcon,
  BedIcon,
  CoupleIcon,
  SuitcaseIcon,
  LockOpenIcon,
} from "@bookingcom/bui-assets-react/streamline";
import { controls as bubbleControls } from "components/Bubble/tests/Bubble.foundry";
import type * as TTab from "components/Tab/Tab.types";
import readme from "components/Tab/Tab.mdx";
import Tab from "../Tab";

type PlaygroundProps = {
  triggerList: TTab.Trigger[];
  panelList: TTab.Panel[];
} & TTab.Props;

const triggers: TTab.Trigger[] = [
  {
    id: "dashboard",
    text: "Dashboard",
    title: "100",
    icon: BookIcon,
    href: "#dashboard",
    bubble: { text: 1, variant: "destructive" },
  },
  {
    id: "bookings",
    text: "Bookings",
    title: "200",
    icon: BedIcon,
    bubble: { text: 18, variant: "destructive" },
    href: "https://booking.com",
  },
  {
    id: "long-tab",
    text: "Tab that is too long to fit",
    title: "200",
    icon: LockOpenIcon,
    bubble: { variant: "destructive" },
    href: "https://booking.com",
  },
  {
    id: "travelGuides",
    text: "Travel guides",
    title: "300",
    icon: CoupleIcon,
    bubble: { text: 18, variant: "destructive" },
    href: "https://booking.com",
  },
  {
    id: "reviews",
    text: "Reviews",
    title: "400",
    icon: SuitcaseIcon,
    bubble: { text: 18, variant: "destructive" },
    href: "https://booking.com",
  },
];

const panels: TTab.Panel[] = [
  {
    id: "dashboard",
    children: "Dashboard Content",
  },
  {
    id: "bookings",
    children: "Bookings Content",
  },
  {
    id: "travelGuides",
    children: "Travel Guides Content",
  },
  {
    id: "reviews",
    children: "Reviews Content",
  },
];

export const controls = [
  {
    type: "array",
    label: "Trigger List",
    propertyName: "triggerList",
    required: true,
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "ID",
          propertyName: "id",
          required: true,
          defaultValue: "trigger_id",
        },
        {
          type: "string",
          label: "Text",
          propertyName: "text",
          required: true,
          defaultValue: "Trigger",
        },
        {
          type: "string",
          label: "Title",
          propertyName: "title",
        },
        {
          type: "icon",
          label: "Icon",
          propertyName: "icon",
        },
        {
          type: "object",
          label: "Bubble",
          propertyName: "bubble",
          controls: bubbleControls,
          defaultValue: {
            variant: "destructive",
          },
        },
        {
          type: "string",
          label: "Href",
          propertyName: "href",
          defaultValue: "",
        },
        {
          type: "boolean",
          label: "Native",
          propertyName: "native",
        },
      ],
    },
    defaultValue: triggers.map(({ id, text }) => ({
      id,
      text,
    })),
  },
  {
    type: "array",
    label: "Panel List",
    propertyName: "panelList",
    required: true,
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "ID",
          propertyName: "id",
          required: true,
          defaultValue: "panel_id",
        },
        {
          type: "slot",
          label: "Content",
          propertyName: "children",
          required: true,
          defaultValue: "Panel Content",
        },
        {
          type: "boolean",
          label: "Keep mounted",
          propertyName: "keepMounted",
        },
      ],
    },
    defaultValue: panels,
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Underlined", value: "underlined" },
      { label: "Rounded", value: "rounded" },
    ],
    defaultValue: "underlined",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [{ label: "Inherit", value: "inherit" }],
  },
  {
    type: "boolean",
    label: "Vertical",
    propertyName: "vertical",
  },
  {
    type: "boolean",
    label: "Fill Equally`",
    propertyName: "fillEqually",
  },
  {
    type: "boolean",
    label: "Borderless",
    propertyName: "borderless",
  },
  {
    type: "string",
    label: "More label",
    propertyName: "moreLabel",
    required: true,
    defaultValue: "More",
  },
  {
    type: "string",
    label: "Active Id",
    propertyName: "activeTabId",
  },
];

export default {
  name: "Components/Containers/Tab",
  readme,
  keywords: ["navigation", "input", "form", "segmented control"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4241%3A8034",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Tab"],
    },
  },
  playground: {
    template: (props: PlaygroundProps) => {
      const { triggerList, panelList, ...tabRootProps } = props;
      return (
        <Tab
          {...tabRootProps}
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggerList.map((trigger) => (
              <Tab.Trigger key={trigger.id} {...trigger} />
            ))}
          </Tab.TriggerList>
          {panelList.map((panel) => (
            <Tab.Panel key={panel.id} {...panel} />
          ))}
        </Tab>
      );
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Tab
          vertical
          defaultActiveTabId={triggers[2].id}
          moreLabel="More"
          onTabChange={() => {}}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
                icon={trigger.icon}
                bubble={trigger.bubble}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    rounded: {
      template: () => (
        <Tab
          variant="rounded"
          moreLabel="More"
          defaultActiveTabId={triggers[0].id}
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    iconsBubbles: {
      template: () => (
        <Tab
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
                icon={trigger.icon}
                bubble={trigger.bubble}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Bubble"],
        },
      },
    },
    vertical: {
      template: () => (
        <Tab vertical moreLabel="More">
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
                icon={trigger.icon}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    equallySized: {
      template: () => (
        <Tab
          fillEqually
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.slice(0, 2).map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
                icon={trigger.icon}
              />
            ))}
          </Tab.TriggerList>
          {panels.slice(0, 2).map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    fillEquallyMultiline: {
      template: () => (
        <Tab
          fillEqually
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.slice(0, 3).map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
                icon={trigger.icon}
                bubble={trigger.bubble}
              />
            ))}
          </Tab.TriggerList>
          {panels.slice(0, 3).map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    borderless: {
      template: () => (
        <Tab
          borderless
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    colorInherit: {
      template: () => (
        <div style={{ background: "#333", color: "#fff" }}>
          <Tab
            color="inherit"
            moreLabel="More"
            onTabChange={(id) => console.log(`Changed to ${id}`)}
          >
            <Tab.TriggerList>
              {triggers.map((trigger) => (
                <Tab.Trigger
                  key={trigger.id}
                  id={trigger.id}
                  text={trigger.text}
                  icon={trigger.icon}
                  bubble={trigger.bubble}
                />
              ))}
            </Tab.TriggerList>
            {panels.map((panel) => (
              <Tab.Panel key={panel.id} id={panel.id}>
                {panel.children}
              </Tab.Panel>
            ))}
          </Tab>
        </div>
      ),
    },
    uncontrolled: {
      template: () => (
        <Tab
          defaultActiveTabId={triggers[1].id}
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
    controlled: {
      template: () => (
        <Tab
          activeTabId={triggers[1].id}
          moreLabel="More"
          onTabChange={(id) => console.log(`Changed to ${id}`)}
        >
          <Tab.TriggerList>
            {triggers.map((trigger) => (
              <Tab.Trigger
                key={trigger.id}
                id={trigger.id}
                text={trigger.text}
              />
            ))}
          </Tab.TriggerList>
          {panels.map((panel) => (
            <Tab.Panel key={panel.id} id={panel.id}>
              {panel.children}
            </Tab.Panel>
          ))}
        </Tab>
      ),
    },
  },
};
