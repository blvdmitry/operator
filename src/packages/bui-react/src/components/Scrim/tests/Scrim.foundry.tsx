import React from "react";
import AspectRatio from "components/AspectRatio";
import Image from "components/Image";
import Scrim from "components/Scrim";
import Placeholder from "components/Placeholder";
import readme from "components/Scrim/Scrim.mdx";

export const controls = [
  {
    type: "enum",
    label: "Position",
    propertyName: "position",
    options: [
      { label: "Full", value: "full" },
      { label: "Top", value: "top" },
      { label: "Bottom", value: "bottom" },
      { label: "Start", value: "start" },
      { label: "End", value: "end" },
    ],
    defaultValue: "full",
  },
  {
    type: "boolean",
    label: "Centered",
    propertyName: "centered",
  },
  {
    type: "boolean",
    label: "Fill",
    propertyName: "fill",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Content",
  },
];

const ExampleWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: 300, position: "relative", background: "#fafafa" }}>
    {children}
  </div>
);

export default {
  name: "Components/Containers/Scrim",
  readme,
  keywords: ["overlay", "background", "gradient"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=493%3A2690",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Scrim"],
    },
  },
  playground: {
    template: (props: any) => (
      <ExampleWrapper>
        <Scrim {...props} />
      </ExampleWrapper>
    ),
    controls,
  },
  examples: {
    start: {
      template: () => (
        <ExampleWrapper>
          <Scrim position="start">Content</Scrim>
        </ExampleWrapper>
      ),
    },

    full: {
      template: () => (
        <ExampleWrapper>
          <Scrim position="full">
            <Placeholder height="150px" />
          </Scrim>
        </ExampleWrapper>
      ),
    },
    fill: {
      template: () => (
        <ExampleWrapper>
          <Scrim fill>
            <Placeholder height="150px" />
          </Scrim>
        </ExampleWrapper>
      ),
    },
    background: {
      template: () => (
        <Scrim
          backgroundSlot={
            <AspectRatio ratio="16:9">
              <Image src="https://picsum.photos/200" alt="Random picture" />
            </AspectRatio>
          }
          position="bottom"
        >
          Content
        </Scrim>
      ),
    },
  },
};
