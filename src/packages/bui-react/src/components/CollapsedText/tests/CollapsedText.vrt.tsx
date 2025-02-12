import React from "react";
import env from "@bookingcom/bui-env-react";
import CollapsedText from "components/CollapsedText";

const fixtures = {
  text: "This is an example. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
  readMoreLabel: "Read more",
  readLessLabel: "Read less",
};

env.test.vrt({
  default: {
    component: <CollapsedText {...fixtures} />,
    viewports: ["small", "large"],
  },
  body1: <CollapsedText {...fixtures} variant="body_1" />,
  body2: <CollapsedText {...fixtures} variant="body_2" />,
  visibleLines: {
    component: (
      <CollapsedText
        {...fixtures}
        visibleLines={4}
        readMoreLabel="Read more text"
        readLessLabel="Read less text"
      />
    ),
    viewports: ["small", "large"],
  },
  paragraphs: {
    component: (
      <CollapsedText
        text="This is an example. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        readMoreLabel="Read more"
        readLessLabel="Read less"
      />
    ),
    viewports: ["small", "medium"],
  },
});
