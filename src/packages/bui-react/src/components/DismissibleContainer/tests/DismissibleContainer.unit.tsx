import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import DismissibleContainer from "components/DismissibleContainer";

const fixtures = {
  className: "test-className",
  closeClassName: "test-closeClassName",
  testId: "test-id",
  children: "Dismissible container content",
  closeAriaLabel: "Close",
};

describe("DismissibleContainer", () => {
  test("basic configuration with aria-label and attribute props", () => {
    setup(
      <DismissibleContainer
        closeAriaLabel={fixtures.closeAriaLabel}
        attributes={{ "data-testid": fixtures.testId }}
      >
        {fixtures.children}
      </DismissibleContainer>
    );

    const dismissibleContainer = screen.getByTestId(fixtures.testId);
    const content = screen.getByText(fixtures.children);
    const closeButton = screen.getByRole("button");

    expect(dismissibleContainer).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(dismissibleContainer).toHaveAttribute(
      "data-testid",
      fixtures.testId
    );
    expect(closeButton).toHaveAttribute("aria-label", fixtures.closeAriaLabel);
  });

  test("className props", () => {
    const { output } = setup(
      <DismissibleContainer
        closeAriaLabel={fixtures.closeAriaLabel}
        className={fixtures.className}
        closeClassName={fixtures.closeClassName}
      >
        {fixtures.children}
      </DismissibleContainer>
    );

    const closeButton = output.container.querySelector("button")?.parentElement;

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(closeButton).toHaveClass(fixtures.closeClassName);
  });

  test("hide close button", () => {
    setup(
      <DismissibleContainer
        closeAriaLabel={fixtures.closeAriaLabel}
        attributes={{ "data-testid": fixtures.testId }}
        hideClose
      >
        {fixtures.children}
      </DismissibleContainer>
    );

    const closeButton = screen.queryByRole("button");
    expect(closeButton).not.toBeInTheDocument();
  });

  test("onClose handler", async () => {
    const onCloseTrigger = jest.fn();

    const { user } = setup(
      <DismissibleContainer
        closeAriaLabel={fixtures.closeAriaLabel}
        attributes={{ "data-testid": fixtures.testId }}
        onClose={onCloseTrigger}
      >
        {fixtures.children}
      </DismissibleContainer>
    );

    const closeButton = screen.getByRole("button");

    await user.click(closeButton);

    expect(onCloseTrigger).toHaveBeenCalledTimes(1);
  });
});
