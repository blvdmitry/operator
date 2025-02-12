import React from "react";
import env, { InteractiveVRTClient } from "@bookingcom/bui-env-react";
import Actionable from "components/Actionable";
import Button from "components/Button";
import Tooltip from "components/Tooltip";
import type * as TTooltip from "components/Tooltip/Tooltip.types";

const style: React.CSSProperties = {
  height: "calc(100vh - var(--bui_spacing_8x)",
  width: "calc(100vw - var(--bui_spacing_8x)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const tests: {
  name: string;
  position: TTooltip.Props["position"];
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
    name: "start",
    position: "start",
  },
  {
    name: "end",
    position: "end",
  },
];

const normalTriggerExamples = tests.reduce(
  (acc, test) => ({
    ...acc,
    [test.name]: {
      component: (
        <div style={style}>
          <Tooltip
            text={test.name}
            position={test.position}
            className={`${test.name}-tooltip`}
          >
            {(attributes) => (
              <Button
                className={`${test.name}-button`}
                attributes={attributes}
                text="Hover Me"
              />
            )}
          </Tooltip>
        </div>
      ),
      interactive: async (client: InteractiveVRTClient) => {
        const el = client.body.querySelector(`.${test.name}-button`)!;

        client.triggerEvent(el, "mouseover");
        await client.wait(400);

        client.screenshot("hovered");
      },
      skipInitialCapture: true,
      viewports: ["small", "medium"],
    },
  }),
  {}
);
const tinyTriggerExamples = tests.reduce(
  (acc, test) => ({
    ...acc,
    [`tinyTrigger${test.name}`]: {
      component: (
        <div style={style}>
          <Tooltip
            text={test.name}
            position={test.position}
            className={`${test.name}-tooltip`}
          >
            {(attributes) => (
              <Actionable
                attributes={attributes}
                className={`${test.name}-trigger`}
              >
                ?
              </Actionable>
            )}
          </Tooltip>
        </div>
      ),
      interactive: async (client: InteractiveVRTClient) => {
        const el = client.body.querySelector(`.${test.name}-trigger`)!;

        client.triggerEvent(el, "mouseover");
        await client.wait(400);

        client.screenshot("hovered");
      },
      skipInitialCapture: true,
      viewports: ["large"],
    },
  }),
  {}
);

const CustomContainerRefExample = () => {
  const containerRef = React.useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: "auto",
        height: "500px",
        width: "500px",
        position: "relative",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--bui_color_border_alt)",
      }}
    >
      <div style={{ height: "300vh", padding: "var(--bui_spacing_4x)" }}>
        <Tooltip
          text="customContainerRefExample"
          containerRef={containerRef}
          className="tooltip"
        >
          {(attributes) => (
            <Button
              className="trigger"
              attributes={attributes}
              text="Hover Me"
            />
          )}
        </Tooltip>
      </div>
    </div>
  );
};

env.test.vrt({
  ...normalTriggerExamples,
  ...tinyTriggerExamples,
  customContainer: {
    component: (
      <div style={style}>
        <CustomContainerRefExample />
      </div>
    ),
    interactive: async (client: InteractiveVRTClient) => {
      const el = client.body.querySelector(".trigger")!;

      client.triggerEvent(el, "mouseover");
      await client.wait(400);

      client.screenshot("hovered");
    },
    skipInitialCapture: true,
    viewports: ["large"],
  },
});
