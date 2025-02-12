import React from "react";
import {
  BookIcon,
  BedIcon,
  CoupleIcon,
  SuitcaseIcon,
  LockOpenIcon,
} from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Tab from "components/Tab";
import type * as TTab from "components/Tab/Tab.types";

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

const triggersWithLongText: TTab.Trigger[] = [
  ...triggers.slice(0, 2),
  {
    id: "long-tab",
    text: "Tab with a lot of text that is too long to fit, even more text coming now in the end",
    title: "200",
    icon: LockOpenIcon,
    bubble: { text: 18, variant: "destructive" },
    href: "https://booking.com",
  },
  ...triggers.slice(2),
];
const triggersWithMultilineText: TTab.Trigger[] = [
  ...triggers.slice(0, 2),
  {
    id: "long-tab",
    text: "Tab with a lot of text that is too long",
    title: "200",
    icon: LockOpenIcon,
    bubble: { variant: "destructive" },
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

env.test.vrt({
  underlined: {
    component: (
      <Tab
        defaultActiveTabId={triggers[1].id}
        moreLabel="More"
        onTabChange={() => {}}
      >
        <Tab.TriggerList>
          {triggers.map((trigger) => (
            <Tab.Trigger key={trigger.id} id={trigger.id} text={trigger.text} />
          ))}
        </Tab.TriggerList>
        {panels.map((panel) => (
          <Tab.Panel key={panel.id} id={panel.id}>
            {panel.children}
          </Tab.Panel>
        ))}
      </Tab>
    ),
    viewports: ["small", "medium"],
  },
  roundedLongActive: {
    component: (
      <Tab
        variant="rounded"
        defaultActiveTabId={triggers[2].id}
        moreLabel="More"
        onTabChange={() => {}}
      >
        <Tab.TriggerList>
          {triggersWithLongText.map((trigger) => (
            <Tab.Trigger key={trigger.id} id={trigger.id} text={trigger.text} />
          ))}
        </Tab.TriggerList>
        {panels.map((panel) => (
          <Tab.Panel key={panel.id} id={panel.id}>
            {panel.children}
          </Tab.Panel>
        ))}
      </Tab>
    ),
    viewports: ["small"],
  },
  rounded: {
    component: (
      <Tab
        variant="rounded"
        defaultActiveTabId={triggers[1].id}
        moreLabel="More"
        onTabChange={() => {}}
      >
        <Tab.TriggerList>
          {triggers.map((trigger) => (
            <Tab.Trigger key={trigger.id} id={trigger.id} text={trigger.text} />
          ))}
        </Tab.TriggerList>
        {panels.map((panel) => (
          <Tab.Panel key={panel.id} id={panel.id}>
            {panel.children}
          </Tab.Panel>
        ))}
      </Tab>
    ),
    viewports: ["small", "medium"],
  },
  underlinedVertical: {
    component: (
      <Tab
        vertical
        defaultActiveTabId={triggers[1].id}
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
    viewports: ["small", "medium"],
  },
  roundedVertical: {
    component: (
      <Tab
        variant="rounded"
        vertical
        defaultActiveTabId={triggers[1].id}
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
    viewports: ["small", "medium"],
  },
  fillEquallyMultiline: {
    component: (
      <Tab
        fillEqually
        defaultActiveTabId={triggers[1].id}
        moreLabel="More"
        onTabChange={() => {}}
      >
        <Tab.TriggerList>
          {triggersWithMultilineText.map((trigger) => (
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
    viewports: ["medium"],
  },
  inherit: {
    component: (
      <div style={{ background: "#333", color: "#fff" }}>
        <Tab color="inherit" moreLabel="More">
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
    viewports: ["medium"],
  },
});
