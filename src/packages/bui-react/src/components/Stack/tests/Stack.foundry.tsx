import React from "react";
import Stack, { StackProps } from "components/Stack";
import Placeholder from "components/Placeholder";
import Card from "components/Card";
import readme from "components/Stack/Stack.mdx";
import Button from "components/Button";

export const controls = [
  {
    type: "array",
    label: "Items",
    propertyName: "children",
    item: {
      type: "slot",
      propertyName: "item",
      defaultValue: "Item",
    },
    defaultValue: ["Item 1", "Item 2", "Item 3"],
  },
  {
    type: "number",
    label: "Gap",
    propertyName: "gap",
    defaultValue: 2,
  },
  {
    type: "boolean",
    label: "Divided",
    propertyName: "divided",
  },
  {
    type: "enum",
    label: "Direction",
    propertyName: "direction",
    options: [
      { label: "Column", value: "column" },
      { label: "Column Reverse", value: "column-reverse" },
      { label: "Row", value: "row" },
      { label: "Row Reverse", value: "row-reverse" },
    ],
  },
  {
    type: "enum",
    label: "Align Items",
    propertyName: "alignItems",
    options: [
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
      { label: "Center", value: "center" },
      { label: "Stretch", value: "stretch" },
      { label: "Baseline", value: "baseline" },
    ],
  },
  {
    type: "enum",
    label: "Justify Content",
    propertyName: "justifyContent",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
      { label: "Space Between", value: "space-between" },
    ],
  },
  {
    type: "enum",
    label: "Wrap",
    propertyName: "wrap",
    options: [
      { label: "Wrap", value: "wrap" },
      { label: "Nowrap", value: "nowrap" },
      { label: "Wrap reverse", value: "wrap-reverse" },
    ],
  },
];

export default {
  name: "Components/Utilities/Stack",
  readme,
  keywords: ["layout", "horizontal", "vertical"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Stack"],
    },
  },
  playground: {
    template: (props: StackProps) => (
      <Stack {...props}>
        {props.children && Array.isArray(props.children)
          ? props.children.map((_, c) => (
              <Button key={`item-${c}`} text={`Item ${c}`} />
            ))
          : props.children}
      </Stack>
    ),
    controls,
  },
  examples: {
    column: {
      template: () => (
        <Stack>
          <Placeholder height="24px" />
          <Placeholder height="24px" />
          <Placeholder height="24px" />
        </Stack>
      ),
    },
    gap: {
      template: () => (
        <Stack gap={6}>
          <Placeholder height="24px" />
          <Placeholder height="24px" />
          <Placeholder height="24px" />
        </Stack>
      ),
    },
    row: {
      template: () => (
        <Stack direction="row">
          <Placeholder height="24px" width="64px" />
          <Placeholder height="24px" width="64px" />
          <Placeholder height="24px" width="64px" />
        </Stack>
      ),
    },
    itemGrow: {
      template: () => (
        <Stack gap={4} direction="row">
          <Placeholder height="24px" width="64px" />
          <Stack grow>
            <Placeholder height="24px" />
            <Placeholder height="24px" />
          </Stack>
          <Placeholder width="64px" height="48px" />
        </Stack>
      ),
    },
    itemSplitColumn: {
      template: () => (
        <Card attributes={{ style: { height: 250 } }}>
          <Stack alignItems="stretch" gap={4} direction="column">
            <Placeholder height="24px" />
            <Placeholder height="24px" />
            <Stack.Item split>
              <Placeholder height="24px" />
            </Stack.Item>
          </Stack>
        </Card>
      ),
    },
    itemAlign: {
      template: () => (
        <Stack gap={4} direction="row">
          <Placeholder width="64px" height="48px" />
          <Stack.Item grow alignSelf="center">
            <Placeholder height="24px" />
          </Stack.Item>
          <Placeholder width="64px" height="48px" />
        </Stack>
      ),
    },
    responsive: {
      template: () => (
        <Card>
          <Stack
            direction={{ s: "column", m: "row-reverse", l: "column" }}
            gap={{ s: 8, m: 3, l: 2 }}
            alignItems={{ s: "start", m: "center", l: "end" }}
            justifyContent={{ s: "start", m: "center", l: "end" }}
            wrap={{ s: "wrap-reverse", m: "wrap", l: "nowrap" }}
          >
            <Placeholder width="64px" height="40px" />
            <Placeholder width="120px" height="70px" />
            <Stack
              direction={{ s: "row", m: "column-reverse", l: "column" }}
              gap={{ s: 2, m: 4, l: 3 }}
              alignItems={{ s: "center", m: "end", l: "start" }}
              justifyContent={{ s: "start", m: "center", l: "end" }}
            >
              <Placeholder width="64px" height="40px" />
              <Placeholder width="120px" height="70px" />
            </Stack>
          </Stack>
        </Card>
      ),
    },
    wrap: {
      template: () => (
        <Stack direction="row" wrap="nowrap">
          <Placeholder width="250px" />
          <Placeholder width="250px" />
          <Placeholder width="250px" />
        </Stack>
      ),
    },
    utilityLayer: {
      template: () => (
        <Stack
          mixin={{ height: 50, width: "100%", position: "relative" }}
          gap={0}
        >
          <Stack
            mixin={{
              width: "100%",
              height: { s: "100%", m: "50%" },
              position: { s: "relative", m: "absolute" },
              insetBlockStart: { s: 0, m: "auto", l: 0 },
              insetBlockEnd: { s: "auto", m: 0, l: "auto" },
              insetInlineStart: 0,
            }}
            gap={0}
          >
            <Placeholder height="50%" />
            <Placeholder height="50%" />
          </Stack>
        </Stack>
      ),
    },
    divided: {
      template: () => (
        <Stack divided direction={{ s: "column", m: "row" }}>
          {["Item 1", "Item 2", "Item 3"].map((item, index) => (
            <Button wide={{ s: true, m: false }} key={index}>
              {item}
            </Button>
          ))}
        </Stack>
      ),
    },
  },
};
