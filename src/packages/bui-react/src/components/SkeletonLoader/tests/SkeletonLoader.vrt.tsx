import React from "react";
import env from "@bookingcom/bui-env-react";
import SkeletonLoader from "components/SkeletonLoader";

/*
  bumping up opacity to 0.5 here so that the components are visible in the screenshot
*/
env.test.vrt({
  title: {
    component: <SkeletonLoader variant="title" />,
    capture: "viewport",
  },
  oneLine: {
    component: <SkeletonLoader variant="one-line" />,
    capture: "viewport",
  },
  twoLines: {
    component: <SkeletonLoader variant="two-lines" />,
    capture: "viewport",
  },
  threeLines: {
    component: <SkeletonLoader variant="three-lines" />,
    capture: "viewport",
  },
  threeLinesInherit: {
    component: (
      <div
        style={{
          padding: "var(--bui_spacing_3x)",
          backgroundColor: "var(--bui_color_action_background)",
          color: "var(--bui_color_on_action_background)",
        }}
      >
        <SkeletonLoader variant="three-lines" color="inherit" />
      </div>
    ),
    capture: "viewport",
  },
  box1to1: {
    component: <SkeletonLoader variant="box" width="100px" />,
    capture: "viewport",
  },
  box4to3: {
    component: <SkeletonLoader variant="box" width="100px" aspectRatio="4:3" />,
    capture: "viewport",
  },
  box16to9: {
    component: (
      <SkeletonLoader variant="box" width="100px" aspectRatio="16:9" />
    ),
    capture: "viewport",
  },
});
