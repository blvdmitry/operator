import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputRadio from "components/InputRadio";

describe("InputRadio", () => {
  test("renders InputRadio", () => {
    const testId = "test-bui-input-select-render";
    const name = "test-input-name";
    const value = "test-value";
    const label = "Test Label";
    const helper = "Test Sub Label";

    setup(
      <InputRadio
        label={label}
        name={name}
        value={value}
        inputAttributes={{ "data-testid": testId }}
        helper={helper}
      />
    );

    const inputByTestId = screen.getByTestId(testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByRole = screen.getByRole("radio");
    expect(inputByRole).toBeInTheDocument();

    expect(screen.getByText(helper)).toBeInTheDocument();

    expect(inputByRole).toBeEnabled();
  });

  test("disabled", () => {
    const name = "test-input-disabled";
    const label = "Disabled";
    const value = "test-value";

    setup(
      <InputRadio
        disabled
        name={name}
        label={label}
        value={value}
        helper="Help Me!"
      />
    );

    const input = screen.getByLabelText(new RegExp(label));
    expect(input).toBeDisabled();
  });

  test("onChange", async () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();
    const value = "test-value";

    const { user } = setup(
      <InputRadio
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(label);

    await user.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value,
      checked: true,
      event: expect.any(Object),
    });
  });
  test("onFocus, onBlur", async () => {
    const name = "test-input-focus-blur";
    const value = "test-value";
    const label = "Testing onFocus & onBlur";
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    setup(
      <InputRadio
        label={label}
        value={value}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const input = screen.getByLabelText(label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("controlled", async () => {
    const name = "test-input-change";
    const value = "test-value";
    const label = "Testing onChange";
    const handleChange = jest.fn();

    const { user } = setup(
      <InputRadio
        label={label}
        value={value}
        name={name}
        onChange={handleChange}
        checked={false}
      />
    );

    const input = screen.getByLabelText(label);

    await user.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
  });
});
