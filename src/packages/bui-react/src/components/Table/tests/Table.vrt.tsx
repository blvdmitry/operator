import React from "react";
import env from "@bookingcom/bui-env-react";
import Table, { TableProps } from "components/Table";

const headings: TableProps["headings"] = [
  { content: "Room name", width: "200px" },
  { content: "Date", width: "120px" },
  { content: "Status" },
  { content: "Commission", align: "end" },
];

const cells = [
  { content: "Small Double Room - Annex building" },
  { content: "5 Aug 2017" },
  { content: "OK" },
  { content: "€150.66" },
];

env.test.vrt({
  simple: <Table headings={headings} rows={[{ cells }, { cells }]} />,
  compact: <Table compact headings={headings} rows={[{ cells }, { cells }]} />,
  noOverflowFade: {
    component: (
      <Table
        overflowFade={false}
        headings={headings}
        rows={[{ cells }, { cells }]}
      />
    ),
    viewports: ["small"],
  },
  borderless: (
    <Table borderless headings={headings} rows={[{ cells }, { cells }]} />
  ),
  collapsible: {
    component: (
      <Table
        viewLessLabel="Less"
        viewMoreLabel="More"
        headings={headings}
        rows={[{ cells, collapsedContent: "Content" }, { cells }]}
      />
    ),
    interactive: (client) => {
      const el = client.body.querySelector(
        "[aria-label='More']"
      ) as HTMLElement;

      el?.click();
      client.screenshot("collapsible-opened");
    },
  },
  selectable: {
    component: (
      <Table
        checkboxName="name"
        defaultValue={["1"]}
        headings={headings}
        rows={[
          { cells, checkboxValue: "1" },
          { cells, checkboxValue: "2" },
        ]}
      />
    ),
    interactive: (client) => {
      const el = client.body.querySelector("[type=checkbox]") as HTMLElement;
      el.click();
      client.screenshot("selected-all");
    },
  },
});
