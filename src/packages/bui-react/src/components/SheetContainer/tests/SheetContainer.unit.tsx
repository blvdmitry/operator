import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { setup } from "tools/jest";
import SheetContainer from "components/SheetContainer";

const fixtures = {
  openText: "Open",
  content: "Content",
  closeAriaLabel: "Close sheet",
  testId: "test-id",
  overlayTestId: "overlay-test-id",
};

describe("SheetContainer", () => {
  test("renders children", () => {
    setup(
      <SheetContainer closeAriaLabel={fixtures.closeAriaLabel} active>
        {fixtures.content}
      </SheetContainer>
    );

    const el = screen.getByText(fixtures.content);
    expect(el).toBeInTheDocument();
  });

  test("triggers onOpen and onClose", async () => {
    const handleOpenMock = jest.fn();
    const handleCloseTriggerMock = jest.fn();
    const handleCloseMock = jest.fn();

    const Component = () => {
      const [active, setActive] = React.useState(true);

      const handleCloseTrigger = () => {
        setActive(false);
        handleCloseTriggerMock();
      };

      const handleOpen = () => {
        setActive(true);
      };

      return (
        <>
          <button
            type="button"
            data-testid={fixtures.testId}
            onClick={handleOpen}
          >
            {fixtures.openText}
          </button>
          <SheetContainer
            active={active}
            closeAriaLabel={fixtures.closeAriaLabel}
            onOpen={handleOpenMock}
            onCloseTrigger={handleCloseTrigger}
            onClose={handleCloseMock}
            overlayAttributes={{ "data-testid": fixtures.overlayTestId }}
          >
            {fixtures.content}
          </SheetContainer>
        </>
      );
    };

    const { user } = setup(<Component />);

    const elButton = screen.getByTestId(fixtures.testId);
    const elOverlay = screen.getByTestId(fixtures.overlayTestId);
    expect(handleOpenMock).not.toBeCalled();

    await user.click(elOverlay);
    fireEvent.transitionEnd(elOverlay);

    await waitFor(() => {
      expect(elOverlay).not.toBeInTheDocument();
      expect(handleCloseMock).toBeCalledTimes(1);
      expect(handleCloseTriggerMock).toBeCalledTimes(1);
    });

    await user.click(elButton);
    expect(handleOpenMock).toBeCalledTimes(1);
    expect(screen.getByTestId(fixtures.overlayTestId)).toBeInTheDocument();
  });

  test("supports focus management with onAfterOpen", async () => {
    const handleOpenMock = jest.fn();

    const Component = () => {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const [active, setActive] = React.useState(false);

      const handleAfterOpen = () => {
        handleOpenMock();
        inputRef.current?.focus?.();
      };

      return (
        <>
          <button
            type="button"
            data-testid={fixtures.testId}
            onClick={() => setActive(true)}
          >
            {fixtures.openText}
          </button>
          <SheetContainer
            active={active}
            onCloseTrigger={() => setActive(false)}
            size={600}
            position="bottom"
            closeAriaLabel={fixtures.closeAriaLabel}
            onAfterOpen={handleAfterOpen}
          >
            <input
              type="text"
              name="example"
              ref={inputRef}
              data-testid="input"
            />
          </SheetContainer>
        </>
      );
    };

    const { user } = setup(<Component />);

    const elButton = screen.getByTestId(fixtures.testId);
    expect(handleOpenMock).not.toBeCalled();

    await user.click(elButton);

    await waitFor(() => {
      expect(handleOpenMock).toBeCalledTimes(1);

      const elInput = screen.getByTestId("input");

      expect(elInput).toBeInTheDocument();
      expect(document.activeElement).toBe(elInput);
    });
  });
});
