import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputSwitch from "components/InputSwitch";

describe("InputSwitch", () => {
  test("renders InputSwitch", () => {
    const testId = "test-bui-input-switch-render";
    const name = "test-input-name";
    const label = "Test Label";

    render(
      <InputSwitch
        label={label}
        name={name}
        attributes={{ "data-testid": testId }}
      />
    );

    const inputByTestId = screen.getByTestId(testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByRole = screen.getByRole("switch");
    expect(inputByRole).toBeInTheDocument();
    expect(inputByRole).toBeEnabled();
  });
  test("disabled", () => {
    const name = "test-input-disabled";
    const label = "Disabled";

    render(<InputSwitch disabled name={name} label={label} />);

    const input = screen.getByLabelText(label);
    expect(input).toBeDisabled();
  });
  test("onChange", () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();

    render(<InputSwitch label={label} name={name} onChange={handleChange} />);

    const input = screen.getByLabelText(label);
    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: true,
      event: expect.any(Object),
    });
  });
  test("onFocus, onBlur", async () => {
    const name = "test-input-focus-blur";
    const label = "Testing onFocus & onBlur";
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    render(
      <InputSwitch
        label={label}
        name={name}
        inputAttributes={{
          onFocus,
          onBlur,
        }}
      />
    );

    const input = screen.getByLabelText(label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
  test("controlled", () => {
    const name = "test-input-controlled";
    const label = "Testing Controlled`";
    const onChange = jest.fn();

    render(
      <InputSwitch
        label={label}
        value={false}
        name={name}
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      name,
      value: true,
      event: expect.any(Object),
    });
  });
  test("uncontrolled", () => {
    const name = "test-input-uncontrolled";
    const label = "Testing Uncontrolled";
    const onChange = jest.fn();

    render(
      <InputSwitch label={label} name={name} defaultValue onChange={onChange} />
    );

    const input = screen.getByLabelText(label);
    fireEvent.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      name,
      value: false,
      event: expect.any(Object),
    });
  });
});
