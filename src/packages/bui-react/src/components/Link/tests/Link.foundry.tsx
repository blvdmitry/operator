import React from "react";
import { AlarmIcon } from "@bookingcom/bui-assets-react/streamline";
import Link from "components/Link";
import Stack from "components/Stack";
import Text from "components/Text";
import readme from "components/Link/Link.mdx";

export const controls = [
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    required: true,
    defaultValue: "See available properties",
  },
  {
    type: "string",
    label: "Href",
    propertyName: "href",
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
    options: [
      { label: "Primary", value: "primary" },
      { label: "Secondary", value: "secondary" },
    ],
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
];

export default {
  name: "Components/Elements/Link",
  readme,
  keywords: ["hyperlink", "url", "anchor", "redirect"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A518",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Link"],
    },
  },
  playground: {
    template: (props: any) => <Link {...props} />,
    controls,
  },
  examples: {
    text: {
      template: () => (
        <div>
          <p>
            Cancellation and prepayment policies vary according to room type.
            Please <Link text="check the room conditions" /> when selecting your
            room above.
          </p>
          <p>
            Secondary <Link text="links" variant="secondary" /> within
            paragraphs of text are automatically underlined.
          </p>
        </div>
      ),
    },
    variants: {
      template: () => (
        <Stack direction="row">
          <Link text="See available properties" icon={AlarmIcon} />
          <Link
            variant="secondary"
            text="Find out more about this feature"
            icon={AlarmIcon}
          />
        </Stack>
      ),
    },
    inheritance: {
      template: () => (
        <Text variant="headline_1">
          <Link>Headline link</Link>
        </Text>
      ),
    },
    icon: {
      template: () => (
        <Stack direction="row">
          <Link text="See available properties" icon={AlarmIcon} />
          <Link
            iconPosition="end"
            text="See available properties"
            icon={AlarmIcon}
          />
        </Stack>
      ),
    },
  },
};
