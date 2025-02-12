import React from "react";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { setup } from "tools/jest";
import InputText from "components/InputText";

const fixtures = {
  label: "Test label",
  helper: "Test helper",
  name: "test-name",
  id: "test-id",
  value: "test value",
  modifiedValue: "modified test value",
};

export const waitForNextTick = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
      });
    });
  });
};

describe("InputText", () => {
  test("renders InputText", () => {
    setup(
      <InputText
        label={fixtures.label}
        name={fixtures.name}
        helper={fixtures.helper}
      />
    );

    const elInput = screen.getByRole("textbox");
    expect(elInput).toBeInTheDocument();

    const elLabelledInput = screen.getByLabelText(fixtures.label);
    expect(elLabelledInput).toBeInTheDocument();

    const helper = screen.getByText(fixtures.helper);
    expect(helper).toBeInTheDocument();

    expect(elInput).toBeEnabled();
  });

  test("disabled", () => {
    setup(<InputText disabled name={fixtures.name} label={fixtures.label} />);

    const elInput = screen.getByRole("textbox");
    expect(elInput).toBeDisabled();
  });

  test("onChange", () => {
    const handleChange = jest.fn();

    setup(
      <InputText
        label={fixtures.label}
        name={fixtures.name}
        onChange={handleChange}
      />
    );

    const elInput = screen.getByRole("textbox");
    fireEvent.change(elInput, { target: { value: fixtures.value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name: fixtures.name,
      value: fixtures.value,
      event: expect.any(Object),
    });
  });

  test("onFocus, onBlur", async () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    setup(
      <InputText
        label={fixtures.label}
        name={fixtures.name}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );

    const elInput = screen.getByRole("textbox");

    fireEvent.focus(elInput);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(elInput);
    await waitFor(() => expect(onBlur).toHaveBeenCalledTimes(1));
  });

  test("clear button works with `always` value", async () => {
    const { user } = setup(
      <InputText
        name={fixtures.name}
        label={fixtures.label}
        clearButtonVisibility="always"
      />
    );

    const elInput = screen.getByRole("textbox");

    await user.click(elInput);
    fireEvent.change(elInput, {
      target: {
        value: fixtures.value,
      },
    });

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();

    await user.click(document.body);

    // Handle raf inside the component handlers
    await act(async () => {
      await waitForNextTick();
    });

    expect(clearButton).toBeInTheDocument();
  });

  test("clear button works with `on-edit` value", async () => {
    const { user } = setup(
      <InputText
        name={fixtures.name}
        label={fixtures.label}
        clearButtonVisibility="on-edit"
      />
    );

    const elInput = screen.getByRole("textbox");

    await user.click(elInput);
    fireEvent.change(elInput, {
      target: {
        value: fixtures.value,
      },
    });

    const elClearButton = screen.getByRole("button");
    expect(elClearButton).toBeInTheDocument();

    await user.click(document.body);

    // Handle raf inside the component handlers
    await act(async () => {
      await waitForNextTick();
    });

    expect(elClearButton).not.toBeInTheDocument();
  });

  test("clear button click", () => {
    setup(
      <InputText
        label={fixtures.label}
        name={fixtures.name}
        defaultValue={fixtures.value}
        clearButtonVisibility="always"
      />
    );

    const elInput = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.focus(elInput);

    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(elInput.value).toBe("");
  });

  test("controlled", () => {
    setup(
      <InputText
        label={fixtures.label}
        name={fixtures.name}
        value={fixtures.value}
      />
    );

    const elInput = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(elInput, { target: { value: fixtures.modifiedValue } });

    expect(elInput.value).toBe(fixtures.value);
  });
});
