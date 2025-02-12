import React from "react";
import {
  EditIcon,
  SpeechBubbleIcon,
  BedAddIcon,
} from "@bookingcom/bui-assets-react/streamline";
import Bubble from "components/Bubble";
import DropdownMenu from "components/DropdownMenu";
import readme from "components/DropdownMenu/DropdownMenu.mdx";
import Button from "components/Button";

export const itemsControl = {
  type: "array",
  label: "Items",
  propertyName: "items",
  item: {
    type: "object",
    propertyName: "item",
    controls: [
      {
        type: "string",
        label: "Text",
        propertyName: "text",
        defaultValue: "Menu item",
        required: true,
      },
      {
        type: "icon",
        label: "Icon",
        propertyName: "icon",
      },
      {
        type: "string",
        label: "Text slot",
        propertyName: "textSlot",
      },
      {
        type: "string",
        label: "Start slot",
        propertyName: "startSlot",
      },
      {
        type: "string",
        label: "End slot",
        propertyName: "endSlot",
      },
      {
        type: "string",
        label: "Href",
        propertyName: "href",
      },
      {
        type: "boolean",
        label: "Disabled",
        propertyName: "disabled",
      },
    ],
  },
  defaultValue: [
    {
      text: "Change dates",
    },
    {
      text: "Add or remove a room",
    },
  ],
};

export const sectionsControl = {
  type: "array",
  label: "Sections",
  propertyName: "sections",
  item: {
    type: "object",
    propertyName: "section",
    controls: [itemsControl],
  },
};

export const controls = [
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
  },
  itemsControl,
  sectionsControl,
];

export default {
  name: "Components/Patterns/Dropdown menu",
  readme,
  keywords: ["menu", "select"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A716",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["DropdownMenu", "Button"],
    },
  },
  playground: {
    template: (props: any) => (
      <DropdownMenu {...props}>
        {(attributes) => (
          <Button text="Open dropdown" attributes={attributes} />
        )}
      </DropdownMenu>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <DropdownMenu
          items={[
            { text: "Change dates" },
            { text: "Add or remove a room" },
            { text: "Add or remove a bed" },
            { text: "Make a special request" },
          ]}
          attributes={{ "data-id": "hey" }}
        >
          {(attributes) => (
            <Button text="Open dropdown" attributes={attributes} />
          )}
        </DropdownMenu>
      ),
    },
    sections: {
      template: () => (
        <DropdownMenu
          active
          sections={[
            {
              items: [
                {
                  text: "Change dates",
                },
                {
                  text: "Add or remove a room",
                },
              ],
            },
            {
              items: [
                {
                  text: "Add or remove a bed",
                },
                {
                  text: "Make a special request",
                },
              ],
            },
          ]}
        >
          {(attributes) => (
            <Button text="Open dropdown" attributes={attributes} />
          )}
        </DropdownMenu>
      ),
    },
    icons: {
      template: () => (
        <DropdownMenu
          active
          items={[
            {
              icon: EditIcon,
              text: "Edit booking",
            },
            {
              icon: SpeechBubbleIcon,
              text: "Contact your host",
            },
            {
              icon: BedAddIcon,
              text: "Request bed",
            },
          ]}
        >
          {(attributes) => (
            <Button text="Open dropdown" attributes={attributes} />
          )}
        </DropdownMenu>
      ),
    },
    slots: {
      template: () => (
        <DropdownMenu
          active
          items={[
            {
              text: "Edit booking",
              textSlot: (
                <Bubble text="2" ariaLabel="2 updates" variant="destructive" />
              ),
              endSlot: <b>$100</b>,
            },
            {
              text: "Contact your host",
            },
            {
              text: "Request bed",
            },
          ]}
        >
          {(attributes) => (
            <Button text="Open dropdown" attributes={attributes} />
          )}
        </DropdownMenu>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Bubble"],
        },
      },
    },
    disabledItems: {
      template: () => (
        <DropdownMenu
          active
          items={[
            {
              text: "Change dates",
            },
            {
              text: "Add or remove a room",
              disabled: true,
            },
            {
              text: "Add or remove a bed",
              disabled: true,
            },
            {
              text: "Make a special request",
            },
          ]}
        >
          {(attributes) => (
            <Button text="Open dropdown" attributes={attributes} />
          )}
        </DropdownMenu>
      ),
    },
  },
};
