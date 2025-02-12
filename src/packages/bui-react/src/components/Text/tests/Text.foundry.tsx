import React from "react";
import Text from "components/Text";
import Stack from "components/Stack";
import readme from "components/Text/Text.mdx";

export const controls = [
  {
    type: "string",
    label: "Text",
    propertyName: "children",
    defaultValue: "Some text",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Display 1", value: "display_1" },
      { label: "Display 2", value: "display_2" },
      { label: "Display 3", value: "display_3" },
      { label: "Featured 1", value: "featured_1" },
      { label: "Featured 2", value: "featured_2" },
      { label: "Featured 3", value: "featured_3" },
      { label: "Headline 1", value: "headline_1" },
      { label: "Headline 2", value: "headline_2" },
      { label: "Headline 3", value: "headline_3" },
      { label: "Strong 1", value: "strong_1" },
      { label: "Strong 2", value: "strong_2" },
      { label: "Emphasized 1", value: "emphasized_1" },
      { label: "Emphasized 2", value: "emphasized_2" },
      { label: "Body 1", value: "body_1" },
      { label: "Body 2", value: "body_2" },
      { label: "Small 1", value: "small_1" },
      { label: "Small 2", value: "small_2" },
    ],
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [
      { label: "Neutral", value: "neutral" },
      { label: "Neutral Alt", value: "neutral_alt" },
      { label: "Action", value: "action" },
      { label: "Constructive", value: "constructive" },
      { label: "Destructive", value: "destructive" },
      { label: "Accent", value: "accent" },
      { label: "Callout", value: "callout" },
      { label: "White", value: "white" },
      { label: "Brand Primary", value: "brand_primary" },
      { label: "Brand Genius Secondary", value: "brand_genius_secondary" },
      { label: "Inherit", value: "inherit" },
    ],
  },
  {
    type: "enum",
    label: "Text Align",
    propertyName: "align",
    options: [
      { label: "left", value: "left" },
      { label: "right", value: "right" },
      { label: "center", value: "center" },
    ],
  },
  {
    type: "enum",
    label: "Text Decoration",
    propertyName: "decoration",
    options: [
      { label: "underline", value: "underline" },
      { label: "underline-dotted", value: "underline-dotted" },
      { label: "line-through", value: "line-through" },
    ],
  },
  {
    type: "string",
    label: "Tag name",
    propertyName: "tagName",
  },
  {
    type: "boolean",
    label: "Bidirectional",
    propertyName: "bidirectional",
  },
];

export default {
  name: "Components/Utilities/Text",
  readme,
  keywords: ["text", "display", "heading", "content", "underline"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Text"],
    },
  },
  playground: {
    template: (props: any) => <Text {...props} />,
    controls,
  },
  examples: {
    display: {
      template: () => (
        <Stack>
          <Text variant="display_1">Display 1</Text>
          <Text variant="display_2">Display 2</Text>
          <Text variant="display_3">Display 3</Text>
        </Stack>
      ),
    },
    featured: {
      template: () => (
        <Stack>
          <Text variant="featured_1">Featured 1</Text>
          <Text variant="featured_2">Featured 2</Text>
          <Text variant="featured_3">Featured 3</Text>
        </Stack>
      ),
    },
    headline: {
      template: () => (
        <Stack>
          <Text variant="headline_1">Headline 1</Text>
          <Text variant="headline_2">Headline 2</Text>
          <Text variant="headline_3">Headline 3</Text>
        </Stack>
      ),
    },
    strong: {
      template: () => (
        <Stack>
          <Text variant="strong_1">Strong 1</Text>
          <Text variant="strong_2">Strong 2</Text>
        </Stack>
      ),
    },
    emphasized: {
      template: () => (
        <Stack>
          <Text variant="emphasized_1">Emphasized 1</Text>
          <Text variant="emphasized_2">Emphasized 2</Text>
        </Stack>
      ),
    },
    body: {
      template: () => (
        <Stack>
          <Text variant="body_1">Body 1</Text>
          <Text variant="body_2">Body 2</Text>
        </Stack>
      ),
    },
    small: {
      template: () => (
        <Stack>
          <Text variant="small_1">Small 1</Text>
          <Text variant="small_2">Small 2</Text>
        </Stack>
      ),
    },
    inline: {
      template: () => (
        <div>
          <Text key="1" tagName="span">
            Inline text{" "}
          </Text>
          <Text key="2" tagName="span">
            Inline text{" "}
          </Text>
        </div>
      ),
    },
    decoration: {
      template: () => (
        <div>
          <Text key="1" decoration="underline">
            Underlined
          </Text>
          <Text key="2" decoration="underline-dotted">
            Underlined-dotted
          </Text>
          <Text key="2" decoration="line-through">
            Line-through
          </Text>
        </div>
      ),
    },
    bidirectional: {
      template: () => <Text bidirectional>8 on Oregon Boutique Lodge</Text>,
    },
  },
};
