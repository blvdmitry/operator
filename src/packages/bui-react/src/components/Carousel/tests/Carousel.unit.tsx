import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Carousel from "components/Carousel";

const fixtures = {
  ariaLabel: "test-carousel-aria-label",
  previousAriaLabel: "test-carousel-previous-button",
  nextAriaLabel: "test-carousel-next-button",
  itemContent: "Item content",
  className: "test-classname",
  itemClassName: "test-item-className",
  id: "test-id",
  itemId: "test-item-id",
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

describe("Carousel", () => {
  Element.prototype.scrollTo = () => {};

  test("renders Carousel", () => {
    setup(
      <Carousel
        ariaLabel={fixtures.ariaLabel}
        previousButtonAriaLabel={fixtures.previousAriaLabel}
        nextButtonAriaLabel={fixtures.nextAriaLabel}
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>{fixtures.itemContent}</div>
        ))}
      </Carousel>
    );

    const carouselEl = screen.getByLabelText(fixtures.ariaLabel);
    const prevEl = screen.getByLabelText(fixtures.previousAriaLabel);
    const nextEl = screen.getByLabelText(fixtures.nextAriaLabel);
    const itemEls = screen.getAllByText(fixtures.itemContent);

    expect(carouselEl).toBeInTheDocument();
    expect(nextEl).toBeInTheDocument();
    expect(prevEl).toBeInTheDocument();
    expect(itemEls).toHaveLength(4);
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <Carousel
        previousButtonAriaLabel={fixtures.previousAriaLabel}
        nextButtonAriaLabel={fixtures.nextAriaLabel}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      >
        <Carousel.Item
          className={fixtures.itemClassName}
          attributes={{ id: fixtures.itemId }}
        >
          {fixtures.itemContent}
        </Carousel.Item>
      </Carousel>
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);

    const itemEl = screen.getByText(fixtures.itemContent);

    expect(itemEl).toHaveClass(fixtures.itemClassName);
    expect(itemEl).toHaveAttribute("id", fixtures.itemId);
  });
});
