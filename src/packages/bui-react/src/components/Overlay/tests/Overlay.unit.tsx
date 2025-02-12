import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setup } from "tools/jest";
import Overlay from "components/Overlay";

const fixtures = {
  openText: "Open",
  content: "Content",
  testId: "test-id",
  overlayTestId: "overlay-test-id",
};

describe("Overlay", () => {
  test("renders children", () => {
    setup(<Overlay active>{fixtures.content}</Overlay>);

    const el = screen.getByText(fixtures.content);
    expect(el).toBeInTheDocument();
  });

  test("renders children as a function", () => {
    setup(
      <Overlay active>
        {({ active }) => (active ? fixtures.content : "")}
      </Overlay>
    );

    const el = screen.queryByText(fixtures.content);
    expect(el).toBeInTheDocument();
  });

  test("does not render children when active=false", async () => {
    setup(<Overlay active={false}>{fixtures.content}</Overlay>);

    expect(screen.queryByText(fixtures.content)).not.toBeInTheDocument();
  });

  test("keepMounted does not unmount content, when default active", async () => {
    const handleOpenMock = jest.fn();
    const handleCloseTriggerMock = jest.fn();
    const handleCloseMock = jest.fn();

    const Component = () => {
      const [active, setActive] = React.useState(true);

      const handleCloseTrigger = () => {
        setActive(false);
        handleCloseTriggerMock();
      };
      return (
        <Overlay
          active={active}
          onOpen={handleOpenMock}
          onCloseTrigger={handleCloseTrigger}
          onClose={handleCloseMock}
          attributes={{ "data-testid": fixtures.overlayTestId }}
          keepMounted
        >
          {fixtures.content}
        </Overlay>
      );
    };

    const { user } = setup(<Component />);

    const elOverlay = screen.getByTestId(fixtures.overlayTestId);

    await user.click(elOverlay);
    fireEvent.transitionEnd(elOverlay);

    expect(handleCloseTriggerMock).toBeCalledTimes(1);
    await waitFor(() => {
      expect(elOverlay).toBeInTheDocument();
      expect(handleCloseMock).toBeCalledTimes(1);
    });
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
          <Overlay
            active={active}
            onOpen={handleOpenMock}
            onCloseTrigger={handleCloseTrigger}
            onClose={handleCloseMock}
            attributes={{ "data-testid": fixtures.overlayTestId }}
          >
            {fixtures.content}
          </Overlay>
        </>
      );
    };

    const { user } = setup(<Component />);

    const elButton = screen.getByTestId(fixtures.testId);
    const elOverlay = screen.getByTestId(fixtures.overlayTestId);
    expect(handleOpenMock).not.toBeCalled();

    await user.click(elOverlay);
    fireEvent.transitionEnd(elOverlay);

    expect(handleCloseTriggerMock).toBeCalledTimes(1);
    await waitFor(() => {
      expect(elOverlay).not.toBeInTheDocument();
      expect(handleCloseMock).toBeCalledTimes(1);
    });

    await user.click(elButton);
    expect(handleOpenMock).toBeCalledTimes(1);
    expect(screen.getByText(fixtures.content)).toBeInTheDocument();
  });

  test("doesn't call onCloseTrigger on ESC when modal is not active", async () => {
    const handleCloseTriggerMock = jest.fn();

    const { user } = setup(<Overlay onCloseTrigger={handleCloseTriggerMock} />);

    await user.keyboard("[Escape]");

    expect(handleCloseTriggerMock).not.toBeCalled();
  });
});
