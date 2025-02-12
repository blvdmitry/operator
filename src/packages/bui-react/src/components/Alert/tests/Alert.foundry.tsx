import React from "react";
import Alert, { AlertProps } from "components/Alert";
import { controls as buttonControls } from "components/Button/tests/Button.foundry";
import readme from "components/Alert/Alert.mdx";
import Text from "components/Text";
import Stack from "components/Stack";
import Button from "components/Button";

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Your booking is confirmed.",
  },
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    defaultValue: "We've sent your confirmation email to booker@booking.com.",
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
    required: true,
    options: [
      { label: "Success", value: "success" },
      { label: "Error", value: "error" },
    ],
    defaultValue: "success",
  },
  {
    type: "boolean",
    label: "Inline",
    propertyName: "inline",
  },
  {
    type: "boolean",
    label: "Bleed",
    propertyName: "bleed",
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
      },
    ],
  },
];

export default {
  name: "Components/Patterns/Alert",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=160%3A310",
  },
  keywords: ["prompt", "notification"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Alert"],
    },
  },
  playground: {
    template: (props: AlertProps) => <Alert {...props} />,
    controls,
  },
  examples: {
    variants: {
      template: () => (
        <Stack direction="column">
          <Alert
            title="Your booking is confirmed"
            text="We've sent your confirmation email to booker@booking.com"
            variant="success"
            actions={[
              {
                text: "Get Directions",
                onClick: () => console.log("Getting directions..."),
              },
            ]}
          />
        </Stack>
      ),
    },
    layout: {
      template: () => (
        <Stack direction="column">
          <Alert
            title="Your booking is confirmed"
            text="There was a problem with your payment"
            variant="error"
            inline
          />
          <Alert
            text="There was a problem with your payment"
            variant="error"
            bleed
          />
        </Stack>
      ),
    },
    responsive: {
      template: () => (
        <Alert
          title="Your booking is confirmed"
          text="There was a problem with your payment"
          variant="error"
          inline={{ s: true, m: false, l: true }}
        />
      ),
    },
    composition: {
      template: () => (
        <Alert variant="success">
          <Stack alignItems="start">
            <Text>
              You can book now, or get a quote{" "}
              <Text tagName="span" variant="strong_2">
                FOR FREE
              </Text>{" "}
              anytime before 10:00 am on March 9, 2021.
            </Text>
            <Stack direction="row">
              <Button>Book now!</Button>
              <Button variant="secondary">Get a quote?</Button>
            </Stack>
          </Stack>
        </Alert>
      ),
    },
  },
};
