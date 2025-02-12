import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputCheckboxCard from "components/InputCheckboxCard";

describe("InputCheckboxCard", () => {
  const fixtures = {
    testId: "test-bui-input-checkbox-card",
    name: "test-input-name",
    value: "test-value",
    label: "Test Label",
    additionalContent: "Test Additional Content",
  };

  test("renders InputCheckboxCard", () => {
    setup(
      <InputCheckboxCard
        name={fixtures.name}
        value={fixtures.value}
        inputAttributes={{ "data-testid": fixtures.testId }}
        additionalContent={fixtures.additionalContent}
      >
        {fixtures.label}
      </InputCheckboxCard>
    );

    const inputByTestId = screen.getByTestId(fixtures.testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByRole = screen.getByRole("checkbox");
    expect(inputByRole).toBeInTheDocument();

    expect(screen.getByText(fixtures.additionalContent)).toBeInTheDocument();

    expect(inputByRole).toBeEnabled();
  });
  test("disabled", () => {
    setup(
      <InputCheckboxCard disabled name={fixtures.name} value={fixtures.value}>
        {fixtures.label}
      </InputCheckboxCard>
    );

    const input = screen.getByLabelText(new RegExp(fixtures.label));
    expect(input).toBeDisabled();
  });
  test("onChange", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputCheckboxCard
        name={fixtures.name}
        value={fixtures.value}
        onChange={handleChange}
      >
        {fixtures.label}
      </InputCheckboxCard>
    );

    const input = screen.getByLabelText(fixtures.label);

    await user.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: fixtures.value,
      checked: true,
      event: expect.any(Object),
    });
  });
  test("onFocus, onBlur", async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    setup(
      <InputCheckboxCard
        value={fixtures.value}
        name={fixtures.name}
        inputAttributes={{ onFocus, onBlur }}
      >
        {fixtures.label}
      </InputCheckboxCard>
    );

    const input = screen.getByLabelText(fixtures.label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("controlled", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputCheckboxCard
        value={fixtures.value}
        name={fixtures.name}
        onChange={handleChange}
        checked={false}
      >
        {fixtures.label}
      </InputCheckboxCard>
    );

    const input = screen.getByLabelText(fixtures.label);

    await user.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
  });

  test("uncontrolled", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputCheckboxCard
        value={fixtures.value}
        name={fixtures.name}
        onChange={handleChange}
        defaultChecked
      >
        {fixtures.label}
      </InputCheckboxCard>
    );

    const input = screen.getByLabelText(fixtures.label);

    await user.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
  });
});
