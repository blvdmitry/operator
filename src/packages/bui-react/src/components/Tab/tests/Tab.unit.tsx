import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import {
  BookIcon,
  BedIcon,
  CoupleIcon,
  SuitcaseIcon,
} from "@bookingcom/bui-assets-react/streamline";
import Tab from "components/Tab";
import type * as TTab from "components/Tab/Tab.types";

const className = "test-className";
const triggersClassName = "test-triggers-className";
const id = "test-root";
const triggersId = "test-triggers";
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

const panels: TTab.Panel[] = [
  {
    id: "dashboard",
    children: "Dashboard Content",
    attributes: { "data-testid": "dashboard" },
    className: "test-panel",
  },
  {
    id: "bookings",
    children: "Bookings Content",
    attributes: { "data-testid": "bookings" },
  },
  {
    id: "travelGuides",
    children: "Travel Guides Content",
    attributes: { "data-testid": "travelGuides" },
  },
  {
    id: "reviews",
    children: "Reviews Content",
    attributes: { "data-testid": "reviews" },
  },
];

describe("Tab", () => {
  Element.prototype.scrollTo = () => {};

  test("render", () => {
    const handleChange = jest.fn();
    setup(
      <Tab
        attributes={{ "data-testid": id }}
        onTabChange={handleChange}
        className={className}
      >
        <Tab.TriggerList
          attributes={{ "data-testid": triggersId }}
          className={triggersClassName}
        >
          {triggers.map((trigger) => (
            <Tab.Trigger key={trigger.id} id={trigger.id} text={trigger.text} />
          ))}
        </Tab.TriggerList>
        {panels.map((panel) => (
          <Tab.Panel key={panel.id} {...panel} />
        ))}
      </Tab>
    );

    const root = screen.getByTestId(id);
    const triggersList = screen.getByTestId(triggersId);
    const tabs = screen.getAllByRole("tab");
    const allPanels = screen.getAllByRole("tabpanel");

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass(className);

    expect(triggersList).toBeInTheDocument();
    expect(triggersList).toHaveClass(triggersClassName);

    allPanels.forEach((panel, index) => {
      const panelProps = panels[index];

      expect(panel).toHaveAttribute(
        "data-testid",
        panelProps.attributes?.["data-testid"]
      );

      if (panelProps.className) {
        expect(panel).toHaveClass(panelProps.className);
      }
    });
    // there would be 5 tabs rendered in the DOM here as the More tab is always rendered but hidden.
    expect(tabs).toHaveLength(5);

    tabs.forEach((tab) => {
      expect(tab).toBeInTheDocument();
      expect(tab).toBeEnabled();
    });
  });

  test("uncontrolled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Tab
        defaultActiveTabId={triggers[2].id}
        attributes={{ "data-testid": id }}
        onTabChange={handleChange}
        className={className}
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
    );

    const tabs = screen.getAllByRole("tab");
    const tabDefault = tabs[2];
    const tabTarget = tabs[1];

    expect(tabDefault).toHaveAttribute("aria-selected", "true");

    await user.click(tabs[1]);
    expect(tabDefault).toHaveAttribute("aria-selected", "false");
    expect(tabTarget).toHaveAttribute("aria-selected", "true");
    expect(handleChange).toBeCalledTimes(1);
  });

  test("controlled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Tab
        activeTabId={triggers[2].id}
        attributes={{ "data-testid": id }}
        onTabChange={handleChange}
        className={className}
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
    );

    const tabs = screen.getAllByRole("tab");
    const tabDefault = tabs[2];
    const tabTarget = tabs[1];

    expect(tabDefault).toHaveAttribute("aria-selected", "true");

    await user.click(tabs[1]);

    expect(tabDefault).toHaveAttribute("aria-selected", "true");
    expect(tabTarget).toHaveAttribute("aria-selected", "false");
    expect(handleChange).toBeCalledTimes(1);
  });

  test("keepMounted", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Tab
        defaultActiveTabId={triggers[2].id}
        attributes={{ "data-testid": id }}
        onTabChange={handleChange}
        className={className}
      >
        <Tab.TriggerList>
          {triggers.map((trigger) => (
            <Tab.Trigger key={trigger.id} id={trigger.id} text={trigger.text} />
          ))}
        </Tab.TriggerList>
        {panels.map((panel) => (
          <Tab.Panel key={panel.id} id={panel.id} keepMounted>
            {panel.children}
          </Tab.Panel>
        ))}
      </Tab>
    );

    const tabs = screen.getAllByRole("tab");
    const tabDefault = tabs[2];
    const tabTarget = tabs[1];
    const panelDefault = screen.getAllByRole("tabpanel")[2];

    expect(panelDefault).toBeInTheDocument();

    await user.click(tabs[1]);
    expect(panelDefault).toBeInTheDocument();
    expect(tabDefault).toHaveAttribute("aria-selected", "false");
    expect(tabTarget).toHaveAttribute("aria-selected", "true");
    expect(handleChange).toBeCalledTimes(1);
  });
});
