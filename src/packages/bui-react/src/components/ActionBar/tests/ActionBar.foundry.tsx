import React from "react";
import {
  TrashIcon,
  CheckInIcon,
  CheckOutIcon,
  PlusMinusIcon,
  SendMessageIcon,
} from "@bookingcom/bui-assets-react/streamline";
import { controls as buttonControls } from "components/Button/tests/Button.foundry";
import Placeholder from "components/Placeholder";
import ActionBar from "components/ActionBar";
import Button from "components/Button";
import Icon from "components/Icon";
import InputText from "components/InputText";
import Stack from "components/Stack";
import Title from "components/Title";
import Chip from "components/Chip";
import readme from "components/ActionBar/ActionBar.mdx";
import InputTextarea from "components/InputTextarea";

export const controls = [
  {
    type: "boolean",
    label: "Top Content",
    propertyName: "topContent",
  },
  {
    type: "boolean",
    label: "Fill Equally",
    propertyName: "fillEqually",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
  {
    type: "enum",
    label: "VerticalAlignment",
    propertyName: "verticalAlignment",
    options: [
      { label: "Start", value: "start" },
      { label: "Center", value: "center" },
      { label: "End", value: "end" },
    ],
  },
  {
    type: "boolean",
    label: "Elevated",
    propertyName: "elevated",
  },
  {
    type: "object",
    label: "Button",
    propertyName: "button",
    controls: buttonControls,
  },
];

export default {
  name: "Components/Patterns/Action bar",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=159%3A0",
  },
  keywords: ["panel", "information", "content"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["ActionBar"],
    },
  },
  playground: {
    template: (props: any) => (
      <ActionBar {...props}>
        <Placeholder height="24px" />
      </ActionBar>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <ActionBar
          button={{
            text: "Book Now",
          }}
        >
          <Placeholder height="24px" />
        </ActionBar>
      ),
    },
    elevated: {
      template: () => (
        <ActionBar
          button={{
            text: "Show Results",
          }}
          elevated
        >
          <Title title="1,430 properties" subtitle="of 3333" />
        </ActionBar>
      ),
    },
    startContent: {
      template: () => (
        <ActionBar
          button={{
            text: "Show Results",
          }}
        >
          <Title title="1,430 properties" subtitle="of 3333" />
        </ActionBar>
      ),
    },
    fillEqually: {
      template: () => (
        <ActionBar
          button={{
            text: "Save",
            size: "large",
          }}
          fillEqually
        >
          <Button
            text="Delete"
            icon={TrashIcon}
            destructive
            variant="secondary"
            size="large"
            wide
          />
        </ActionBar>
      ),
    },
    topContent: {
      template: () => (
        <ActionBar
          button={{
            text: "Done",
            size: "large",
          }}
          topContent={
            <Stack direction="row" gap={2}>
              <Stack.Item grow>
                <InputText
                  name="checkIn"
                  value="27-12-2021"
                  startSlot={<Icon svg={CheckInIcon} />}
                  size="large"
                />
              </Stack.Item>
              <Stack.Item grow>
                <InputText
                  name="checkOut"
                  value="03-01-2022"
                  startSlot={<Icon svg={CheckOutIcon} />}
                  size="large"
                />
              </Stack.Item>
            </Stack>
          }
        />
      ),
    },
    topContentFill: {
      template: () => (
        <ActionBar
          button={{
            text: "Select dates",
            size: "large",
          }}
          topContentFill
          topContent={
            <div
              style={{
                overflow: "scroll",
                whiteSpace: "nowrap",
                display: "flex",
                gap: "var(--bui_spacing_2x)",
              }}
            >
              <Chip selected label="Exact days" variant="action" />
              {Array.from(Array(10).keys()).map((index) => {
                return (
                  <Chip
                    key={index}
                    icon={PlusMinusIcon}
                    label={`${1 + index * 2} days`}
                    variant="toggle"
                  />
                );
              })}
            </div>
          }
        />
      ),
    },
    responsive: {
      template: () => (
        <ActionBar
          button={{
            text: "Show Results",
          }}
          elevated={{ s: true, m: false }}
          size={{ s: "large", m: "medium" }}
        >
          <Title title="1,430 properties" subtitle="of 3333" />
        </ActionBar>
      ),
    },
    verticalAlignment: {
      template: () => (
        <ActionBar
          verticalAlignment="end"
          button={{
            icon: SendMessageIcon,
            variant: "tertiary",
            size: "large",
          }}
        >
          <InputTextarea name="message" minVisibleLines={4} />
        </ActionBar>
      ),
    },
  },
};
