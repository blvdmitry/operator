import React from "react";
import Grid from "components/Grid";
import Stack from "components/Stack";
import Text from "components/Text";
import type * as T from "components/Grid/Grid.types";
import readme from "components/Grid/Grid.mdx";

const sizeOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
  { label: "11", value: 11 },
  { label: "12", value: 12 },
  { label: "half", value: "half" },
  { label: "full", value: "full" },
];

const offsetOptions = [...sizeOptions, "auto"];
const columnsOptions = sizeOptions.filter((i) => typeof i.value === "number");

export const controls = [
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [{ label: "Small", value: "small" }],
  },
  {
    type: "enum",
    label: "Vertical alignment",
    propertyName: "align",
    options: [
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
    ],
  },
  {
    type: "enum",
    label: "Horizontal alignment",
    propertyName: "justify",
    options: [
      { label: "Space between", value: "space-between" },
      { label: "Center", value: "center" },
      { label: "Space around", value: "space-around" },
    ],
  },
  {
    type: "enum",
    label: "Number of Columns",
    propertyName: "columns",
    options: columnsOptions,
    defaultValue: 12,
  },
  {
    type: "boolean",
    label: "Bleed",
    propertyName: "bleed",
  },
  {
    type: "boolean",
    label: "Reversed",
    propertyName: "reversed",
  },
  {
    type: "array",
    label: "Columns",
    propertyName: "children",
    required: true,
    item: {
      type: "object",
      propertyName: "column",
      controls: [
        {
          type: "slot",
          label: "Content",
          propertyName: "children",
          required: true,
          defaultValue: "Content",
        },
        {
          type: "enum",
          label: "Size",
          propertyName: "size",
          options: sizeOptions,
        },
        {
          type: "enum",
          label: "Size for medium viewport",
          propertyName: "sizeMedium",
          options: sizeOptions,
        },
        {
          type: "enum",
          label: "Size for large viewport",
          propertyName: "sizeLarge",
          options: sizeOptions,
        },
        {
          type: "enum",
          label: "Offset size",
          propertyName: "offset",
          options: offsetOptions,
        },
        {
          type: "enum",
          label: "Offset size for medium viewport",
          propertyName: "offsetMedium",
          options: offsetOptions,
        },
        {
          type: "enum",
          label: "Offset size for large viewport",
          propertyName: "offsetLarge",
          options: offsetOptions,
        },
      ],
    },
    defaultValue: [
      {
        children: "Content",
        size: 3,
      },
      {
        children: "Content 2",
        size: 3,
        offset: 3,
      },
      {
        children: "Content 3",
        size: 3,
      },
    ],
  },
];

export default {
  name: "Components/Utilities/Grid",
  readme,
  keywords: ["layout", "row", "column"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Grid"],
    },
  },
  playground: {
    template: (props: T.Props & { children: T.ColumnProps[] }) => (
      <Grid {...props}>
        {Array.isArray(props.children) &&
          props.children.map((column, index) => (
            <Grid.Column
              {...column}
              key={`gc-${index}`}
              attributes={{
                style: {
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                },
              }}
            />
          ))}
      </Grid>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Grid>
          <Grid.Column size={3}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={3}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={3} offset={3}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
        </Grid>
      ),
    },
    smallBleed: {
      template: () => (
        <Stack direction="column" gap={4}>
          <Text variant="body_1">Small gutter</Text>
          <Grid size="small">
            <Grid.Column size={3}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                }}
              />
            </Grid.Column>
            <Grid.Column size={3}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                }}
              />
            </Grid.Column>
            <Grid.Column size={3} offset={3}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                }}
              />
            </Grid.Column>
          </Grid>
          <Text variant="body_1">Small gutter</Text>
          <Grid bleed>
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                }}
              />
            </Grid.Column>
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 100,
                }}
              />
            </Grid.Column>
          </Grid>
        </Stack>
      ),
    },
    multiline: {
      template: () => (
        <Grid>
          <Grid.Column size={8}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={4}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={5}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={7}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
        </Grid>
      ),
    },
    alignJustify: {
      template: () => (
        <Stack direction="column" gap={4}>
          <Text variant="body_1">Align center</Text>
          <Grid align="center">
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 50,
                }}
              />
            </Grid.Column>
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 100,
                }}
              />
            </Grid.Column>
          </Grid>
          <Text variant="body_1">Align end</Text>
          <Grid align="end">
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 50,
                }}
              />
            </Grid.Column>
            <Grid.Column size={6}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 100,
                }}
              />
            </Grid.Column>
          </Grid>
          <Text variant="body_1">Justify center</Text>
          <Grid justify="center">
            <Grid.Column size={4}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 100,
                }}
              />
            </Grid.Column>
            <Grid.Column size={4}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 100,
                }}
              />
            </Grid.Column>
          </Grid>
          <Text variant="body_1">Columns self-align</Text>
          <Grid>
            <Grid.Column align="center" size={4}>
              <div
                style={{
                  background: "var(--bui_color_background_alt)",
                  height: 40,
                }}
              />
            </Grid.Column>
            <Grid.Column align="end" size={4}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 80,
                }}
              />
            </Grid.Column>
            <Grid.Column size={4}>
              <div
                style={{
                  background: "var(--bui_color_background)",
                  height: 120,
                }}
              />
            </Grid.Column>
          </Grid>
        </Stack>
      ),
    },
    responsive: {
      template: () => (
        <Grid reversed gap={{ s: 6, m: 8 }}>
          <Grid.Column size={{ s: 12, m: 4 }}>
            <div
              style={{
                border: "1px solid var(--bui_color_border_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={{ s: 12, m: 8 }}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
        </Grid>
      ),
    },
    utilityLayer: {
      template: () => (
        <Grid gap={4} mixin={{ padding: { s: 0, m: 4, l: 10 } }}>
          <Grid.Column size={12}>
            <div
              style={{
                border: "1px solid var(--bui_color_border_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
          <Grid.Column size={12}>
            <div
              style={{
                background: "var(--bui_color_background_alt)",
                height: 100,
              }}
            />
          </Grid.Column>
        </Grid>
      ),
    },
  },
};
