import React from "react";
import Placeholder from "components/Placeholder";
import Button from "components/Button";
import InputText from "components/InputText";
import SheetContainer from "components/SheetContainer";
import Stack from "components/Stack";
import readme from "components/SheetContainer/SheetContainer.mdx";

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Sheet title",
  },
  {
    type: "string",
    label: "Subtitle",
    propertyName: "subtitle",
    defaultValue: "Optional subtitle",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Content",
  },
  {
    type: "slot",
    label: "Footer content",
    propertyName: "footer",
    defaultValue: "Content",
  },
  {
    type: "string",
    label: "Close aria label",
    propertyName: "closeAriaLabel",
    required: true,
    defaultValue: "Close bottom sheet",
  },
  {
    type: "enum",
    label: "Position",
    propertyName: "position",
    required: true,
    options: [
      { label: "Bottom", value: "bottom" },
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
      { label: "Center", value: "center" },
      { label: "Full Screen", value: "fullScreen" },
    ],
  },
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Lock closing",
    propertyName: "lockClose",
  },
  {
    type: "boolean",
    label: "Lock close on outside click",
    propertyName: "lockCloseOnOutsideClick",
  },
  {
    type: "boolean",
    label: "Keep mounted",
    propertyName: "keepMounted",
  },
  {
    type: "boolean",
    label: "Hide close button",
    propertyName: "hideClose",
  },
  {
    type: "boolean",
    label: "Sticky header",
    propertyName: "stickyHeader",
  },
  {
    type: "boolean",
    label: "Fill",
    propertyName: "fill",
  },
  {
    type: "boolean",
    label: "Hide Overlay",
    propertyName: "hideOverlay",
  },
];

const AutofocusExample = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [active, setActive] = React.useState(false);

  return (
    <>
      <Button onClick={() => setActive(true)}>Open sheet</Button>
      <SheetContainer
        active={active}
        onCloseTrigger={() => {
          setActive(false);
        }}
        size={600}
        position="bottom"
        closeAriaLabel="Close modal"
        title="Title"
        subtitle="Subtitle"
        onAfterOpen={() => {
          inputRef.current?.focus?.();
        }}
      >
        <InputText name="example" inputAttributes={{ ref: inputRef }} />
      </SheetContainer>
    </>
  );
};

const HideOverlayExample = () => {
  const [active, setActive] = React.useState(false);

  return (
    <>
      <Stack direction="column" gap={4}>
        <Button onClick={() => setActive(true)}>Open sheet</Button>
        <Placeholder height="1000px" />
      </Stack>
      <SheetContainer
        active={active}
        onCloseTrigger={() => {
          setActive(false);
        }}
        size={600}
        position="bottom"
        closeAriaLabel="Close modal"
        title="Title"
        subtitle="Subtitle"
        hideOverlay
      >
        <Placeholder />
      </SheetContainer>
    </>
  );
};

export default {
  name: "Components/Containers/Sheet container",
  readme,
  keywords: ["dialog", "modal", "drawer", "menu"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=373%3A391",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["SheetContainer"],
    },
  },
  playground: {
    template: (props: any) => <SheetContainer {...props} />,
    controls,
  },
  examples: {
    bottom: {
      template: () => (
        <SheetContainer
          active
          closeAriaLabel="Close drawer"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    end: {
      template: () => (
        <SheetContainer
          active
          position="end"
          closeAriaLabel="Close drawer"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    center: {
      template: () => (
        <SheetContainer
          active
          position="center"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    fullScreen: {
      template: () => (
        <SheetContainer
          active
          position="fullScreen"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    size: {
      template: () => (
        <SheetContainer
          active
          size={600}
          position="end"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    stickyHeader: {
      template: () => (
        <SheetContainer
          active
          size={600}
          stickyHeader
          position="end"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
        >
          <Stack gap={2}>
            <Placeholder height="150px" />
            <Placeholder height="150px" />
            <Placeholder height="150px" />
          </Stack>
        </SheetContainer>
      ),
    },
    autofocus: {
      template: () => <AutofocusExample />,
    },
    responsive: {
      template: () => (
        <SheetContainer
          active
          position={{ s: "bottom", m: "center", l: "fullScreen" }}
          size="large"
          closeAriaLabel="Close modal"
          title="Title"
          subtitle="Subtitle"
        >
          <Placeholder height="150px" />
        </SheetContainer>
      ),
    },
    hideOverlay: {
      name: "hideOverlay",
      template: () => <HideOverlayExample />,
    },
  },
};
