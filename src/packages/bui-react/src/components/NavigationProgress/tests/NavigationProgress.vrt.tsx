import React from "react";
import env from "@bookingcom/bui-env-react";
import NavigationProgress from "components/NavigationProgress";
import Placeholder from "components/Placeholder";

env.test.vrt({
  horizontal: {
    component: (
      <NavigationProgress
        items={[
          {
            title: "Choose your plan",
          },
          {
            title: "Add your details",
            status: "current",
          },
          {
            title: "Confirmation",
            status: "next",
          },
        ]}
        renderMobileProgress={(current, total) => `Step ${current} of ${total}`}
      />
    ),
    viewports: ["small", "medium"],
  },
  horizontalNoLabels: {
    component: (
      <NavigationProgress
        items={[
          {
            title: "Choose your plan",
          },
          {
            title: "Add your details",
            status: "current",
          },
          {
            title: "Confirmation",
            status: "next",
          },
        ]}
        showLabel={false}
        renderMobileProgress={(current, total) => `Step ${current} of ${total}`}
      />
    ),
    viewports: ["small"],
  },
  vertical: (
    <NavigationProgress
      variant="vertical"
      items={[
        {
          title: "Choose your plan",
          content: <Placeholder />,
        },
        {
          title: "Add your details",
          content: <Placeholder />,
          status: "current",
        },
        {
          title: "Confirmation",
          content: <Placeholder />,
          status: "next",
        },
      ]}
    />
  ),
});
