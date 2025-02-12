import React from "react";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import Button from "components/Button";
import { ToastProvider, useToast } from "components/Toast";

describe("Toast", () => {
  const fixtures = {
    buttonText: "Toaster",
    toastText: "You just got toasted",
    timeout: 2000,
  };

  test("mounts and unmounts toast based on the timeout", async () => {
    const ActivateToast = () => {
      const { show } = useToast();
      return (
        <Button
          text={fixtures.buttonText}
          onClick={() => show({ text: fixtures.toastText }, fixtures.timeout)}
        />
      );
    };

    const { user } = setup(
      <ToastProvider>
        <ActivateToast />
      </ToastProvider>
    );

    const buttonEl = screen.getByRole("button");

    expect(buttonEl).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    await user.click(buttonEl);
    const toastEl = screen.getByRole("alert");

    expect(toastEl).toBeInTheDocument();

    // TODO: There are issues with fake timers after Jest v27, figure out a way to fix those
    await waitFor(() => {
      setTimeout(() => {
        fireEvent.transitionEnd(toastEl);
        expect(toastEl).not.toBeInTheDocument();
      }, 4000);
    });
  });
});
