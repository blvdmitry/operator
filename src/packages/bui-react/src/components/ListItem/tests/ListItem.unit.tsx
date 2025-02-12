import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import { KettleIcon } from "@bookingcom/bui-assets-react/streamline";
import ListItem from "components/ListItem";

const className = "test-className";
const testId = "test-list-item";
const attributes = { "data-testid": testId };

describe("ListItem", () => {
  test("render", async () => {
    const handleClick = jest.fn();
    const { user } = setup(
      <ListItem
        icon={KettleIcon}
        onClick={handleClick}
        attributes={attributes}
        className={className}
      >
        Trips
      </ListItem>
    );

    const listItem = screen.getByTestId(testId);

    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass(className);

    await user.click(listItem);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disabled", async () => {
    const handleClick = jest.fn();
    const { user } = setup(
      <ListItem
        icon={KettleIcon}
        onClick={handleClick}
        attributes={attributes}
        disabled
      >
        Trips
      </ListItem>
    );

    const listItem = screen.getByTestId(testId);

    expect(listItem).toBeInTheDocument();

    await user.click(listItem);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
