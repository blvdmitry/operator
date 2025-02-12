import React from "react";
import env from "@bookingcom/bui-env-react";
import Carousel from "components/Carousel";
import Title from "components/Title";
import Placeholder from "components/Placeholder";

env.test.vrt({
  small: {
    component: (
      <Carousel
        size="small"
        title={<Title title="Carousel Title" subtitle="Carousel subtitle" />}
        action={{ text: "Action" }}
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["small", "medium", "large"],
  },
  medium: {
    component: (
      <Carousel
        size="medium"
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["small", "medium", "large"],
  },
  large: {
    component: (
      <Carousel
        size="large"
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["small", "medium", "large"],
  },
  larger: {
    component: (
      <Carousel
        size="larger"
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["small", "medium", "large"],
  },
  largest: {
    component: (
      <Carousel
        size="largest"
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["small", "medium", "large"],
  },
  topNavigationOffset: {
    component: (
      <Carousel
        size="medium"
        title={<Title title="Carousel Title" subtitle="Carousel subtitle" />}
        action={{ text: "Action" }}
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
        topNavigationOffset="20px"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <Placeholder />
        ))}
      </Carousel>
    ),
    viewports: ["large"],
  },
});
