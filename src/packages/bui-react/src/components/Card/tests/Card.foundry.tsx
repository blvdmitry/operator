import React from "react";
import Title from "components/Title";
import Button from "components/Button";
import Text from "components/Text";
import Stack from "components/Stack";
import Box from "components/Box";
import Link from "components/Link";
import AspectRatio from "components/AspectRatio";
import Image from "components/Image";
import Placeholder from "components/Placeholder";
import Card, { CardProps } from "components/Card";
import readme from "components/Card/Card.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Neutral", value: "neutral" },
      { label: "Elevated", value: "elevated" },
      { label: "Success", value: "success" },
      { label: "Error", value: "error" },
      { label: "Callout", value: "callout" },
      { label: "Accent", value: "accent" },
      { label: "Hint", value: "hint" },
    ],
    defaultValue: "neutral",
  },
  {
    type: "boolean",
    label: "Fill",
    propertyName: "fill",
    defaultValue: false,
  },
  {
    type: "boolean",
    label: "Bleed",
    propertyName: "bleed",
    defaultValue: false,
  },
];

export default {
  name: "Components/Containers/Card",
  readme,
  keywords: ["box", "frame"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=60%3A11",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Card"],
    },
  },
  playground: {
    template: (props: CardProps) => {
      return (
        <Card {...props}>
          <Placeholder />
        </Card>
      );
    },
    controls,
  },
  examples: {
    empty: {
      template: () => (
        <Card>
          <Placeholder />
        </Card>
      ),
    },
    composition: {
      template: () => (
        <Card>
          <Stack gap={4}>
            <Title
              variant="headline_3"
              title="Title"
              subtitle="Optional Subtitle"
            />
            <Text>
              Card body text that doesn’t wrap past 4 lines. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </Text>

            <Stack.Item>
              <Button>Card Action</Button>
            </Stack.Item>
          </Stack>
        </Card>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack", "Title", "Text", "Button"],
        },
      },
    },
    media: {
      template: () => (
        <Card>
          <Stack direction="row" gap={3}>
            <Stack.Item>
              <AspectRatio ratio="1:1" width="80px">
                <Image
                  src="https://picsum.photos/360"
                  alt="Description for a11y"
                />
              </AspectRatio>
            </Stack.Item>

            <Stack.Item grow>
              <Stack gap={4}>
                <Title
                  variant="strong_1"
                  title="Hotel Name"
                  subtitle="Optional Subtitle"
                />
                <Stack.Item>
                  <Text>1 room, 2 adults</Text>
                  <Text color="constructive">Confirmed</Text>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Card>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Image", "AspectRatio", "Stack", "Title", "Text"],
        },
      },
    },
    fill: {
      template: () => (
        <Card fill>
          <AspectRatio ratio="16:9">
            <Image src="https://picsum.photos/360" alt="Description for a11y" />
          </AspectRatio>
          <Box>
            <Placeholder />
          </Box>
        </Card>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Box", "Image", "AspectRatio"],
        },
      },
    },
    bleed: {
      template: () => (
        <Card bleed>
          <Placeholder />
        </Card>
      ),
    },
    elevated: {
      template: () => (
        <Card variant="elevated">
          <Placeholder />
        </Card>
      ),
    },
    variants: {
      template: () => (
        <Stack direction="column">
          {(
            [
              "neutral",
              "elevated",
              "success",
              "error",
              "callout",
              "accent",
              "hint",
            ] as CardProps["variant"][]
          ).map((variant) => (
            <Card key={variant} variant={variant}>
              <Placeholder />
            </Card>
          ))}
        </Stack>
      ),
    },
    color: {
      template: () => (
        <Box
          borderColor="neutral"
          backgroundColor="neutral_alt"
          borderRadius={200}
        >
          <Stack gap={2}>
            <Title variant="strong_1" title="Tip: Attract more guests" />
            <Text>
              Attract more guests by offering the Genius discount on multiple
              rooms!
            </Text>
            <Link>Add discount</Link>
          </Stack>
        </Box>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Box", "Stack", "Title", "Text", "Link"],
        },
      },
    },
  },
};
