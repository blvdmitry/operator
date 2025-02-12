import React from "react";
import Placeholder from "components/Placeholder";
import Button from "components/Button";
import Popover from "components/Popover";
import Stack from "components/Stack";
import Text from "components/Text";

import readme from "../Popover.mdx";

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Popover title",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "content",
    required: true,
    defaultValue: "Popover content",
  },
  {
    type: "enum",
    label: "Position",
    propertyName: "position",
    options: [
      { label: "Top start", value: "top-start" },
      { label: "Top", value: "top" },
      { label: "Top end", value: "top-end" },
      { label: "Bottom start", value: "bottom-start" },
      { label: "Bottom", value: "bottom" },
      { label: "Bottom end", value: "bottom-end" },
      { label: "Bottom stretch", value: "bottom-stretch" },
      { label: "Start top", value: "start-top" },
      { label: "Start", value: "start" },
      { label: "Start bottom", value: "start-bottom" },
      { label: "End top", value: "end-top" },
      { label: "End", value: "end" },
      { label: "End bottom", value: "end-bottom" },
    ],
  },
  {
    type: "boolean",
    label: "Force position",
    propertyName: "forcePosition",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Auto", value: "auto" },
    ],
  },
  {
    type: "enum",
    label: "Trigger type",
    propertyName: "triggerType",
    options: [
      { label: "Hover", value: "hover" },
      { label: "Click", value: "click" },
    ],
  },
  {
    type: "string",
    label: "Close aria label",
    propertyName: "closeAriaLabel",
    defaultValue: "Close popover",
  },
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
  },
  {
    type: "boolean",
    label: "Fill",
    propertyName: "fill",
  },
  {
    type: "boolean",
    label: "Hide arrow",
    propertyName: "hideArrow",
  },
  {
    type: "boolean",
    label: "Hide close button",
    propertyName: "hideClose",
  },
  {
    type: "boolean",
    label: "Lock close",
    propertyName: "lockClose",
  },
  {
    type: "boolean",
    label: "Keep mounted",
    propertyName: "keepMounted",
  },
  {
    type: "enum",
    propertyName: "navigationMode",
    label: "Navigation mode",
    options: [
      { label: "Tab", value: "tab" },
      { label: "Arrows", value: "arrows" },
      { label: "Tab and arrows", value: "tab-and-arrows" },
    ],
  },
  {
    type: "enum",
    propertyName: "trapFocusMode",
    label: "Trap focus mode",
    options: [
      { label: "Hard", value: "hard" },
      { label: "Soft", value: "soft" },
    ],
  },
  {
    type: "number",
    label: "Z Index",
    propertyName: "zIndex",
  },
];

const ExternalRefExample = () => {
  const buttonRef = React.useRef(null);

  return (
    <Stack gap={6} direction="column">
      <Button text="Button with ref" ref={buttonRef} />
      <Popover
        triggerRef={buttonRef}
        triggerType="click"
        closeAriaLabel="Close popover"
      >
        <Popover.Content>
          <Placeholder />
        </Popover.Content>
      </Popover>
    </Stack>
  );
};

const CustomContainerRefExample = () => {
  const buttonRef = React.useRef(null);
  const containerRef = React.useRef(null);

  return (
    <Stack
      gap={6}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <div
        ref={containerRef}
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "500px",
          width: "100%",
          position: "relative",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--bui_color_border_alt)",
        }}
      >
        <div
          style={{
            height: "300vh",
            padding: "var(--bui_spacing_8x)",
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Button text="Button in custom scrollview" ref={buttonRef} />
          <Popover
            triggerRef={buttonRef}
            triggerType="click"
            containerRef={containerRef}
            closeAriaLabel="Close popover"
          >
            <Popover.Content>
              <Text>
                Popover stays in the right position while container is scrolled
              </Text>
              <Placeholder />
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </Stack>
  );
};

const ExternalRefControlledExample = () => {
  const buttonRef = React.useRef(null);
  const [popoverActive, setPopoverActive] = React.useState(false);

  const onButtonClick = () => {
    setPopoverActive(!popoverActive);
  };

  const onPopoverClose = () => {
    setPopoverActive(false);
  };

  return (
    <Stack gap={6} direction="column">
      <Button text="Button with ref" onClick={onButtonClick} ref={buttonRef} />
      <Popover
        active={popoverActive}
        triggerRef={buttonRef}
        triggerType="click"
        closeAriaLabel="Close popover"
        onClose={onPopoverClose}
      >
        <Popover.Content>
          <Placeholder />
        </Popover.Content>
      </Popover>
    </Stack>
  );
};

export default {
  name: "Components/Containers/Popover",
  readme,
  keywords: ["tooltip", "hover", "contextual"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=132%3A214",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Popover"],
    },
  },
  playground: {
    template: (props: any) => (
      <div
        style={{
          height: "calc(100vh - var(--bui_spacing_8x)",
          width: "calc(100vw - var(--bui_spacing_8x)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Popover {...props} title={undefined} content={undefined}>
          <Popover.Trigger>
            {(attributes) => (
              <Button text="Open popover" attributes={attributes} />
            )}
          </Popover.Trigger>
          <Popover.Content title={props.title}>{props.content}</Popover.Content>
        </Popover>
      </div>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Popover
          closeAriaLabel="Close popover"
          onAfterClose={(e) => console.log("afterClose", e)}
          onAfterOpen={(e) => console.log("afterOpen", e)}
        >
          <Popover.Trigger>
            {(attributes) => (
              <Button text="Open popover" attributes={attributes} />
            )}
          </Popover.Trigger>
          <Popover.Content>
            <Placeholder />
          </Popover.Content>
        </Popover>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    externalRef: {
      template: () => <ExternalRefExample />,
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    customContainer: {
      template: () => <CustomContainerRefExample />,
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    externalRefControlled: {
      template: () => <ExternalRefControlledExample />,
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    fill: {
      template: () => (
        <Popover fill closeAriaLabel="Close popover">
          <Popover.Trigger>
            {(attributes) => (
              <Button text="Open popover" attributes={attributes} />
            )}
          </Popover.Trigger>
          <Popover.Content>
            <Placeholder />
          </Popover.Content>
        </Popover>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
    sizes: {
      template: () => (
        <Stack direction="row">
          <Popover closeAriaLabel="Close popover">
            <Popover.Trigger>
              {(attributes) => (
                <Button text="Size: Medium(default)" attributes={attributes} />
              )}
            </Popover.Trigger>
            <Popover.Content>Medium popover content</Popover.Content>
          </Popover>
          <Popover size="small" closeAriaLabel="Close popover">
            <Popover.Trigger>
              {(attributes) => (
                <Button text="Size: Small" attributes={attributes} />
              )}
            </Popover.Trigger>
            <Popover.Content>Small popover content</Popover.Content>
          </Popover>
          <Popover size="auto">
            <Popover.Trigger>
              {(attributes) => (
                <Button text="Size: Auto" attributes={attributes} />
              )}
            </Popover.Trigger>
            <Popover.Content>Width based on the content</Popover.Content>
          </Popover>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button", "Stack"],
        },
      },
    },
    triggerTypes: {
      template: () => (
        <Stack direction="row">
          <Popover triggerType="click">
            <Popover.Trigger>
              {(attributes) => (
                <Button text="Click to open" attributes={attributes} />
              )}
            </Popover.Trigger>
            <Popover.Content>
              Click on close button or outside to dismiss
            </Popover.Content>
          </Popover>
          <Popover triggerType="hover">
            <Popover.Trigger>
              {(attributes) => (
                <Button text="Hover to open" attributes={attributes} />
              )}
            </Popover.Trigger>
            <Popover.Content>
              Dissapears when button is un-hovered
            </Popover.Content>
          </Popover>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Button"],
        },
      },
    },
  },
};
