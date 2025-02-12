import React from "react";
import env, { type InteractiveVRTClient } from "@bookingcom/bui-env-react";
import Button from "components/Button";
import Popover from "components/Popover";
import Stack from "components/Stack";
import type * as TPopover from "components/Popover/Popover.types";
import type { Viewport } from "@bookingcom/bui-env-core/dist/vrt/lib/types";

const style: React.CSSProperties = {
  height: "calc(100vh - var(--bui_spacing_8x)",
  width: "calc(100vw - var(--bui_spacing_8x)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const tests: {
  name: string;
  position: TPopover.Props["position"];
}[] = [
  {
    name: "topStart",
    position: "top-start",
  },
  {
    name: "top",
    position: "top",
  },
  {
    name: "topEnd",
    position: "top-end",
  },
  {
    name: "bottomStart",
    position: "bottom-start",
  },
  {
    name: "bottom",
    position: "bottom",
  },
  {
    name: "bottomEnd",
    position: "bottom-end",
  },
  {
    name: "start-top",
    position: "start-top",
  },
  {
    name: "start",
    position: "start",
  },
  {
    name: "start-bottom",
    position: "start-bottom",
  },
  {
    name: "end-top",
    position: "end-top",
  },
  {
    name: "end",
    position: "end",
  },
  {
    name: "end-bottom",
    position: "end-bottom",
  },
];

const CustomContainerRef = () => {
  const containerRef = React.useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        height: "500px",
        width: "100%",
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--bui_color_border_alt)",
      }}
      className="container"
    >
      <div style={{ height: "300vh", padding: "var(--bui_spacing_8x)" }}>
        <Popover disableAnimation containerRef={containerRef} defaultActive>
          <Popover.Trigger>
            {(attributes) => (
              <Button
                className="button"
                attributes={attributes}
                text="Open Popover"
              />
            )}
          </Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      </div>
    </div>
  );
};

const CustomPositionRef = () => {
  const positionRef = React.useRef(null);

  return (
    <Stack gap={4}>
      <Popover
        disableAnimation
        positionRef={positionRef}
        defaultActive
        forcePosition
        position="bottom"
      >
        <Popover.Trigger>
          {(attributes) => (
            <Button
              className="button"
              attributes={attributes}
              text="Open Popover"
            />
          )}
        </Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>

      <Button attributes={{ ref: positionRef }}>Popover origin</Button>
    </Stack>
  );
};

const examples = {
  ...tests.reduce(
    (acc, test) => ({
      ...acc,
      [test.name]: {
        component: (
          <div style={style}>
            <Popover position={test.position} disableAnimation>
              <Popover.Trigger>
                {(attributes) => (
                  <Button
                    className={`${test.name}-button`}
                    attributes={attributes}
                    text="Open Popover"
                  />
                )}
              </Popover.Trigger>
              <Popover.Content>{test.name}</Popover.Content>
            </Popover>
          </div>
        ),
        interactive: async (client: InteractiveVRTClient) => {
          const elButton = client.body.querySelector(
            `.${test.name}-button`
          ) as HTMLElement;

          elButton.click();
          await client.wait(200);

          client.screenshot("opened");
        },
        skipInitialCapture: true,
        viewports: ["small", "large"],
      },
    }),
    {}
  ),
  customContainer: {
    component: (
      <div style={style}>
        <CustomContainerRef />
      </div>
    ),
    viewports: ["small", "large"] as Viewport[],
  },
  positionRef: {
    component: (
      <div style={style}>
        <CustomPositionRef />
      </div>
    ),
  },
};

env.test.vrt(examples);
