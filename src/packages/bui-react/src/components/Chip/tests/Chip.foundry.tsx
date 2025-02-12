import React from "react";
import { BedIcon } from "@bookingcom/bui-assets-react/streamline";
import Stack from "components/Stack";
import AspectRatio from "components/AspectRatio";
import Chip, { ChipProps } from "components/Chip";
import readme from "./Chip.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    required: true,
    options: [
      { label: "Toggle", value: "toggle" },
      { label: "Action", value: "action" },
    ],
    defaultValue: "toggle",
  },
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    required: true,
    defaultValue: "Pet friendly",
  },
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
  {
    type: "boolean",
    label: "Elevated",
    propertyName: "elevated",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "boolean",
    label: "Selected",
    propertyName: "selected",
  },
  {
    type: "boolean",
    label: "Wide",
    propertyName: "wide",
  },
  {
    type: "string",
    label: "Bubble text",
    propertyName: "bubbleText",
  },
  {
    type: "string",
    label: "Bubble Aria Label",
    propertyName: "bubbleAriaLabel",
  },
  {
    type: "boolean",
    label: "Dismissible",
    propertyName: "dismissible",
  },
  {
    type: "boolean",
    label: "Checked",
    propertyName: "checked",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "pet",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
    defaultValue: "1",
  },
];

export default {
  name: "Components/Elements/Chip",
  readme,
  keywords: ["tag", "toggle"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Chip"],
    },
  },
  playground: {
    template: (props: ChipProps) => {
      function cleanVariantProps(props: any) {
        let variantProps: any = {};

        if (props.variant === "toggle") {
          variantProps = { ...props };

          delete variantProps.selected;
          delete variantProps.bubble;
          delete variantProps.bubbleText;
          delete variantProps.bubbleAriaLabel;
        } else if (props.variant === "action") {
          variantProps = {
            ...props,
            bubble: {
              text: props.bubbleText,
              ariaLabel: props.bubbleAriaLabel,
            },
          };

          delete variantProps.bubbleText;
          delete variantProps.bubbleAriaLabel;
          delete variantProps.value;
          delete variantProps.name;
          delete variantProps.checked;
          delete variantProps.defaultChecked;
          delete variantProps.dismissible;
          delete variantProps.onChange;
          delete variantProps.inputAttributes;
        }

        return variantProps;
      }

      const variantProps = cleanVariantProps(props);

      return <Chip {...(variantProps as ChipProps)} />;
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Stack alignItems="start">
          <Chip
            variant="action"
            label="Wide Action Chip"
            icon={BedIcon}
            bubble={{ text: 5, ariaLabel: "bubble label" }}
            selected
            wide
          />
          <Chip variant="toggle" label="Wide Toggle Chip" icon={BedIcon} wide />
        </Stack>
      ),
    },
    disabled: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack gap={4} alignItems="start">
          <Chip
            disabled
            onChange={() => console.log("HEHEHEHEHE")}
            label="Pet friendly"
            name="pet"
          />
        </Stack>
      ),
    },
    variantAction: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack gap={4} alignItems="start">
          <Chip variant="action" label="Sort by" selected={false} />
          <Chip variant="action" label="Sort by: Our top picks" selected />
        </Stack>
      ),
    },
    variantActionBubble: {
      template: () => (
        <Chip
          variant="action"
          label="Filter by: multiple"
          bubble={{ text: 5, ariaLabel: "bubble label" }}
          selected
        />
      ),
    },
    dismissible: {
      template: () => <Chip dismissible label="Pet friendly" name="pet" />,
    },
    elevated: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["AspectRatio"],
        },
      },
      template: () => (
        <AspectRatio ratio="16:9">
          <img src="https://picsum.photos/360" alt="Example" />
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Chip elevated label="Attractions" name="attractions" />
          </div>
        </AspectRatio>
      ),
    },
    icon: {
      template: () => <Chip icon={BedIcon} label="Single bed" name="bed" />,
    },
    group: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack direction="row" gap={2}>
          <Chip label="Pet friendly" name="pet" defaultChecked />
          <Chip label="Free parking" name="parking" />
        </Stack>
      ),
    },
    controlledAndUncontrolled: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack gap={4} alignItems="start">
          <Chip checked label="Pet friendly" name="pet" />
          <Chip defaultChecked label="Pet friendly" name="pet" />
        </Stack>
      ),
    },
    multiline: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack direction="row">
          {[
            "5 звезд (50)",
            "Удобства для гостей с ограниченными физическими возможностями (90)",
            "Парковка (105)",
            "Отели (200)",
          ].map((label, index) => (
            <Stack.Item key={`ex-${index}`} shrink>
              <Chip label={label} name="facility" />
            </Stack.Item>
          ))}
        </Stack>
      ),
    },
    horizontalScroll: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack direction="row" wrap="nowrap">
          {[
            "5 звезд (50)",
            "Удобства для гостей с ограниченными физическими возможностями (90)",
            "Парковка (105)",
            "Отели (200)",
          ].map((label, index) => (
            <Chip key={`chip-example-${index}`} label={label} name="facility" />
          ))}
        </Stack>
      ),
    },
  },
};
