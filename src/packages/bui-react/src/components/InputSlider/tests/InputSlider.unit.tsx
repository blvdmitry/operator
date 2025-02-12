import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputSlider from "components/InputSlider";

const fixtures = {
  label: "test-label",
  name: "test-name",
  minAriaLabel: "test-min-aria-label",
  maxAriaLabel: "text-max-aria-label",
  className: "test-classname",
  id: "test-id",
  minValue: 20,
  maxValue: 40,
  min: 10,
  max: 100,
};

describe("InputSlider", () => {
  test("renders single selection", () => {
    setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        label={fixtures.label}
        name={fixtures.name}
        defaultValue={fixtures.minValue}
      />
    );

    const inputEl = screen.getByRole("slider");
    const labelEl = screen.getByText(fixtures.label);
    const labeledEl = screen.getByLabelText(fixtures.minAriaLabel);

    expect(labelEl).toBeInTheDocument();
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveValue(fixtures.minValue.toString());
    expect(inputEl).toBe(labeledEl);
  });

  test("single selection works as uncontrolled", () => {
    const handleChange = jest.fn();
    const nextValue = fixtures.minValue + 1;

    setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        name={fixtures.name}
        defaultValue={fixtures.minValue}
        onChange={handleChange}
      />
    );

    const inputEl = screen.getByRole("slider");

    expect(inputEl).toHaveValue(fixtures.minValue.toString());
    fireEvent.change(inputEl, { target: { value: nextValue } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: nextValue,
    });

    expect(inputEl).toHaveValue(nextValue.toString());
  });

  test("single selection works as controlled", () => {
    const handleChange = jest.fn();
    const nextValue = fixtures.minValue + 1;

    setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        name={fixtures.name}
        value={fixtures.minValue}
        onChange={handleChange}
      />
    );

    const inputEl = screen.getByRole("slider");

    expect(inputEl).toHaveValue(fixtures.minValue.toString());
    fireEvent.change(inputEl, { target: { value: nextValue } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: nextValue,
    });

    expect(inputEl).toHaveValue(fixtures.minValue.toString());
  });

  test("renders range selection", () => {
    setup(
      <InputSlider
        range
        minAriaLabel={fixtures.minAriaLabel}
        maxAriaLabel={fixtures.maxAriaLabel}
        name={fixtures.name}
        defaultMinValue={fixtures.minValue}
        defaultMaxValue={fixtures.maxValue}
      />
    );

    const inputEls = screen.getAllByRole("slider");
    const minLabeledEl = screen.getByLabelText(fixtures.minAriaLabel);
    const maxLabeledEl = screen.getByLabelText(fixtures.maxAriaLabel);

    expect(inputEls[0]).toBeInTheDocument();
    expect(inputEls[0]).toHaveValue(fixtures.minValue.toString());
    expect(inputEls[0]).toBe(minLabeledEl);
    expect(inputEls[1]).toBeInTheDocument();
    expect(inputEls[1]).toHaveValue(fixtures.maxValue.toString());
    expect(inputEls[1]).toBe(maxLabeledEl);
  });

  test("range selection works as uncontrolled", () => {
    const handleChange = jest.fn();
    const nextMinValue = fixtures.minValue + 1;
    const nextMaxValue = fixtures.maxValue + 1;

    setup(
      <InputSlider
        range
        minAriaLabel={fixtures.minAriaLabel}
        maxAriaLabel={fixtures.maxAriaLabel}
        name={fixtures.name}
        defaultMinValue={fixtures.minValue}
        defaultMaxValue={fixtures.maxValue}
        onChange={handleChange}
      />
    );

    const inputEls = screen.getAllByRole("slider");
    const minInputEl = inputEls[0];
    const maxInputEl = inputEls[1];

    expect(minInputEl).toHaveValue(fixtures.minValue.toString());
    fireEvent.change(minInputEl, { target: { value: nextMinValue } });
    expect(minInputEl).toHaveValue(nextMinValue.toString());

    expect(maxInputEl).toHaveValue(fixtures.maxValue.toString());
    fireEvent.change(maxInputEl, { target: { value: nextMaxValue } });
    expect(maxInputEl).toHaveValue(nextMaxValue.toString());

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, {
      name: fixtures.name,
      minValue: nextMinValue,
    });
    expect(handleChange).toHaveBeenNthCalledWith(2, {
      name: fixtures.name,
      maxValue: nextMaxValue,
    });
  });

  test("range selection works as controlled", () => {
    const handleChange = jest.fn();
    const nextMinValue = fixtures.minValue + 1;
    const nextMaxValue = fixtures.maxValue + 1;

    setup(
      <InputSlider
        range
        minAriaLabel={fixtures.minAriaLabel}
        maxAriaLabel={fixtures.maxAriaLabel}
        name={fixtures.name}
        minValue={fixtures.minValue}
        maxValue={fixtures.maxValue}
        onChange={handleChange}
      />
    );

    const inputEls = screen.getAllByRole("slider");
    const minInputEl = inputEls[0];
    const maxInputEl = inputEls[1];

    expect(minInputEl).toHaveValue(fixtures.minValue.toString());
    fireEvent.change(minInputEl, { target: { value: nextMinValue } });
    expect(minInputEl).toHaveValue(fixtures.minValue.toString());

    expect(maxInputEl).toHaveValue(fixtures.maxValue.toString());
    fireEvent.change(maxInputEl, { target: { value: nextMaxValue } });
    expect(maxInputEl).toHaveValue(fixtures.maxValue.toString());

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, {
      name: fixtures.name,
      minValue: nextMinValue,
    });
    expect(handleChange).toHaveBeenNthCalledWith(2, {
      name: fixtures.name,
      maxValue: nextMaxValue,
    });
  });

  test("disables selection", () => {
    setup(
      <InputSlider
        disabled
        ariaLabel={fixtures.minAriaLabel}
        label={fixtures.label}
        name={fixtures.name}
      />
    );

    const inputEl = screen.getByRole("slider");

    expect(inputEl).toBeDisabled();
  });

  test("renders custom value and tooltip content", () => {
    setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        label={fixtures.label}
        name={fixtures.name}
        defaultValue={fixtures.minValue}
        renderValue={(value) => `${value} value`}
        renderTooltipValue={(value) => `${value} tooltip`}
      />
    );

    const valueEl = screen.getByText(`${fixtures.minValue} value`);
    const tooltipEl = screen.getByText(`${fixtures.minValue} tooltip`);

    expect(valueEl).toBeInTheDocument();
    expect(tooltipEl).toBeInTheDocument();
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        name={fixtures.name}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });

  test("renders custom aria-valuetext for non-range", () => {
    const renderAttrValue = (value: number) => `Custom ${value}`;

    setup(
      <InputSlider
        ariaLabel={fixtures.minAriaLabel}
        label={fixtures.label}
        name={fixtures.name}
        defaultValue={fixtures.minValue}
        renderValue={(value) => `${value} value`}
        renderTooltipValue={(value) => `${value} tooltip`}
        ariaValuetext={renderAttrValue}
      />
    );

    const inputEl = screen.getByRole("slider");

    expect(inputEl).toHaveAttribute(
      "aria-valuetext",
      renderAttrValue(fixtures.minValue)
    );
  });

  test("renders custom aria-valuetext for range", () => {
    const renderAttrValue = (minValue: number, maxValue?: number) =>
      `Custom ${minValue}, ${maxValue}`;

    setup(
      <InputSlider
        range
        minAriaLabel={fixtures.minAriaLabel}
        maxAriaLabel={fixtures.maxAriaLabel}
        name={fixtures.name}
        defaultMinValue={fixtures.minValue}
        defaultMaxValue={fixtures.maxValue}
        ariaValuetext={renderAttrValue}
      />
    );

    const inputEls = screen.getAllByRole("slider");

    expect(inputEls[0]).toHaveAttribute(
      "aria-valuetext",
      renderAttrValue(fixtures.minValue, fixtures.maxValue)
    );
    expect(inputEls[1]).toHaveAttribute(
      "aria-valuetext",
      renderAttrValue(fixtures.minValue, fixtures.maxValue)
    );
  });
});
