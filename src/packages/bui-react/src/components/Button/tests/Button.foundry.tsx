import React from "react";
import {
  InboxIcon,
  LocationIcon,
  HeartIcon,
} from "@bookingcom/bui-assets-react/streamline";
import AspectRatio from "components/AspectRatio";
import Button, { ButtonProps } from "components/Button";
import Image from "components/Image";
import Stack from "components/Stack";
import Text from "components/Text";
import readme from "components/Button/Button.mdx";

export const controls = [
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    defaultValue: "Book now",
  },
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
  {
    type: "enum",
    label: "Icon position",
    propertyName: "iconPosition",
    required: true,
    options: [
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
    ],
    defaultValue: "start",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    required: true,
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
      { label: "Secondary Neutral", value: "secondary-neutral" },
      { label: "Tertiary", value: "tertiary" },
      { label: "Tertiary Neutral", value: "tertiary-neutral" },
      { label: "Inherit", value: "tertiary-inherit" },
      { label: "White", value: "white" },
      { label: "Elevated", value: "elevated" },
    ],
    defaultValue: "primary",
  },
  {
    type: "boolean",
    label: "Destructive",
    propertyName: "destructive",
  },
  {
    type: "enum",
    label: "Type",
    propertyName: "type",
    options: [
      { label: "Button", value: "button" },
      { label: "Submit", value: "submit" },
    ],
    defaultValue: "button",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
  {
    type: "boolean",
    label: "Loading",
    propertyName: "loading",
    required: false,
  },
  {
    type: "string",
    label: "Loading aria label",
    propertyName: "loadingAriaLabel",
    defaultValue: "Loading",
    required: false,
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "boolean",
    label: "Wide",
    propertyName: "wide",
  },
  {
    type: "string",
    label: "Href",
    propertyName: "href",
    defaultValue: undefined,
  },
];

export default {
  name: "Components/Elements/Button",
  readme,
  keywords: ["action", "submit", "clickable"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=14414%3A1562",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Button"],
    },
  },
  playground: {
    template: (props: ButtonProps) => {
      const variant = props.variant;

      if (variant === "tertiary-inherit") {
        return (
          <div
            style={{
              background: "#333",
              color: "#fff",
            }}
          >
            <Button {...props} />
          </div>
        );
      }

      return <Button {...props} />;
    },
    controls,
  },
  examples: {
    variants: {
      template: () => (
        <Stack direction="row">
          <Button>Book now</Button>
          <Button variant="secondary">Save to list</Button>
          <Button variant="tertiary">Continue to the website</Button>
          <Button variant="secondary-neutral">Get Directions</Button>
          <Button variant="tertiary-neutral">Ignore</Button>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
    },
    tertiaryInherit: {
      template: () => (
        <div
          style={{
            padding: 8,
            background: "#333",
            color: "#fff",
          }}
        >
          <Button variant="tertiary-inherit" text="Save to list" />
        </div>
      ),
    },
    white: {
      template: () => (
        <div
          style={{
            position: "relative",
          }}
        >
          <AspectRatio ratio="16:9">
            <Image
              src="https://picsum.photos/250/212"
              alt="A random image from Unsplash"
            />
          </AspectRatio>
          <Button
            attributes={{
              style: { position: "absolute", bottom: "8px", left: "8px" },
            }}
            variant="white"
            text="Find Deals"
          />
        </div>
      ),
    },
    elevated: {
      template: () => (
        <Stack direction="row" gap={2}>
          <Button variant="elevated" text="Compare" />
          <Button variant="elevated" icon={LocationIcon} />
        </Stack>
      ),
    },
    destructive: {
      template: () => (
        <Stack direction="row">
          <Button destructive text="Delete profile" />
          <Button destructive variant="secondary" text="Cancel subscription" />
          <Button destructive variant="elevated" icon={HeartIcon} />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
    },
    loading: {
      template: () => (
        <Button loading loadingAriaLabel="Placing booking">
          Book now
        </Button>
      ),
    },
    disabled: {
      template: () => (
        <Button disabled onClick={() => {}}>
          Book now
        </Button>
      ),
    },
    icon: {
      template: () => (
        <Stack direction="row">
          <Button icon={InboxIcon} text="Save to list" />
          <Button icon={InboxIcon} text="Save to list" iconPosition="end" />
          <Button icon={InboxIcon} />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
    },
    size: {
      template: () => <Button size="large" text="Book now" />,
    },
    wide: {
      template: () => <Button wide={{ s: true, m: false }}>Book now</Button>,
    },
    aligner: {
      template: () => (
        <Stack>
          <Text variant="featured_3">Title content</Text>
          <Button.Aligner alignment="start">
            <Button text="Search" variant="tertiary" />
          </Button.Aligner>
          <Text>Body content</Text>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Text", "Stack"],
        },
      },
    },
    responsive: {
      template: () => (
        <Button wide={{ s: true, m: false }} size={{ s: "large", m: "medium" }}>
          Book now
        </Button>
      ),
    },
  },
};
