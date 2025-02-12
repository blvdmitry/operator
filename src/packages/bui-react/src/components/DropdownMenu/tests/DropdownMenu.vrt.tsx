import React from "react";
import env from "@bookingcom/bui-env-react";
import Button from "components/Button";
import {
  EditIcon,
  SpeechBubbleIcon,
  BedAddIcon,
} from "@bookingcom/bui-assets-react/streamline";
import DropdownMenu from "components/DropdownMenu";
import Bubble from "components/Bubble";

env.test.vrt({
  default: {
    capture: "viewport",
    component: (
      <DropdownMenu
        active
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
  withSections: {
    capture: "viewport",
    component: (
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
  withIcons: {
    capture: "viewport",
    component: (
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
  withSlots: {
    capture: "viewport",
    component: (
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
  },
  withDisabledItems: {
    capture: "viewport",
    component: (
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
});
