import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import { CircleIcon } from "@bookingcom/bui-assets-react/streamline";
import Badge from "components/Badge";

describe("Badge", () => {
  const fixtures = {
    testId: "badge-test-id",
    className: "badge-class",
    text: "Badge",
    icon: CircleIcon,
    ariaLabel: "Badge aria label",
    closeAriaLabel: "Close Badge",
  };

  test("renders Badge", () => {
    setup(
      <Badge
        className={fixtures.className}
        text={fixtures.text}
        icon={fixtures.icon}
        ariaLabel={fixtures.ariaLabel}
        closeAriaLabel={fixtures.closeAriaLabel}
        onAfterClose={() => {}}
        attributes={{
          "data-testid": fixtures.testId,
        }}
      />
    );

    const badge = screen.getByTestId(fixtures.testId);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(fixtures.className);
    expect(badge).toBe(screen.getByLabelText(fixtures.ariaLabel));

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("aria-label", fixtures.closeAriaLabel);
    expect(screen.getByRole("button")).toBe(
      screen.getByLabelText(fixtures.closeAriaLabel)
    );
  });
  test("uncontrolled Badge", async () => {
    const handleClose = jest.fn();
    const { user } = setup(
      <Badge
        text={fixtures.text}
        ariaLabel={fixtures.ariaLabel}
        closeAriaLabel={fixtures.closeAriaLabel}
        onAfterClose={handleClose}
        attributes={{
          "data-testid": fixtures.testId,
        }}
      />
    );

    const badge = screen.getByTestId(fixtures.testId);
    expect(badge).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(closeButton).not.toBeInTheDocument();
    expect(badge).not.toBeInTheDocument();
  });

  test("controlled Badge", async () => {
    const handleClose = jest.fn();
    const { user } = setup(
      <Badge
        text={fixtures.text}
        ariaLabel={fixtures.ariaLabel}
        closeAriaLabel={fixtures.closeAriaLabel}
        onAfterClose={handleClose}
        shown
        attributes={{
          "data-testid": fixtures.testId,
        }}
      />
    );

    const badge = screen.getByTestId(fixtures.testId);
    expect(badge).toBeInTheDocument();

    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(closeButton).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });
});
