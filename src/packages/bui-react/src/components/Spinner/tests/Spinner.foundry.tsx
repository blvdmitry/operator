import React from "react";
import Stack from "components/Stack";
import Spinner, { SpinnerProps } from "components/Spinner";
import readme from "components/Spinner/Spinner.mdx";

export const controls = [
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Larger", value: "larger" },
    ],
    defaultValue: "medium",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [
      { label: "Action", value: "action" },
      { label: "Destructive", value: "destructive" },
      { label: "White", value: "white" },
      { label: "Inherit", value: "inherit" },
    ],
    defaultValue: "action",
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
    defaultValue: "Loading content",
  },
];

export default {
  name: "Components/Elements/Spinner",
  readme,
  keywords: ["loader", "loading", "progress"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A852",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Spinner"],
    },
  },
  playground: {
    template: (props: SpinnerProps) => {
      const color = props.color;

      if (color === "white" || color === "inherit") {
        return (
          <div style={{ background: "#333", color: "#fff" }}>
            <Spinner {...props} />
          </div>
        );
      }
      return <Spinner {...props} />;
    },
    controls,
  },
  examples: {
    colors: {
      template: () => (
        <Stack direction="row">
          <Spinner ariaLabel="Loading content" />
          <Spinner color="destructive" ariaLabel="Loading content" />
        </Stack>
      ),
    },
    whiteInherit: {
      template: () => (
        <Stack direction="row">
          <div style={{ backgroundColor: "#000" }}>
            <Spinner color="white" ariaLabel="Loading content" />
          </div>
          <div
            style={{
              background: "var(--bui_color_action_background)",
              color: "var(--bui_color_on_action_background)",
            }}
          >
            <Spinner color="inherit" ariaLabel="Loading content" />
          </div>
        </Stack>
      ),
    },
    sizes: {
      template: () => (
        <Stack direction="row">
          <Spinner size="small" ariaLabel="Loading content" />
          <Spinner size="medium" ariaLabel="Loading content" />
          <Spinner size="large" ariaLabel="Loading content" />
          <Spinner size="larger" ariaLabel="Loading content" />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Group"],
        },
      },
    },
    responsive: {
      template: () => (
        <Spinner
          size={{ s: "large", m: "small" }}
          ariaLabel="Loading content"
        />
      ),
    },
  },
};
