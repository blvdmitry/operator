import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputRadioCard from "components/InputRadioCard";

describe("InputRadioCard", () => {
  const fixtures = {
    testId: "test-input-radio-card-id",
    name: "test-input-radio-card-name",
    value: "test-input-radio-card-value",
    label: "test-input-radio-card-label",
  };

  test("renders InputRadioCard", () => {
    setup(
      <InputRadioCard
        name={fixtures.name}
        value={fixtures.value}
        inputAttributes={{ "data-testid": fixtures.testId }}
      >
        {fixtures.label}
      </InputRadioCard>
    );

    const inputByTestId = screen.getByTestId(fixtures.testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByRole = screen.getByRole("radio");
    expect(inputByRole).toBeInTheDocument();

    // expect(screen.getByText(additionalContent)).toBeInTheDocument();

    expect(inputByRole).toBeEnabled();
  });

  test("hidden input element", () => {
    setup(
      <InputRadioCard
        name={fixtures.name}
        value={fixtures.value}
        showInputElement={false}
        inputAttributes={{ "data-testid": fixtures.testId }}
      >
        {fixtures.label}
      </InputRadioCard>
    );

    const inputByTestId = screen.getByTestId(fixtures.testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByRole = screen.getByRole("radio");
    expect(inputByRole).toBeInTheDocument();

    // expect(screen.getByText(additionalContent)).toBeInTheDocument();

    expect(inputByRole).toBeEnabled();
  });

  test("disabled", () => {
    setup(
      <InputRadioCard disabled name={fixtures.name} value={fixtures.value}>
        {fixtures.label}
      </InputRadioCard>
    );

    const input = screen.getByLabelText(new RegExp(fixtures.label));
    expect(input).toBeDisabled();
  });

  test("onChange", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputRadioCard
        name={fixtures.name}
        value={fixtures.value}
        onChange={handleChange}
      >
        {fixtures.label}
      </InputRadioCard>
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
      <InputRadioCard
        value={fixtures.value}
        name={fixtures.name}
        inputAttributes={{ onFocus, onBlur }}
      >
        {fixtures.label}
      </InputRadioCard>
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
      <InputRadioCard
        value={fixtures.value}
        name={fixtures.name}
        onChange={handleChange}
        checked={false}
      >
        {fixtures.label}
      </InputRadioCard>
    );

    const input = screen.getByLabelText(fixtures.label);

    await user.click(input);

    expect((input as HTMLInputElement).checked).toBe(false);
  });
});
