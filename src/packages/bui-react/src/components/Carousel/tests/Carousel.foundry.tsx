import React from "react";
// @ts-ignore
import { omitProps } from "@bookingcom/foundry-react/utilities";
import Placeholder from "components/Placeholder";
import { controls as buttonControls } from "components/Button/tests/Button.foundry";
import Carousel, { CarouselRefProps } from "components/Carousel";
import Stack from "components/Stack";
import Title from "components/Title";
import Button from "components/Button";
import readme from "components/Carousel/Carousel.mdx";

export const controls = [
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
      {
        label: "Larger",
        value: "larger",
      },
      {
        label: "Largest",
        value: "largest",
      },
    ],
    defaultValue: "medium",
  },
  {
    type: "string",
    label: "Title slot",
    propertyName: "title",
  },
  {
    type: "object",
    label: "Action",
    propertyName: "action",
    controls: omitProps(buttonControls, ["variant", "size"]),
    defaultValue: undefined,
  },
  {
    type: "string",
    label: "Aria label",
    propertyName: "ariaLabel",
    defaultValue: "Carousel with placeholders",
  },
  {
    type: "string",
    label: "Next button aria label",
    propertyName: "nextButtonAriaLabel",
    defaultValue: "Next content",
  },
  {
    type: "string",
    label: "Previous button aria label",
    propertyName: "previousButtonAriaLabel",
    defaultValue: "Previous content",
  },
  {
    type: "string",
    label: "Top navigation offset",
    propertyName: "topNavigationOffset",
  },
];

const RefDemo = () => {
  const carouselRef = React.useRef<CarouselRefProps>(null);

  return (
    <Stack>
      <Stack direction="row">
        <Button onClick={() => carouselRef.current?.navigateBack()}>
          Navigate back
        </Button>
        <Button onClick={() => carouselRef.current?.navigateForward()}>
          Navigate forward
        </Button>
      </Stack>

      <Carousel
        ref={carouselRef}
        size="large"
        nextButtonAriaLabel="Next content"
        previousButtonAriaLabel="Previous content"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Placeholder height="100px" key={i} />
        ))}
      </Carousel>
    </Stack>
  );
};

export default {
  name: "Components/Containers/Carousel",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=107%3A102",
  },
  keywords: ["slider"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Carousel"],
    },
  },
  playground: {
    template: (props: any) => {
      return (
        <Carousel {...props}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Placeholder key={i} />
          ))}
        </Carousel>
      );
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Carousel
          size="small"
          title={<Title title="Carousel Title" subtitle="Carousel subtitle" />}
          action={{ text: "Action" }}
          nextButtonAriaLabel="Next content"
          previousButtonAriaLabel="Previous content"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Placeholder key={i} />
          ))}
        </Carousel>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Title"],
        },
      },
    },
    size: {
      template: () => (
        <Carousel
          size="larger"
          nextButtonAriaLabel="Next content"
          previousButtonAriaLabel="Previous content"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Placeholder key={i} />
          ))}
        </Carousel>
      ),
    },
    navigationOffset: {
      template: () => (
        <Carousel
          size="large"
          nextButtonAriaLabel="Next content"
          previousButtonAriaLabel="Previous content"
          topNavigationOffset="50px"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Stack key={i}>
              <Placeholder height="100px" />
              <Placeholder height="20px" />
            </Stack>
          ))}
        </Carousel>
      ),
    },
    ref: {
      template: () => <RefDemo />,
    },
  },
};
