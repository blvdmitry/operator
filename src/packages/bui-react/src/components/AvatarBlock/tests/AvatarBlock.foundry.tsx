import React from "react";
// @ts-ignore
import { omitProps } from "@bookingcom/foundry-react/utilities";
import { controls as defaultAvatarControls } from "components/Avatar/tests/Avatar.foundry";
import AvatarBlock from "components/AvatarBlock";
import Box from "components/Box";
import readme from "components/AvatarBlock/AvatarBlock.mdx";

const avatarControls = omitProps(defaultAvatarControls, ["size", "ariaLabel"]);

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    required: true,
    defaultValue: "Mike McCarthy",
  },
  {
    type: "string",
    label: "Subtitle",
    propertyName: "subtitle",
    defaultValue: "mike.mccarthy@booking.com",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [{ label: "Inherit", value: "inherit" }],
  },
  {
    type: "object",
    label: "Avatar",
    propertyName: "avatar",
    controls: avatarControls,
    required: true,
  },
];

export default {
  name: "Components/Patterns/Avatar block",
  readme,
  keywords: ["thumbnail", "flag", "photo", "gravatar", "profile", "user"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=370%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["AvatarBlock"],
    },
  },
  playground: {
    template: (props: any) => <AvatarBlock {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <AvatarBlock
          title="Mike McCarthy"
          subtitle="mike.mccarthy@booking.com"
          avatar={{
            src: "https://picsum.photos/100",
          }}
        />
      ),
    },
    colorInherit: {
      template: () => (
        <Box backgroundColor="brand_primary" borderRadius={100}>
          <AvatarBlock
            color="inherit"
            title="Mike McCarthy"
            subtitle="mike.mccarthy@booking.com"
            avatar={{
              src: "https://picsum.photos/100",
              outline: "accent",
            }}
          />
        </Box>
      ),
    },
    responsive: {
      template: () => (
        <AvatarBlock
          color="inherit"
          title="Mike McCarthy"
          subtitle="mike.mccarthy@booking.com"
          size={{ s: "large", m: "medium", l: "small" }}
          avatar={{
            src: "https://picsum.photos/100",
            outline: "accent",
          }}
        />
      ),
    },
  },
};
