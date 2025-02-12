import React from "react";
import env from "@bookingcom/bui-env-react";
import { SendMessageIcon } from "@bookingcom/bui-assets-react/streamline";
import ActionBar from "components/ActionBar";
import Placeholder from "components/Placeholder";
import Chip from "components/Chip";

env.test.vrt({
  children: (
    <ActionBar
      button={{
        text: "Book Now",
      }}
    >
      <Placeholder height="24px" />
    </ActionBar>
  ),
  childrenFillEqually: (
    <ActionBar
      button={{
        text: "Book Now",
      }}
      fillEqually
    >
      <Placeholder height="24px" />
    </ActionBar>
  ),
  topContent: (
    <ActionBar
      button={{
        text: "Book Now",
      }}
      topContent={<Placeholder height="24px" />}
    >
      <Placeholder height="24px" />
    </ActionBar>
  ),
  topContentFill: (
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
                label={`${1 + index * 2} days`}
                variant="toggle"
              />
            );
          })}
        </div>
      }
    />
  ),
  elevated: (
    <ActionBar
      button={{
        text: "Book Now",
      }}
      elevated
    >
      <Placeholder height="24px" />
    </ActionBar>
  ),
  sizeLarge: (
    <ActionBar
      button={{
        text: "Book Now",
        size: "large",
      }}
      size="large"
    >
      <Placeholder height="24px" />
    </ActionBar>
  ),
  responsive: {
    component: (
      <ActionBar
        button={{
          text: "Book Now",
          size: "large",
        }}
        size={{ s: "large", m: "medium" }}
        elevated={{ s: true, m: false }}
      >
        <Placeholder height="24px" />
      </ActionBar>
    ),
    viewports: ["small", "medium"],
  },
  verticalAlignment: {
    component: (
      <ActionBar
        verticalAlignment="end"
        button={{
          icon: SendMessageIcon,
          variant: "tertiary",
          size: "large",
        }}
      >
        <Placeholder height="100px" />
      </ActionBar>
    ),
  },
});
