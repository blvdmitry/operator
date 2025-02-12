import React from "react";
import { PersonHalfIcon } from "@bookingcom/bui-assets-react/streamline";
import Avatar, { AvatarProps } from "components/Avatar";
import Stack from "components/Stack";
import Box from "components/Box";
import readme from "components/Avatar/Avatar.mdx";

export const controls = [
  {
    type: "string",
    label: "Image URL",
    propertyName: "src",
  },
  {
    type: "string",
    label: "Country code",
    propertyName: "countryCode",
    defaultValue: "nl",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Larger", value: "larger" },
      { label: "Largest", value: "largest" },
    ],
    defaultValue: "small",
  },
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    defaultValue: "NL",
  },
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [
      { label: "Callout", value: "callout" },
      { label: "Accent", value: "accent" },
      { label: "Constructive", value: "constructive" },
      { label: "Destructive", value: "destructive" },
      { label: "Inherit", value: "inherit" },
    ],
  },
  {
    type: "enum",
    label: "Outline",
    propertyName: "outline",
    options: [
      { label: "Destructive", value: "destructive" },
      { label: "Callout", value: "callout" },
      { label: "Accent", value: "accent" },
      { label: "Constructive", value: "constructive" },
      { label: "White", value: "white" },
    ],
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
    defaultValue: "Person (or Entity) name",
  },
];

export default {
  name: "Components/Elements/Avatar",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=161%3A310",
  },
  keywords: ["thumbnail", "flag", "photo", "gravatar", "profile", "user"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Avatar"],
    },
  },
  playground: {
    template: (props: AvatarProps) => <Avatar {...props} />,
    controls,
  },
  examples: {
    size: {
      template: () => (
        <Stack direction="row">
          <Avatar
            src="https://picsum.photos/48"
            size="small"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            src="https://picsum.photos/64"
            size="medium"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            src="https://picsum.photos/96"
            size="large"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            src="https://picsum.photos/128"
            size="larger"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            src="https://picsum.photos/256"
            size="largest"
            ariaLabel="Person (or Entity) name"
          />
        </Stack>
      ),
    },
    color: {
      template: () => (
        <Stack direction="row">
          <Avatar text="DS" ariaLabel="Person (or Entity) name" />
          <Avatar
            text="DS"
            color="constructive"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            text="DS"
            color="destructive"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            text="DS"
            color="accent"
            ariaLabel="Person (or Entity) name"
          />
          <Avatar
            text="DS"
            color="callout"
            ariaLabel="Person (or Entity) name"
          />
        </Stack>
      ),
    },
    colorInherit: {
      template: () => (
        <Box backgroundColor="brand_primary">
          <Avatar
            text="DS"
            color="inherit"
            ariaLabel="Person (or Entity) name"
            size="large"
          />
        </Box>
      ),
    },
    outline: {
      template: () => (
        <Avatar
          text="DS"
          color="inherit"
          outline="accent"
          ariaLabel="Person (or Entity) name"
        />
      ),
    },
    fallback: {
      template: () => (
        <Stack direction="row">
          <Avatar text="DS" ariaLabel="Person (or Entity) name" />
          <Avatar icon={PersonHalfIcon} ariaLabel="Person (or Entity) name" />
        </Stack>
      ),
    },
    asset: {
      template: () => (
        <Avatar countryCode="nl" size="small" ariaLabel="Netherlands flag" />
      ),
    },
    fallbackUrl: {
      template: () => (
        <Avatar
          text="DS"
          ariaLabel="Person (or Entity) name"
          src="http://ciccio.jpg"
        />
      ),
    },
    responsive: {
      template: () => (
        <Avatar
          src="https://picsum.photos/48"
          size={{ s: "largest", m: "large", l: "medium", xl: "small" }}
          ariaLabel="Person (or Entity) name"
        />
      ),
    },
  },
};
