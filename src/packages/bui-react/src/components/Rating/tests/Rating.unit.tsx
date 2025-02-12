import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Rating from "components/Rating";

describe("Rating", () => {
  const fixtures = {
    className: "test-className",
    testId: "test-bui-rating",
    ariaLabel: "test-bui-rating-aria-label",
  };

  test("renders Rating", () => {
    const value = 4;

    setup(
      <Rating
        value={value}
        className={fixtures.className}
        attributes={{
          "data-testid": fixtures.testId,
          "aria-label": "5 out of 5 stars",
        }}
      />
    );

    const rating = screen.getByTestId(fixtures.testId);
    const icons = rating.children;

    expect(rating).toBeInTheDocument();
    expect(rating).toHaveClass(fixtures.className);
    expect(icons.length).toEqual(value);
  });
});
