import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import InputStepper from "components/InputStepper";

describe("InputStepper", () => {
  const fixtures = {
    testId: "input-stepper-test-id",
    name: "input-stepper-name",
    className: "input-stepper-class",
    label: "InputStepper Label",
    helper: "InputStepper Caption",
    defaultValue: 7,
    min: 2,
    max: 11,
    step: 5,
  };

  test("renders InputStepper", () => {
    const { output } = setup(
      <InputStepper
        className={fixtures.className}
        label={fixtures.label}
        helper={fixtures.helper}
        name={fixtures.name}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];
    expect(input).toBeInTheDocument();
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();

    const inputByRole = screen.getByRole("slider");
    expect(inputByRole).toBeInTheDocument();
    expect(inputByRole).toBeEnabled();

    const root = output.container.firstChild;
    expect(root).toHaveClass(fixtures.className);
    expect(root).toHaveAttribute("data-testid", fixtures.testId);
  });

  test("disabled", () => {
    setup(
      <InputStepper disabled name={fixtures.name} label={fixtures.label} />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];
    expect(input).toBeDisabled();
    expect(minusButton).toBeDisabled();
    expect(plusButton).toBeDisabled();
  });

  test("uncontrolled", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputStepper
        label={fixtures.label}
        name={fixtures.name}
        defaultValue={fixtures.defaultValue}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];

    await user.click(plusButton);

    expect(handleChange).toBeCalledTimes(1);
    expect(input.getAttribute("value")).toBe(`${fixtures.defaultValue + 1}`);
    expect(handleChange).toHaveBeenNthCalledWith(1, {
      name: fixtures.name,
      value: fixtures.defaultValue + 1,
    });

    await user.click(minusButton);

    expect(handleChange).toBeCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(2, {
      name: fixtures.name,
      value: fixtures.defaultValue,
    });
  });

  test("controlled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <InputStepper
        label={fixtures.label}
        name={fixtures.name}
        min={fixtures.min}
        max={fixtures.max}
        value={fixtures.defaultValue}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];

    await user.click(plusButton);

    expect(handleChange).toBeCalledTimes(1);
    expect(handleChange).toHaveBeenNthCalledWith(1, {
      name: fixtures.name,
      value: fixtures.defaultValue + 1,
    });
    expect(input.getAttribute("value")).toBe(`${fixtures.defaultValue}`);

    await user.click(minusButton);

    expect(handleChange).toBeCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(2, {
      name: fixtures.name,
      value: fixtures.defaultValue - 1,
    });
    expect(input.getAttribute("value")).toBe(`${fixtures.defaultValue}`);
  });

  test("at min value", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputStepper
        label={fixtures.label}
        name={fixtures.name}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.min}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];

    expect(minusButton).toBeDisabled();

    await user.click(minusButton);

    expect(handleChange).toBeCalledTimes(0);
    expect(input.getAttribute("value")).toBe(`${fixtures.min}`);
    expect(plusButton).toBeEnabled();
  });

  test("at max value", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputStepper
        label={fixtures.label}
        name={fixtures.name}
        min={fixtures.min}
        max={fixtures.max}
        defaultValue={fixtures.max}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];

    expect(plusButton).toBeDisabled();

    await user.click(plusButton);

    expect(handleChange).toBeCalledTimes(0);
    expect(input.getAttribute("value")).toBe(`${fixtures.max}`);
    expect(minusButton).toBeEnabled();
  });

  test("increments by step", async () => {
    const handleChange = jest.fn();

    const { user } = setup(
      <InputStepper
        label={fixtures.label}
        name={fixtures.name}
        step={fixtures.step}
        defaultValue={fixtures.defaultValue}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(fixtures.label);
    const minusButton = screen.getAllByRole("button", { hidden: true })[0];
    const plusButton = screen.getAllByRole("button", { hidden: true })[1];

    await user.click(plusButton);

    expect(handleChange).toBeCalledTimes(1);
    expect(input.getAttribute("value")).toBe(
      `${fixtures.defaultValue + fixtures.step}`
    );
    expect(plusButton).toBeEnabled();
    expect(minusButton).toBeEnabled();

    await user.click(minusButton);

    expect(handleChange).toBeCalledTimes(2);
    expect(input.getAttribute("value")).toBe(`${fixtures.defaultValue}`);
    expect(plusButton).toBeEnabled();
    expect(minusButton).toBeEnabled();
  });
});
