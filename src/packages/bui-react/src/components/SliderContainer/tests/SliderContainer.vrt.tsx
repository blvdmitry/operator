import React from "react";
import env from "@bookingcom/bui-env-react";
import SliderContainer from "components/SliderContainer";
import Placeholder from "components/Placeholder";

const mediaItems = [
  {
    src: "/mock.png",
  },
  {
    src: "/mock.png",
  },
  {
    src: "/mock.png",
  },
  {
    src: "/mock.png",
  },
  {
    src: "/mock.png",
  },
];

env.test.vrt({
  media: {
    component: (
      <SliderContainer
        previousButtonAriaLabel="Previous photo"
        nextButtonAriaLabel="Next photo"
      >
        {mediaItems.map((item, index) => (
          <SliderContainer.Item key={index} src={item.src} />
        ))}
      </SliderContainer>
    ),
    // imageMocks: true,
  },
  content: {
    component: (
      <SliderContainer
        variant="content"
        previousButtonAriaLabel="Previous photo"
        nextButtonAriaLabel="Next photo"
      >
        <SliderContainer.Item>
          <Placeholder />
        </SliderContainer.Item>
        <SliderContainer.Item>
          <Placeholder />
        </SliderContainer.Item>
      </SliderContainer>
    ),
  },
  showNavigationControls: {
    component: (
      <SliderContainer
        previousButtonAriaLabel="Previous photo"
        nextButtonAriaLabel="Next photo"
        showNavigationControls
      >
        {mediaItems.map((item, index) => (
          <SliderContainer.Item key={index} src={item.src} />
        ))}
      </SliderContainer>
    ),
    // imageMocks: true,
  },
  borderRadius: (
    <SliderContainer
      previousButtonAriaLabel="Previous photo"
      nextButtonAriaLabel="Next photo"
      borderRadius="300"
    >
      {mediaItems.map((item, index) => (
        <SliderContainer.Item key={index} src={item.src} />
      ))}
    </SliderContainer>
  ),
});
