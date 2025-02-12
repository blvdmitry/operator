import React from "react";
import { GeniusLogoWhite } from "@bookingcom/bui-assets-react/genius";
import { TravelSustainableIcon } from "@bookingcom/bui-assets-react/streamline";
import Stack from "components/Stack";
import InputText from "components/InputText";
import AspectRatio from "components/AspectRatio";
import Badge from "components/Badge";
import readme from "components/Badge/Badge.mdx";

export const controls = [
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    required: true,
    defaultValue: "Bestseller",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Outline", value: "outline" },
      { label: "Brand primary", value: "brand-primary" },
      { label: "Genius primary", value: "brand-genius-primary" },
      { label: "Constructive", value: "constructive" },
      { label: "Accent", value: "accent" },
      { label: "Callout", value: "callout" },
      { label: "Destructive", value: "destructive" },
      { label: "Media", value: "media" },
    ],
  },
  {
    type: "boolean",
    label: "Alternative",
    propertyName: "alternative",
  },
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
  {
    type: "string",
    label: "Badge aria-label",
    propertyName: "ariaLabel",
  },
  {
    type: "string",
    label: "Close button aria-label",
    propertyName: "closeAriaLabel",
  },
  {
    type: "handler",
    label: "Close handler",
    propertyName: "onAfterClose",
  },
  {
    type: "boolean",
    label: "Shown",
    propertyName: "shown",
  },
];

export default {
  name: "Components/Elements/Badge",
  readme,
  keywords: ["bubble", "notification", "tag", "status", "icon"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=162%3A310",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Badge"],
    },
  },
  playground: {
    template: (props: any) => <Badge {...props} />,
    controls,
  },
  examples: {
    variants: {
      template: () => (
        <Stack direction="row">
          <Badge text="Bestseller" />
          <Badge text="Promoted" variant="outline" />
          <Badge text="Hotel" variant="brand-primary" />
          <Badge text="Genius" variant="brand-genius-primary" />
          <Badge text="Free breakfast" variant="constructive" />
          <Badge text="Filling Fast" variant="accent" />
          <Badge text="Value Deal" variant="callout" />
          <Badge text="Cancelled" variant="destructive" />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Group"],
        },
      },
    },
    media: {
      template: () => (
        <Stack>
          <AspectRatio ratio="16:9">
            <img src="https://picsum.photos/360" alt="Example" />
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <Badge text="Media" variant="media" />
            </div>
          </AspectRatio>

          <AspectRatio ratio="16:9">
            <img src="https://picsum.photos/360" alt="Example" />
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <Badge text="Media" variant="media" alternative />
            </div>
          </AspectRatio>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Group", "AspectRatio"],
        },
      },
    },
    alternative: {
      template: () => (
        <Stack direction="row">
          <Badge text="Bestseller" alternative />
          <Badge text="Promoted" variant="outline" alternative />
          <Badge text="Hotel" variant="brand-primary" alternative />
          <Badge text="Free breakfast" variant="constructive" alternative />
          <Badge text="Filling Fast" variant="accent" alternative />
          <Badge text="Value Deal" variant="callout" alternative />
          <Badge text="Cancelled" variant="destructive" alternative />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Group"],
        },
      },
    },
    dismissible: {
      template: () => (
        <InputText
          label="Facilities"
          name="type"
          startSlot={
            <Badge
              text="Room service"
              variant="brand-primary"
              closeAriaLabel="Dismiss"
              onAfterClose={() => {}}
            />
          }
        />
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["InputText"],
        },
      },
    },
    icon: {
      template: () => (
        <Stack direction="column" alignItems="start">
          <Badge
            ariaLabel="Genius badge"
            icon={GeniusLogoWhite}
            variant="brand-genius-primary"
          />
          <Badge
            text="Travel Sustainable property"
            icon={TravelSustainableIcon}
            variant="constructive"
            alternative
          />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["InputText"],
        },
      },
    },
  },
};
