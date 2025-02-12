import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Button from "components/Button";
import Popover from "components/Popover";

const fixtures = {
  buttonText: "button text",
  popoverContent: "popover content",
  closeAriaLabel: "close popover",
  ariaDescribedBy: "aria-describedby",
  testId: "popover test id",
};

describe("Popover", () => {
  test("uncontrolled, defaultActive", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = setup(
      <Popover
        closeAriaLabel={fixtures.closeAriaLabel}
        onOpen={onOpen}
        onClose={onClose}
        disableAnimation
        defaultActive
      >
        <Popover.Trigger>
          {(attributes) => (
            <Button attributes={attributes} text={fixtures.buttonText} />
          )}
        </Popover.Trigger>
        <Popover.Content>{fixtures.popoverContent}</Popover.Content>
      </Popover>
    );

    // check if trigger rendered
    const buttonEl = screen.getAllByRole("button")[0];
    const popoverId = buttonEl.getAttribute(fixtures.ariaDescribedBy);

    expect(buttonEl).toBeInTheDocument();
    expect(screen.getByText(fixtures.popoverContent)).toBeInTheDocument();
    expect(screen.getByLabelText(fixtures.closeAriaLabel)).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId as string)).toBeInTheDocument();

    // check for removal of content after close button clicked
    await user.click(screen.getByLabelText(fixtures.closeAriaLabel));

    expect(screen.queryByText(fixtures.popoverContent)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(fixtures.closeAriaLabel)
    ).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(buttonEl).not.toHaveAttribute(fixtures.ariaDescribedBy);
    expect(
      document.getElementById(popoverId as string)
    ).not.toBeInTheDocument();

    await user.click(buttonEl);

    expect(buttonEl).toBeInTheDocument();
    expect(screen.getByLabelText(fixtures.closeAriaLabel)).toBeInTheDocument();
    expect(screen.getByText(fixtures.popoverContent)).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId as string)).toBeInTheDocument();
  });

  test("controlled, defaultActive", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = setup(
      <Popover
        closeAriaLabel={fixtures.closeAriaLabel}
        onOpen={onOpen}
        onClose={onClose}
        disableAnimation
        active
      >
        <Popover.Trigger>
          {(attributes) => (
            <Button attributes={attributes} text={fixtures.buttonText} />
          )}
        </Popover.Trigger>
        <Popover.Content>{fixtures.popoverContent}</Popover.Content>
      </Popover>
    );

    // check if trigger rendered
    const buttonEl = screen.getAllByRole("button")[0];
    const popoverContentEl = screen.getByText(fixtures.popoverContent);
    const closeButtonEl = screen.getByLabelText(fixtures.closeAriaLabel);
    const popoverId = buttonEl.getAttribute(fixtures.ariaDescribedBy) as string;

    expect(buttonEl).toBeInTheDocument();
    expect(popoverContentEl).toBeInTheDocument();
    expect(closeButtonEl).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();

    // check for removal of content after close button clicked
    await user.click(closeButtonEl);

    expect(closeButtonEl).toBeInTheDocument();
    expect(popoverContentEl).toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();
  });

  test("controlled, custom triggerRef", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const PopoverTest = () => {
      const buttonRef = React.useRef(null);

      return (
        <div>
          <button type="button" ref={buttonRef}>
            Button
          </button>
          <Popover
            id={fixtures.testId}
            triggerRef={buttonRef}
            closeAriaLabel={fixtures.closeAriaLabel}
            onOpen={onOpen}
            onClose={onClose}
            disableAnimation
            defaultActive
          >
            <Popover.Content>{fixtures.popoverContent}</Popover.Content>
          </Popover>
        </div>
      );
    };

    const { user } = setup(<PopoverTest />);

    const buttonEl = screen.getAllByRole("button")[0];
    const popoverContentEl = screen.getByText(fixtures.popoverContent);
    const closeButtonEl = screen.getByLabelText(fixtures.closeAriaLabel);
    const popoverId = buttonEl.getAttribute(fixtures.ariaDescribedBy) as string;

    expect(buttonEl).toBeInTheDocument();
    expect(popoverContentEl).toBeInTheDocument();
    expect(closeButtonEl).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(0);
    expect(buttonEl).toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).toBeInTheDocument();

    // check for removal of content after close button clicked
    await user.click(closeButtonEl);

    expect(popoverContentEl).not.toBeInTheDocument();
    expect(closeButtonEl).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(buttonEl).not.toHaveAttribute(fixtures.ariaDescribedBy);
    expect(document.getElementById(popoverId)).not.toBeInTheDocument();
  });

  test("lockClose", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { user } = setup(
      <div>
        <Button
          text="Outside button"
          attributes={{ "data-testid": "outside-button" }}
        />
        <Popover
          closeAriaLabel={fixtures.closeAriaLabel}
          onOpen={onOpen}
          onClose={onClose}
          lockClose
          disableAnimation
          defaultActive
        >
          <Popover.Trigger>
            {(attributes) => (
              <Button attributes={attributes} text={fixtures.buttonText} />
            )}
          </Popover.Trigger>
          <Popover.Content>{fixtures.popoverContent}</Popover.Content>
        </Popover>
      </div>
    );

    // check if trigger rendered
    const outsideButtonEl = screen.getByTestId("outside-button");
    const triggerButtonEl = screen.getAllByRole("button")[0];
    const popoverContentEl = screen.getByText(fixtures.popoverContent);
    const closeButtonEl = screen.getByLabelText(fixtures.closeAriaLabel);
    const popoverId = triggerButtonEl.getAttribute(
      fixtures.ariaDescribedBy
    ) as string;

    const expectation = () => {
      expect(popoverContentEl).toBeInTheDocument();
      expect(closeButtonEl).toBeInTheDocument();
      expect(onOpen).toHaveBeenCalledTimes(0);
      expect(onClose).toHaveBeenCalledTimes(0);
      expect(triggerButtonEl).toHaveAttribute(fixtures.ariaDescribedBy);
      expect(document.getElementById(popoverId)).toBeInTheDocument();
    };

    expectation();

    // check content stayed after close button clicked
    await user.click(closeButtonEl);

    expectation();

    // check content stayed after button ouside of popover is clicked
    await user.click(outsideButtonEl);

    expectation();
  });
});
