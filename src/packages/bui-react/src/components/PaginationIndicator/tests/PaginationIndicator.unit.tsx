import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import PaginationIndicator from "components/PaginationIndicator";

describe("PaginationIndicator", () => {
  test("render", async () => {
    const fixtures = {
      className: "pagination-indicator-class",
      testId: "pagination-indicator-test-id",
      indicatorsCount: 7,
      activeIndex: 4,
    };

    setup(
      <PaginationIndicator
        total={fixtures.indicatorsCount}
        activeIndex={fixtures.activeIndex}
        className={fixtures.className}
        attributes={{
          "data-testid": fixtures.testId,
        }}
      />
    );

    const paginationIndicatorRoot = screen.getByTestId(fixtures.testId);
    expect(paginationIndicatorRoot).toBeInTheDocument();
    expect(paginationIndicatorRoot).toHaveClass(fixtures.className);

    const paginationIndicatorContainer = screen.getByRole("progressbar");
    expect(paginationIndicatorContainer.childElementCount).toBe(
      fixtures.indicatorsCount
    );
    expect(paginationIndicatorContainer.getAttribute("aria-valuenow")).toBe(
      `${fixtures.activeIndex}`
    );
    expect(paginationIndicatorContainer.getAttribute("aria-valuemin")).toBe(
      "0"
    );
    expect(paginationIndicatorContainer.getAttribute("aria-valuemax")).toBe(
      `${fixtures.indicatorsCount - 1}`
    );
  });
});
