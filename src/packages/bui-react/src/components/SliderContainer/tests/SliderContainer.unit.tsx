import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import SliderContainer from "components/SliderContainer";
import BUIProvider from "components/BUIProvider";
import userEvent from "@testing-library/user-event";

const fixtures = {
  ariaLabel: "test-carousel-aria-label",
  previousAriaLabel: "test-carousel-previous-button",
  nextAriaLabel: "test-carousel-next-button",
  itemContent: "Item content",
  className: "test-classname",
  id: "test-id",
  items: [
    {
      src: "https://picsum.photos/400",
    },
    {
      src: "https://picsum.photos/400",
    },
  ],
};

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("SliderContainer", () => {
  Element.prototype.scrollTo = () => {};

  test("renders component", () => {
    setup(
      <SliderContainer
        previousButtonAriaLabel={fixtures.previousAriaLabel}
        nextButtonAriaLabel={fixtures.nextAriaLabel}
        // TODO: Enable infinite and fix jest .scrollTo availability
        infinite={false}
        attributes={{ "data-testid": fixtures.id }}
      >
        {fixtures.items.map((item, index) => (
          <SliderContainer.Item key={index} src={item.src}>
            {fixtures.itemContent}
          </SliderContainer.Item>
        ))}
      </SliderContainer>
    );

    const sliderEl = screen.getByTestId(fixtures.id);
    const prevEl = screen.getByLabelText(fixtures.previousAriaLabel);
    const nextEl = screen.getByLabelText(fixtures.nextAriaLabel);
    const itemEls = screen.getAllByText(fixtures.itemContent);

    expect(sliderEl).toBeInTheDocument();
    expect(nextEl).toBeInTheDocument();
    expect(prevEl).toBeInTheDocument();
    expect(itemEls).toHaveLength(2);
  });

  it("triggers onNavigateControlClick", async () => {
    const handleControlClick = jest.fn();
    setup(
      <SliderContainer
        previousButtonAriaLabel={fixtures.previousAriaLabel}
        nextButtonAriaLabel={fixtures.nextAriaLabel}
        onNavigationControlClick={handleControlClick}
        // TODO: Enable infinite and fix jest .scrollTo availability
        infinite={false}
      >
        {fixtures.items.map((item, index) => (
          <SliderContainer.Item key={index} src={item.src} />
        ))}
      </SliderContainer>
    );

    const prevEl = screen.getByLabelText(fixtures.previousAriaLabel);
    const nextEl = screen.getByLabelText(fixtures.nextAriaLabel);

    await userEvent.click(prevEl);

    expect(handleControlClick).toBeCalledTimes(1);

    await userEvent.click(nextEl);

    expect(handleControlClick).toBeCalledTimes(2);
  });

  it("triggers onNavigateControlClick with custom animation", async () => {
    const handleControlClick = jest.fn();
    setup(
      <BUIProvider
        experiments={{ slider_container_animation_duration: () => true }}
      >
        <SliderContainer
          previousButtonAriaLabel={fixtures.previousAriaLabel}
          nextButtonAriaLabel={fixtures.nextAriaLabel}
          onNavigationControlClick={handleControlClick}
          // TODO: Enable infinite and fix jest .scrollTo availability
          infinite={false}
        >
          {fixtures.items.map((item, index) => (
            <SliderContainer.Item key={index} src={item.src} />
          ))}
        </SliderContainer>
      </BUIProvider>
    );

    const prevEl = screen.getByLabelText(fixtures.previousAriaLabel);
    const nextEl = screen.getByLabelText(fixtures.nextAriaLabel);

    await userEvent.click(prevEl);

    expect(handleControlClick).toBeCalledTimes(1);

    await userEvent.click(nextEl);

    expect(handleControlClick).toBeCalledTimes(2);
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <SliderContainer
        previousButtonAriaLabel={fixtures.previousAriaLabel}
        nextButtonAriaLabel={fixtures.nextAriaLabel}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
        // TODO: Enable infinite and fix jest .scrollTo availability
        infinite={false}
      >
        {fixtures.items.map((item, index) => (
          <SliderContainer.Item key={index} src={item.src} />
        ))}
      </SliderContainer>
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
