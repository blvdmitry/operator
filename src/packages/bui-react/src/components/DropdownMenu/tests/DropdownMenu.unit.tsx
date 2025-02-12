import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import DropdownMenu from "components/DropdownMenu";
import Button from "components/Button";

const fixtures = {
  dropdownTestId: "test-id",
  buttonTestId: "button-test-id",
  items: [
    { text: "Change dates" },
    { text: "Add or remove a room" },
    { text: "Add or remove a bed" },
    { text: "Make a special request" },
  ],
};

describe("DropdownMenu", () => {
  test("renders the button and dropdown", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    setup(
      <DropdownMenu
        active
        items={fixtures.items}
        attributes={{ "data-testid": fixtures.dropdownTestId }}
        onClose={onClose}
        onOpen={onOpen}
      >
        {(attributes) => (
          <Button
            text="Open dropdown"
            attributes={{
              ...attributes,
              "data-testid": fixtures.buttonTestId,
            }}
          />
        )}
      </DropdownMenu>
    );

    const button = screen.getByTestId(fixtures.buttonTestId);
    const dropdownMenu = screen.getByTestId(fixtures.dropdownTestId);
    expect(button).toBeInTheDocument();
    expect(dropdownMenu).toBeInTheDocument();
  });

  test("does call close and open event handlers", async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();

    const Component = () => {
      return (
        <DropdownMenu
          items={fixtures.items}
          attributes={{ "data-testid": fixtures.dropdownTestId }}
          onClose={onClose}
          onOpen={onOpen}
        >
          {(attributes) => (
            <Button
              text="Open dropdown"
              attributes={{
                ...attributes,
                "data-testid": fixtures.buttonTestId,
              }}
            />
          )}
        </DropdownMenu>
      );
    };

    const { user } = setup(<Component />);

    const button = screen.getByTestId(fixtures.buttonTestId);

    await user.click(button);
    expect(onOpen).toBeCalledTimes(1);

    await user.click(button);
    expect(onClose).toBeCalledTimes(1);
  });
});
