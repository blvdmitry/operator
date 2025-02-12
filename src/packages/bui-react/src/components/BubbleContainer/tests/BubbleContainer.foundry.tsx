import React from "react";
import {
  BellNormalIcon,
  SuitcaseIcon,
} from "@bookingcom/bui-assets-react/streamline";
import Placeholder from "components/Placeholder";
import BubbleContainer from "components/BubbleContainer";
import Icon from "components/Icon";
import Stack from "components/Stack";
import readme from "components/BubbleContainer/BubbleContainer.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Destructive", value: "destructive" },
      { label: "Neutral", value: "neutral" },
    ],
    defaultValue: "destructive",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
    defaultValue: "99+",
  },
  {
    type: "string",
    label: "Accessibility Label",
    propertyName: "ariaLabel",
    defaultValue: "aria label for bubble",
  },
];

export default {
  name: "Components/Containers/Bubble container",
  readme,
  keywords: ["count", "message", "notification", "conversation"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4240%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["BubbleContainer"],
    },
  },
  playground: {
    template: (props: any) => (
      <BubbleContainer {...props}>
        <Placeholder width="24px" height="24px" />
      </BubbleContainer>
    ),
    controls,
  },
  examples: {
    icons: {
      template: () => (
        <Stack direction="column" gap={4}>
          <Stack direction="row" gap={8}>
            <BubbleContainer value="18">
              <Icon size="large" svg={BellNormalIcon} />
            </BubbleContainer>
            <BubbleContainer value="">
              <Icon size="large" svg={BellNormalIcon} />
            </BubbleContainer>
          </Stack>
          <Stack direction="row" gap={8}>
            <BubbleContainer value="18">
              <Icon size="large" svg={SuitcaseIcon} />
            </BubbleContainer>
            <BubbleContainer value="">
              <Icon size="large" svg={SuitcaseIcon} />
            </BubbleContainer>
          </Stack>
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Icon"],
        },
      },
    },
  },
};
