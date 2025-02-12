import React from "react";
import {
  ArrowTriangleDownIcon,
  ArrowTriangleUpIcon,
} from "@bookingcom/bui-assets-react/streamline";
import Icon from "components/Icon";
import Stack from "components/Stack";
import Actionable from "components/Actionable";
import Button from "components/Button";
import Table from "components/Table";
import readme from "components/Table/Table.mdx";

export const controls = [
  {
    type: "array",
    label: "Headings",
    propertyName: "headings",
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "Content",
          propertyName: "content",
          required: true,
          defaultValue: "Heading",
        },
        {
          type: "enum",
          label: "Align",
          propertyName: "align",
          options: [
            { label: "Start", value: "start" },
            { label: "Center", value: "center" },
            { label: "End", value: "end" },
          ],
          default: "start",
        },
        {
          type: "number",
          label: "Colspan",
          propertyName: "colspan",
        },
        {
          type: "string",
          label: "Width",
          propertyName: "width",
        },
      ],
    },
    defaultValue: [
      {
        content: "Room name",
        width: "120px",
      },
      {
        content: "Booked on",
        width: "120px",
      },
      {
        content: "Status",
      },
      {
        content: "Commission",
      },
    ],
  },
  {
    type: "array",
    label: "Rows",
    propertyName: "rows",
    required: true,
    item: {
      type: "object",
      controls: [
        {
          type: "array",
          label: "Cells",
          propertyName: "cells",
          item: {
            type: "object",
            label: "Cell",
            propertyName: "cell",
            required: true,
            controls: [
              {
                type: "string",
                label: "Content",
                propertyName: "content",
                defaultValue: "Cell content",
              },
            ],
          },
        },
        {
          type: "string",
          label: "Checkbox value",
          propertyName: "checkboxValue",
        },
        {
          type: "slot",
          label: "Collapsed content",
          propertyName: "collapsedContent",
        },
        {
          type: "boolean",
          label: "Expanded",
          propertyName: "expanded",
        },
      ],
    },
    defaultValue: [
      {
        cells: [
          {
            content: "Junior Suite",
          },
          {
            content: "28 Jul 2017",
          },
          {
            content: "Cancelled",
          },
          {
            content: "€74.25",
          },
        ],
      },
    ],
  },
  {
    type: "string",
    label: "Checkbox name",
    propertyName: "checkboxName",
  },
  {
    type: "boolean",
    label: "Sticky header",
    propertyName: "stickyHeader",
  },
  {
    type: "boolean",
    label: "Compact",
    propertyName: "compact",
  },
  {
    type: "boolean",
    label: "No border",
    propertyName: "borderless",
  },
  {
    type: "boolean",
    label: "Overflow Fade",
    defaultValue: true,
    propertyName: "overflowFade",
  },
];

const SortTable = () => {
  const [desc, setDesc] = React.useState(false);

  const handleSwitch = () => {
    setDesc((desc) => !desc);
  };

  const rows = [
    {
      cells: [
        { content: "Small Double Room - Annex building" },
        { content: "5 Aug 2017" },
        { content: "OK" },
        { content: "€150.66" },
      ],
    },
    {
      cells: [
        { content: "Standard Room Room - Canal View" },
        { content: "28 Jul 2017" },
        { content: "OK" },
        { content: "€33.45" },
      ],
    },
    {
      cells: [
        { content: "Junior Suite" },
        { content: "28 Jul 2017" },
        { content: "Cancelled" },
        { content: "€74.25" },
      ],
    },
  ];

  return (
    <Table
      headings={[
        {
          content: (
            <Stack direction="row" gap={1} alignItems="center">
              <Stack.Item>Room name</Stack.Item>
              <Actionable onClick={handleSwitch}>
                <Icon
                  svg={desc ? ArrowTriangleUpIcon : ArrowTriangleDownIcon}
                />
              </Actionable>
            </Stack>
          ),
          width: "200px",
        },
        { content: "Date", width: "120px" },
        { content: "Status" },
        { content: "Commission", align: "end" },
      ]}
      rows={rows.sort((rowA, rowB) => {
        const isASmaller = rowA.cells[0].content < rowB.cells[0].content;

        if (desc) return isASmaller ? 1 : -1;
        return isASmaller ? -1 : 1;
      })}
    />
  );
};

const ExpandedTable = () => {
  const [expandedRows, setExpandedRows] = React.useState<
    Record<string, boolean>
  >({});

  const rows = [
    {
      collapsedContent: (
        <>
          Formerly known as Flash Deals. Special deals that last for only a
          limited time and are only available for newsletter subscribers.
        </>
      ),
      cells: [
        { content: "Small Double Room - Annex building" },
        { content: "5 Aug 2017" },
        { content: "OK" },
        { content: "€150.66" },
      ],
      expanded: expandedRows?.["row-1"],
      id: "row-1",
      onOpen: () => setExpandedRows({ ...expandedRows, "row-1": true }),
      onClose: () => setExpandedRows({ ...expandedRows, "row-1": false }),
    },
    {
      collapsedContent: (
        <>
          Formerly known as Flash Deals. Special deals that last for only a
          limited time and are only available for newsletter subscribers.
        </>
      ),
      cells: [
        { content: "Standard Room Room - Canal View" },
        { content: "28 Jul 2017" },
        { content: "OK" },
        { content: "€33.45" },
      ],
      id: "row-2",
      expanded: expandedRows?.["row-2"],
      onOpen: () => setExpandedRows({ ...expandedRows, "row-2": true }),
      onClose: () => setExpandedRows({ ...expandedRows, "row-2": false }),
    },
    {
      cells: [
        { content: "Junior Suite" },
        { content: "28 Jul 2017" },
        { content: "Cancelled" },
        { content: "€74.25" },
      ],
    },
  ];

  const handleToggle = () => {
    const isExpanded = rows?.every(
      (row) => !row.collapsedContent || (row.id && expandedRows?.[row.id])
    );
    const allRows = rows?.reduce((acc, row) => {
      if (row.id) acc[row.id] = !isExpanded;
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedRows(allRows);
  };

  return (
    <Stack>
      <Button.Aligner alignment="start">
        <Button onClick={handleToggle}>Expand/Collapse all</Button>
      </Button.Aligner>
      <Table
        headings={[
          { content: "Room name", width: "200px" },
          { content: "Date", width: "120px" },
          { content: "Status" },
          { content: "Commission", align: "end" },
        ]}
        rows={rows}
      />
    </Stack>
  );
};

export default {
  name: "Components/Containers/Table",
  readme,
  keywords: ["data grid", "list", "pagination"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A1003",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Table"],
    },
  },
  playground: {
    controls,
    template: (props: any) => <Table {...props} />,
  },
  examples: {
    simple: {
      template: () => (
        <Table
          headings={[
            { content: "Room name", width: "200px" },
            { content: "Date", width: "120px" },
            { content: "Status" },
            { content: "Commission", align: "end" },
          ]}
          rows={[
            {
              cells: [
                { content: "Small Double Room - Annex building" },
                { content: "5 Aug 2017" },
                { content: "OK" },
                { content: "€150.66" },
              ],
            },
            {
              cells: [
                { content: "Standard Room Room - Canal View" },
                { content: "28 Jul 2017" },
                { content: "OK" },
                { content: "€33.45" },
              ],
            },
            {
              cells: [
                { content: "Junior Suite" },
                { content: "28 Jul 2017" },
                { content: "Cancelled" },
                { content: "€74.25" },
              ],
            },
          ]}
        />
      ),
    },
    compact: {
      template: () => (
        <Table
          compact
          headings={[
            { content: "Room name", width: "200px" },
            { content: "Date", width: "120px" },
            { content: "Status" },
            { content: "Commission", align: "end" },
          ]}
          rows={[
            {
              cells: [
                { content: "Small Double Room - Annex building" },
                { content: "5 Aug 2017" },
                { content: "OK" },
                { content: "€150.66" },
              ],
            },
            {
              cells: [
                { content: "Standard Room Room - Canal View" },
                { content: "28 Jul 2017" },
                { content: "OK" },
                { content: "€33.45" },
              ],
            },
            {
              cells: [
                { content: "Junior Suite" },
                { content: "28 Jul 2017" },
                { content: "Cancelled" },
                { content: "€74.25" },
              ],
            },
          ]}
        />
      ),
    },
    borderless: {
      template: () => (
        <Table
          borderless
          headings={[
            { content: "Room name", width: "200px" },
            { content: "Date", width: "120px" },
            { content: "Status" },
            { content: "Commission", align: "end" },
          ]}
          rows={[
            {
              cells: [
                { content: "Small Double Room - Annex building" },
                { content: "5 Aug 2017" },
                { content: "OK" },
                { content: "€150.66" },
              ],
            },
            {
              cells: [
                { content: "Standard Room Room - Canal View" },
                { content: "28 Jul 2017" },
                { content: "OK" },
                { content: "€33.45" },
              ],
            },
            {
              cells: [
                { content: "Junior Suite" },
                { content: "28 Jul 2017" },
                { content: "Cancelled" },
                { content: "€74.25" },
              ],
            },
          ]}
        />
      ),
    },
    collapsible: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button", "Stack"],
        },
      },
      template: () => <ExpandedTable />,
    },
    selectable: {
      template: () => (
        <Table
          checkboxName="reservations"
          value={["1"]}
          headings={[
            { content: "Room name", width: "200px" },
            { content: "Date", width: "120px" },
            { content: "Status" },
            { content: "Commission", align: "end" },
          ]}
          rows={[
            {
              checkboxValue: "1",
              cells: [
                { content: "Small Double Room - Annex building" },
                { content: "5 Aug 2017" },
                { content: "OK" },
                { content: "€150.66" },
              ],
            },
            {
              checkboxValue: "2",
              cells: [
                { content: "Standard Room Room - Canal View" },
                { content: "28 Jul 2017" },
                { content: "OK" },
                { content: "€33.45" },
              ],
            },
            {
              checkboxValue: "3",
              cells: [
                { content: "Junior Suite" },
                { content: "28 Jul 2017" },
                { content: "Cancelled" },
                { content: "€74.25" },
              ],
            },
          ]}
        />
      ),
    },
    sortable: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Actionable", "Stack"],
        },
      },
      template: () => <SortTable />,
    },
  },
};
