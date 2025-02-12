import React from "react";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import readme from "components/Tooltip/Tooltip.mdx";

export const controls = [
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    required: true,
    defaultValue: "Tooltip text",
  },
  {
    type: "enum",
    label: "Position",
    propertyName: "position",
    options: [
      { label: "Bottom end", value: "bottom-end" },
      { label: "Bottom", value: "bottom" },
      { label: "Bottom start", value: "bottom-start" },
      { label: "Top end", value: "top-end" },
      { label: "Top", value: "top" },
      { label: "Top start", value: "top-start" },
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
    ],
  },
  {
    type: "number",
    label: "Z-index",
    propertyName: "zIndex",
  },
  {
    type: "boolean",
    label: "Hide arrow",
    propertyName: "hideArrow",
  },
  {
    type: "boolean",
    label: "Follow",
    propertyName: "follow",
  },
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
  },
];

const Template = (props: any) => {
  return (
    <div
      style={{
        height: "calc(100vh - var(--bui_spacing_8x)",
        width: "calc(100vw - var(--bui_spacing_8x)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip {...props}>
        {(attributes) => <Button text="Show tooltip" attributes={attributes} />}
      </Tooltip>
    </div>
  );
};

const CustomContainerRefExample = () => {
  const containerRef = React.useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        height: "500px",
        width: "500px",
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--bui_color_border_alt)",
      }}
    >
      <div style={{ height: "300vh", padding: "var(--bui_spacing_4x)" }}>
        <Tooltip
          text="customContainer"
          containerRef={containerRef}
          className="tooltip"
        >
          {(attributes) => (
            <Button
              className="trigger"
              attributes={attributes}
              text="Hover Me"
            />
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export default {
  name: "Components/Elements/Tooltip",
  readme,
  keywords: ["hover"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A1572",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Tooltip", "Button"],
    },
  },
  playground: {
    template: (props: any) => <Template {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Tooltip text="This is a preferred property">
          {(attributes) => <Button text="Hover me" attributes={attributes} />}
        </Tooltip>
      ),
    },
    customContainer: {
      template: () => <CustomContainerRefExample />,
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    follow: {
      template: () => (
        <Tooltip follow text="This is a preferred property">
          {(attributes) => <Button text="Hover me" attributes={attributes} />}
        </Tooltip>
      ),
    },
  },
};
