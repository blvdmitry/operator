import React from "react";
import env from "@bookingcom/bui-env-react";
import AspectRatio from "components/AspectRatio";
import Image from "components/Image";
import Scrim from "components/Scrim";
import Placeholder from "components/Placeholder";

const ExampleWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ height: 300, position: "relative", background: "#fafafa" }}>
    {children}
  </div>
);

env.test.vrt({
  top: (
    <ExampleWrapper>
      <Scrim position="top">
        <Placeholder height="24px" />
      </Scrim>
    </ExampleWrapper>
  ),
  bottom: (
    <ExampleWrapper>
      <Scrim position="bottom">
        <Placeholder height="24px" />
      </Scrim>
    </ExampleWrapper>
  ),
  start: (
    <ExampleWrapper>
      <Scrim position="start">Content</Scrim>
    </ExampleWrapper>
  ),
  end: (
    <ExampleWrapper>
      <Scrim position="end">Content</Scrim>
    </ExampleWrapper>
  ),
  full: (
    <ExampleWrapper>
      <Scrim position="full">
        <Placeholder height="150px" />
      </Scrim>
    </ExampleWrapper>
  ),
  fill: (
    <ExampleWrapper>
      <Scrim fill>
        <Placeholder height="150px" />
      </Scrim>
    </ExampleWrapper>
  ),
  withBackground: {
    component: (
      <Scrim
        backgroundSlot={
          <AspectRatio ratio="16:9">
            <Image src="/mock.png" alt="Random picture" />
          </AspectRatio>
        }
        position="bottom"
      >
        Content
      </Scrim>
    ),
    imageMocks: true,
  },
});
