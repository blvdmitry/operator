import React from "react";
import Breadcrumbs from "components/Breadcrumbs";
import readme from "components/Breadcrumbs/Breadcrumbs.mdx";

export const controls = [
  {
    type: "array",
    label: "Items",
    propertyName: "items",
    required: true,
    item: {
      type: "object",
      propertyName: "item",
      controls: [
        {
          type: "string",
          label: "Text",
          propertyName: "text",
          required: true,
          defaultValue: "Breadcrumbs item",
        },
        {
          type: "string",
          label: "Href",
          propertyName: "href",
        },
        {
          type: "handler",
          label: "Click handler",
          propertyName: "onClick",
        },
      ],
    },
    defaultValue: [
      {
        text: "Home",
        onClick: true,
      },
      {
        text: "Netherlands",
        onClick: true,
      },
    ],
  },
  {
    type: "boolean",
    label: "Back",
    propertyName: "back",
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
    defaultValue: "Breadcrumbs",
  },
];

export default {
  name: "Components/Patterns/Breadcrumbs",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A0",
  },
  keywords: ["navigation", "path", "location"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Breadcrumbs"],
    },
  },
  playground: {
    template: (props: any) => <Breadcrumbs {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Breadcrumbs
          items={[
            {
              text: "Home",
              href: "#",
            },
            {
              text: "Netherlands",
              href: "#",
            },
            {
              text: "Noord Holland",
              href: "#",
            },
            {
              text: "Amsterdam hotels",
              onClick: () => {
                alert("Alert triggered with onClick handler!");
              },
            },
            {
              text: "Search results",
            },
          ]}
          ariaLabel="Breadcrumbs"
        />
      ),
    },
    back: {
      template: () => (
        <Breadcrumbs
          back
          items={[
            {
              text: "To search",
              href: "#",
            },
          ]}
        />
      ),
    },
  },
};
