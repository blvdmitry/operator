import React from "react";
import CollapsedText from "components/CollapsedText";
import readme from "components/CollapsedText/CollapsedText.mdx";

const fixtures = {
  text: "This is an example. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
  readMoreLabel: "Read more",
  readLessLabel: "Read less",
};

export const controls = [
  {
    type: "slot",
    label: "Text",
    propertyName: "text",
    defaultValue: fixtures.text,
  },
  {
    type: "enum",
    label: "Text Variant",
    propertyName: "variant",
    options: [
      { label: "Body 1", value: "body_1" },
      { label: "Body 2", value: "body_2" },
    ],
  },
  {
    type: "number",
    label: "Visible Lines",
    propertyName: "visibleLines",
    defaultValue: 4,
  },
  {
    type: "string",
    label: "Read More Label",
    propertyName: "readMoreLabel",
    defaultValue: fixtures.readMoreLabel,
  },
  {
    type: "string",
    label: "Read Less Label",
    propertyName: "readLessLabel",
    defaultValue: fixtures.readLessLabel,
  },
];

export default {
  name: "Components/Patterns/Collapsed text",
  readme,
  keywords: ["expandable", "show more", "show less", "read more", "read less"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["CollapsedText"],
    },
  },
  playground: {
    template: (props: any) => <CollapsedText {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => <CollapsedText {...fixtures} />,
    },
    body1: {
      template: () => <CollapsedText {...fixtures} variant="body_1" />,
    },
    visibleLines: {
      template: () => <CollapsedText {...fixtures} visibleLines={6} />,
    },
    tooSmallToCollapse: {
      template: () => <CollapsedText {...fixtures} />,
    },
    paragraphs: {
      template: () => (
        <CollapsedText
          text="This is an example. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          readMoreLabel="Read more"
          readLessLabel="Read less"
        />
      ),
    },
  },
};
