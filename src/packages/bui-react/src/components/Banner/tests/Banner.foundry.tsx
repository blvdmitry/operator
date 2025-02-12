import React from "react";
import { InfoSignIcon } from "@bookingcom/bui-assets-react/streamline";
import Placeholder from "components/Placeholder";
import { controls as buttonControls } from "components/Button/tests/Button.foundry";
import Banner, { BannerProps } from "components/Banner";
import Stack from "components/Stack";
import readme from "components/Banner/Banner.mdx";

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Booking.com in your pocket!",
  },
  {
    type: "slot",
    label: "Text",
    propertyName: "text",
    defaultValue:
      "No need to print your booking confirmations for your 2 upcoming trips - see them in the app!",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Neutral", value: "neutral" },
      { label: "Hint", value: "hint" },
      { label: "Callout", value: "callout" },
    ],
    default: "neutral",
  },
  {
    type: "object",
    label: "Top Image",
    propertyName: "topImage",
    controls: [
      {
        type: "string",
        label: "Image URL",
        propertyName: "src",
        defaultValue: "https://picsum.photos/360",
      },
      {
        type: "string",
        label: "Alt",
        propertyName: "alt",
        defaultValue: "Photo description",
      },
      {
        type: "enum",
        label: "Content mode",
        propertyName: "contentMode",
        options: [
          { label: "Fill", value: "fill" },
          { label: "Fit", value: "fit" },
        ],
        default: "fill",
      },
    ],
  },
  {
    type: "object",
    label: "Start Image",
    propertyName: "startImage",
    controls: [
      {
        type: "string",
        label: "Image URL",
        propertyName: "src",
        defaultValue: "https://picsum.photos/360",
      },
      {
        type: "string",
        label: "Alt",
        propertyName: "alt",
        defaultValue: "Photo description",
      },
      {
        type: "enum",
        label: "Content mode",
        propertyName: "contentMode",
        options: [
          { label: "Fill", value: "fill" },
          { label: "Fit", value: "fit" },
        ],
        default: "fill",
      },
    ],
  },
  {
    type: "string",
    label: "Close aria label",
    propertyName: "closeAriaLabel",
    defaultValue: "Close banner",
    required: true,
  },
  {
    type: "icon",
    label: "Start icon",
    propertyName: "startIcon",
  },
  {
    type: "enum",
    label: "Start icon color",
    propertyName: "startIconColor",
    options: [
      { label: "Destructive", value: "destructive" },
      { label: "Callout", value: "callout" },
      { label: "Accent", value: "accent" },
      { label: "Constructive", value: "constructive" },
      { label: "Neutral", value: "neutral" },
      { label: "Neutral Alt", value: "neutral_alt" },
      { label: "White", value: "white" },
      { label: "Action", value: "action" },
      { label: "Brand Genius", value: "brand_genius_secondary" },
    ],
  },
  {
    type: "boolean",
    label: "Dismissible",
    propertyName: "dismissible",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Shown",
    propertyName: "shown",
  },
  {
    type: "boolean",
    label: "Bleed on mobile",
    propertyName: "bleed",
    defaultValue: true,
  },
  {
    type: "array",
    label: "Actions",
    propertyName: "actions",
    item: {
      type: "object",
      propertyName: "action",
      controls: buttonControls,
    },
    defaultValue: [
      {
        text: "Download the app",
        variant: "secondary",
      },
    ],
  },
];

export default {
  name: "Components/Patterns/Banner",
  readme,
  keywords: ["content", "important", "message", "alert"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=371%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Banner"],
    },
  },
  playground: {
    template: (props: BannerProps) => <Banner {...props} />,
    controls,
  },
  examples: {
    variants: {
      height: "xlarge",
      template: () => (
        <Stack direction="column">
          <Banner
            title="Booking.com in your pocket!"
            text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
            actions={[
              {
                text: "Download the app",
                variant: "secondary",
              },
            ]}
            closeAriaLabel="Close banner"
          />
          <Banner
            variant="hint"
            title="It pays to have friends!"
            text="Get € 15 for every friend you invite to Booking.com"
            actions={[
              {
                text: "Start inviting",
                variant: "secondary",
              },
            ]}
            closeAriaLabel="Close banner"
          />
          <Banner
            variant="callout"
            title="It pays to have friends!"
            text="Get € 15 for every friend you invite to Booking.com"
            actions={[
              {
                text: "Start inviting",
                variant: "secondary",
              },
            ]}
            closeAriaLabel="Close banner"
          />
        </Stack>
      ),
    },
    neutralSlot: {
      template: () => (
        <Banner closeAriaLabel="Close banner">
          <Placeholder height="150px" />
        </Banner>
      ),
    },
    startImage: {
      template: () => (
        <Banner
          startImage={{
            src: "https://picsum.photos/360",
            alt: "Description for a11y",
          }}
          title="Booking.com in your pocket!"
          text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
          actions={[
            {
              text: "Download the app",
              variant: "secondary",
            },
          ]}
          closeAriaLabel="Close banner"
        />
      ),
    },
    topImage: {
      template: () => (
        <Banner
          topImage={{
            src: "https://picsum.photos/360",
            alt: "Description for a11y",
          }}
          title="Booking.com in your pocket!"
          text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
          actions={[
            {
              text: "Download the app",
              variant: "secondary",
            },
          ]}
          closeAriaLabel="Close banner"
        />
      ),
    },
    icon: {
      template: () => (
        <Banner
          startIcon={InfoSignIcon}
          title="Booking.com in your pocket!"
          text="No need to print your booking confirmations for your 2 upcoming trips - see them in the app!"
          actions={[
            {
              text: "Download the app",
              variant: "secondary",
            },
          ]}
          closeAriaLabel="Close banner"
        />
      ),
    },
  },
};
