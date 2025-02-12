import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import HiddenVisually from "components/HiddenVisually";

const fixtures = {
  testId: "hidden-visually-test",
  text: "Content",
};

describe("HiddenVisually", () => {
  test("renders HiddenVisually", () => {
    setup(<HiddenVisually>{fixtures.text}</HiddenVisually>);

    const component = screen.getByText(fixtures.text);

    expect(component).toBeInTheDocument();
  });

  test("renders HiddenVisually via render props", () => {
    setup(
      <div data-testid={fixtures.testId}>
        <HiddenVisually>
          {({ className }) => <div className={className}>{fixtures.text}</div>}
        </HiddenVisually>
      </div>
    );

    const component = screen.getByTestId(fixtures.testId);

    expect(component).toBeInTheDocument();
    expect(component.textContent).toStrictEqual(fixtures.text);
  });
});
