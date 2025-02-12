import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Chip from "components/Chip";

const inputTestId = "test-bui-input-select-render";
const rootTestId = "test-root";
const name = "test-input-name";
const value = "test-value";
const label = "Test Label";
const className = "custom";

describe("Chip", () => {
  test("render", () => {
    setup(
      <Chip
        className={className}
        label={label}
        name={name}
        value={value}
        attributes={{ "data-testid": rootTestId }}
        inputAttributes={{ "data-testid": inputTestId }}
      />
    );

    const input = screen.getByRole("checkbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("data-testid", inputTestId);
    expect(input).toHaveAttribute("name", name);
    expect(input).toHaveAttribute("value", value);
    expect(input).toBeEnabled();

    const root = screen.getByTestId(rootTestId);
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass(className);
  });

  test("disabled", async () => {
    setup(
      <Chip
        attributes={{ "data-testid": rootTestId }}
        label={label}
        name={name}
        disabled
      />
    );

    const input = screen.getByRole("checkbox");
    expect(input).toBeDisabled();
  });

  test("uncontrolled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Chip
        attributes={{ "data-testid": rootTestId }}
        label={label}
        name={name}
        defaultChecked
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("checkbox");
    const root = screen.getByTestId(rootTestId);

    expect(input).toBeChecked();

    await user.click(root);

    expect(handleChange).toBeCalledTimes(1);
    expect(input).not.toBeChecked();
  });

  test("controlled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Chip
        label={label}
        name={name}
        checked
        onChange={handleChange}
        attributes={{ "data-testid": rootTestId }}
      />
    );

    const root = screen.getByTestId(rootTestId);
    const input = screen.getByRole("checkbox");

    expect(input).toBeChecked();

    await user.click(root);

    expect(handleChange).toBeCalledTimes(1);
    expect(input).toBeChecked();
  });

  test("dismissible", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Chip
        label={label}
        name={name}
        dismissible
        onChange={handleChange}
        attributes={{ "data-testid": rootTestId }}
      />
    );

    const root = screen.getByTestId(rootTestId);
    const input = screen.getByRole("checkbox");

    expect(input).toBeChecked();

    await user.click(root);

    expect(handleChange).toBeCalledTimes(1);
    expect(input).toBeChecked();
  });
});
