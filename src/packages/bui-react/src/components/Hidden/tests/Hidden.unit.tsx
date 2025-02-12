import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Hidden from "components/Hidden";

const fixtures = {
  testId: "hidden-test",
  text: "Content",
};

describe("Hidden", () => {
  test("renders Hidden", () => {
    setup(<Hidden above="small">{fixtures.text}</Hidden>);

    const component = screen.getByText(fixtures.text);

    expect(component).toBeInTheDocument();
  });

  test("renders Hidden via render props", () => {
    setup(
      <div data-testid={fixtures.testId}>
        <Hidden above="small">
          {({ className }) => <div className={className}>{fixtures.text}</div>}
        </Hidden>
      </div>
    );

    const component = screen.getByTestId(fixtures.testId);

    expect(component).toBeInTheDocument();
    expect(component.textContent).toStrictEqual(fixtures.text);
  });
});
