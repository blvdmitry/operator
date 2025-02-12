import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { setup } from "tools/jest";
import Button from "components/Button";
import Tooltip from "components/Tooltip";

const fixtures = {
  buttonText: "button text",
  content: "tooltip content",
  ariaDescribedBy: "aria-describedby",
  testId: "tooltip test id",
};

describe("Tooltip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("uncontrolled, defaultActive", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = setup(
      <Tooltip
        onOpen={onOpen}
        onClose={onClose}
        defaultActive
        text={fixtures.content}
        disableAnimation
      >
        {(attributes) => (
          <Button attributes={attributes} text={fixtures.buttonText} />
        )}
      </Tooltip>
    );

    // check if trigger rendered
    const buttonEl = screen.getAllByRole("button")[0];
    const popoverId = buttonEl.getAttribute(fixtures.ariaDescribedBy) as string;

    await waitFor(() => {
      expect(screen.getByText(fixtures.content)).toBeInTheDocument();
    });

    expect(buttonEl).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();

    await user.hover(buttonEl);
    await user.unhover(buttonEl);

    await waitFor(() => {
      expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(buttonEl).not.toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).not.toBeInTheDocument();

    await user.hover(buttonEl);

    await waitFor(() => {
      expect(screen.getByText(fixtures.content)).toBeInTheDocument();
    });

    expect(buttonEl).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();
  });

  test("controlled, active", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = setup(
      <Tooltip
        onOpen={onOpen}
        onClose={onClose}
        active
        text={fixtures.content}
        disableAnimation
      >
        {(attributes) => (
          <Button attributes={attributes} text={fixtures.buttonText} />
        )}
      </Tooltip>
    );

    // check if trigger rendered
    const buttonEl = screen.getAllByRole("button")[0];
    const popoverId = buttonEl.getAttribute(fixtures.ariaDescribedBy) as string;

    await waitFor(() => {
      expect(screen.getByText(fixtures.content)).toBeInTheDocument();
    });

    expect(buttonEl).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId as string)).toBeInTheDocument();

    await user.hover(buttonEl);
    await user.unhover(buttonEl);

    await waitFor(() => {
      expect(screen.getByText(fixtures.content)).toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();
  });
});
