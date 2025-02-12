import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Icon from "components/Icon";

const fixtures = {
  testId: "icon-test",
  text: "Content",
  className: "icon-test-class",
};

const svg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" />
  </svg>
);

describe("Icon", () => {
  test("renders Icon", () => {
    setup(
      <Icon
        svg={svg}
        size="small"
        color="accent"
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const component = screen.getByTestId(fixtures.testId);

    expect(component).toBeInTheDocument();
  });

  test("renders Icon with className", () => {
    setup(
      <Icon
        svg={svg}
        size="small"
        color="accent"
        className={fixtures.className}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const component = screen.getByTestId(fixtures.testId);

    expect(component).toHaveClass(fixtures.className);
  });
});
