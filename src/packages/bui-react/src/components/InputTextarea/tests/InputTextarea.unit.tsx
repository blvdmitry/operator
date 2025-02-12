import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { setup } from "tools/jest";
import InputTextarea from "components/InputTextarea";

const fixtures = {
  name: "test-name",
  label: "test-label",
  helper: "test-helper",
  error: "test-error",
  success: "test-success",
  className: "test-classname",
  id: "test-id",
  value: "value",
};

describe("InputTextarea", () => {
  test("renders with helper", () => {
    setup(
      <InputTextarea
        label={fixtures.label}
        name={fixtures.name}
        helper={fixtures.helper}
      />
    );

    const fieldEl = screen.getByRole("textbox");
    const labeledEl = screen.getByLabelText(fixtures.label);
    const helperEl = screen.getByText(fixtures.helper);

    expect(fieldEl).toBeInTheDocument();
    expect(fieldEl).toBe(labeledEl);

    expect(helperEl).toBeInTheDocument();
    expect(fieldEl.getAttribute("aria-describedby")).toEqual(
      helperEl.getAttribute("id")
    );
  });

  test("renders with error", () => {
    setup(<InputTextarea name={fixtures.name} error={fixtures.error} />);

    const fieldEl = screen.getByRole("textbox");
    const errorEl = screen.getByText(fixtures.error);

    expect(errorEl).toBeInTheDocument();
    expect(fieldEl.getAttribute("aria-describedby")).toEqual(
      errorEl.getAttribute("id")
    );
  });

  test("renders with success message", () => {
    setup(<InputTextarea name={fixtures.name} success={fixtures.success} />);

    const fieldEl = screen.getByRole("textbox");
    const successEl = screen.getByText(fixtures.success);

    expect(successEl).toBeInTheDocument();
    expect(fieldEl.getAttribute("aria-describedby")).toEqual(
      successEl.getAttribute("id")
    );
  });

  test("works as uncontrolled", async () => {
    const handleChange = jest.fn();
    const key = "1";
    const nextValue = `${key}${fixtures.value}`;

    const { user } = setup(
      <InputTextarea
        label={fixtures.label}
        name={fixtures.name}
        onChange={handleChange}
        defaultValue={fixtures.value}
      />
    );

    const fieldEl = screen.getByRole("textbox");

    expect(fieldEl).toHaveValue(fixtures.value);

    fieldEl.focus();
    await user.keyboard(key);

    await waitFor(() => {
      expect(fieldEl).toHaveValue(nextValue);
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: nextValue,
      event: expect.any(Object),
    });
  });

  test("works as controlled", async () => {
    const handleChange = jest.fn();
    const key = "1";
    const nextValue = `${key}${fixtures.value}`;

    const { user } = setup(
      <InputTextarea
        label={fixtures.label}
        name={fixtures.name}
        onChange={handleChange}
        value={fixtures.value}
      />
    );

    const fieldEl = screen.getByRole("textbox");

    expect(fieldEl).toHaveValue(fixtures.value);

    fieldEl.focus();
    await user.keyboard(key);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: nextValue,
      event: expect.any(Object),
    });

    await waitFor(() => {
      expect(fieldEl).toHaveValue(fixtures.value);
    });
  });

  test("disables the field", () => {
    setup(<InputTextarea disabled name={fixtures.name} />);

    const fieldEl = screen.getByRole("textbox");
    expect(fieldEl).toBeDisabled();
  });

  test("adds required attributes", () => {
    setup(<InputTextarea required name={fixtures.name} />);

    const fieldEl = screen.getByRole("textbox");
    expect(fieldEl).toHaveAttribute("aria-required");
  });

  test("shows length counter", () => {
    setup(
      <InputTextarea
        maximumLength={100}
        showLengthCounter
        defaultValue={fixtures.value}
        name={fixtures.name}
        label={fixtures.label}
      />
    );

    const fieldEl = screen.getByRole("textbox");
    const counterEl = screen.getByText(`${fixtures.value.length} / 100`);

    expect(fieldEl).toHaveAttribute("maxlength", "100");
    expect(counterEl).toBeInTheDocument();
  });
});
