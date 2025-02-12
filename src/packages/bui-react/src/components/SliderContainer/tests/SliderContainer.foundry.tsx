/* eslint-disable max-len */
import React from "react";
import Placeholder from "components/Placeholder";
import SliderContainer, {
  SliderContainerRefProps,
} from "components/SliderContainer";
import Stack from "components/Stack";
import Title from "components/Title";
import Button from "components/Button";
import readme from "components/SliderContainer/SliderContainer.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      {
        label: "Media",
        value: "media",
      },
      {
        label: "Content",
        value: "content",
      },
    ],
    defaultValue: "media",
  },
  {
    type: "boolean",
    label: "Infinite",
    propertyName: "infinite",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Show Navigation Controls",
    propertyName: "showNavigationControls",
    defaultValue: false,
  },
  {
    type: "enum",
    label: "Border Radius",
    propertyName: "borderRadius",
    options: [
      { label: "100", value: "100" },
      { label: "200", value: "200" },
      { label: "300", value: "300" },
    ],
  },
  {
    type: "string",
    label: "Previous button aria-label",
    propertyName: "previousButtonAriaLabel",
    defaultValue: "Previous slide",
  },
  {
    type: "string",
    label: "Next button aria-label",
    propertyName: "nextButtonAriaLabel",
    defaultValue: "Next slide",
  },
];

const mediaItems = [
  {
    src: "https://images.unsplash.com/photo-1570773455183-e95ad040b034?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1570745142588-c2c2576c9295?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1570773455183-e95ad040b034?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1570745142588-c2c2576c9295?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1570773455183-e95ad040b034?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80",
  },
];

const contentItems = [
  {
    children: <Title title="Slide #1" />,
  },
  {
    children: <Title title="Slide #2" />,
  },
  {
    children: <Title title="Slide #3" />,
  },
  {
    children: <Title title="Slide #4" />,
  },
  {
    children: <Title title="Slide #5" />,
  },
];

const ContentDemo = () => {
  const ref = React.useRef<SliderContainerRefProps>(null);

  return (
    <SliderContainer
      ref={ref}
      variant="content"
      previousButtonAriaLabel="Previous photo"
      nextButtonAriaLabel="Next photo"
    >
      <SliderContainer.Item>
        <Stack>
          <Placeholder />
          <Stack.Item>
            <Button onClick={() => ref.current?.navigateForward()}>
              Next slide
            </Button>
          </Stack.Item>
        </Stack>
      </SliderContainer.Item>
      <SliderContainer.Item>
        <Stack>
          <Placeholder />
          <Stack direction="row">
            <Button onClick={() => ref.current?.navigateBack()}>
              Previous slide
            </Button>
            <Button onClick={() => ref.current?.navigateForward()}>
              Next slide
            </Button>
          </Stack>
        </Stack>
      </SliderContainer.Item>
      <SliderContainer.Item>
        <Stack>
          <Placeholder />
          <Stack.Item>
            <Button onClick={() => ref.current?.navigateBack()}>
              Previous slide
            </Button>
          </Stack.Item>
        </Stack>
      </SliderContainer.Item>
    </SliderContainer>
  );
};

export default {
  name: "Components/Patterns/Slider container",
  readme,
  keywords: ["input", "form", "range", "drag"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=503%3A2706",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["SliderContainer"],
    },
  },
  playground: {
    template: (props: any) => {
      const isMedia = props.variant === "media";
      const isContent = props.variant;
      const items: { src?: string; children?: any }[] = isMedia
        ? mediaItems
        : contentItems;
      return (
        <SliderContainer {...props}>
          {items.map((item, index) => (
            <SliderContainer.Item
              key={index}
              src={isMedia ? item.src : undefined}
            >
              {isContent && item.children}
            </SliderContainer.Item>
          ))}
        </SliderContainer>
      );
    },
    controls,
  },
  examples: {
    media: {
      template: () => (
        <SliderContainer
          previousButtonAriaLabel="Previous photo"
          nextButtonAriaLabel="Next photo"
        >
          {mediaItems.map((item, index) => (
            <SliderContainer.Item key={index} src={item.src} />
          ))}
        </SliderContainer>
      ),
    },
    content: {
      template: () => <ContentDemo />,
    },
    showNavigation: {
      template: () => (
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
    },
    finite: {
      template: () => (
        <SliderContainer
          infinite={false}
          previousButtonAriaLabel="Previous photo"
          nextButtonAriaLabel="Next photo"
        >
          {mediaItems.map((item, index) => (
            <SliderContainer.Item key={index} src={item.src} />
          ))}
        </SliderContainer>
      ),
    },
  },
};
