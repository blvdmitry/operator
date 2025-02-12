import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import ActionBar from "components/ActionBar";

describe("ActionBar", () => {
  test("renders ActionBar", () => {
    const testId = "test-bui-action-bar-1";
    const buttonText = "Book Now";
    const contentText = "ActionBar Content";
    const actionBarClassName = "action-bar-classname";
    setup(
      <ActionBar
        button={{
          text: buttonText,
          type: "button",
        }}
        className={actionBarClassName}
        attributes={{ "data-testid": testId }}
      >
        {contentText}
      </ActionBar>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
    expect(screen.getByText(contentText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveClass(actionBarClassName);
  });
});
