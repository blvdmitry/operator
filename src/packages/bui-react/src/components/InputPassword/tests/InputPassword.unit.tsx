import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputPassword from "components/InputPassword";

describe("InputPassword", () => {
  test("renders InputPassword", () => {
    const testId = "test-bui-input-password-render";
    const name = "test-input-name";
    const label = "Test Label";
    const helperText = "Test Helper";
    const showPasswordAriaLabel = "Show password";

    setup(
      <InputPassword
        label={label}
        name={name}
        inputAttributes={{ "data-testid": testId }}
        helper={helperText}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const inputByTestId = screen.getByTestId(testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText(label);
    expect(inputByLabel).toBeInTheDocument();
    expect(inputByLabel).toHaveAttribute("type", "password");

    const helper = screen.getByText(helperText);
    expect(helper).toBeInTheDocument();

    expect(inputByLabel).toBeEnabled();
  });

  test("disabled", () => {
    const name = "test-input-disabled";
    const label = "Disabled";
    const showPasswordAriaLabel = "Show password";

    setup(
      <InputPassword
        disabled
        name={name}
        label={label}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const input = screen.getByLabelText(label);
    expect(input).toBeDisabled();
  });

  test("onChange", () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const showPasswordAriaLabel = "Show password";
    const handleChange = jest.fn();
    const value = "test value";

    setup(
      <InputPassword
        label={label}
        name={name}
        onChange={handleChange}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value,
      event: expect.any(Object),
    });
  });

  test("onFocus, onBlur", () => {
    const name = "test-input-focus-blur";
    const label = "Testing onFocus & onBlur";
    const showPasswordAriaLabel = "Show password";
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    setup(
      <InputPassword
        label={label}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const input = screen.getByLabelText(label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  test("show password button", async () => {
    const name = "test-input-show-hide-button";
    const label = "Show/Hide Button";
    const showPasswordAriaLabel = "Show password";
    const { user } = setup(
      <InputPassword
        name={name}
        label={label}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.focus(input);
    fireEvent.change(input, {
      target: {
        value: "test value",
      },
    });

    const showPasswordButton = screen.getByRole("button");
    expect(showPasswordButton).toBeInTheDocument();

    await user.click(showPasswordButton);

    expect(input).toHaveAttribute("type", "text");

    await user.click(showPasswordButton);

    expect(input).toHaveAttribute("type", "password");
  });

  test("controlled", () => {
    const name = "test-input-controlled";
    const label = "Testing Controlled";
    const showPasswordAriaLabel = "Show password";
    const handleChange = jest.fn();
    const initialValue = "initial";
    const modifiedValue = "modified";

    setup(
      <InputPassword
        label={label}
        name={name}
        onChange={handleChange}
        value={initialValue}
        showPasswordAriaLabel={showPasswordAriaLabel}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value: modifiedValue } });

    expect((input as HTMLInputElement).value).toBe(initialValue);
  });
});
