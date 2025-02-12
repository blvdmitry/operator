import React from "react";
import { screen, waitFor, act } from "@testing-library/react";
import { setup } from "tools/jest";
import Autocomplete from "components/Autocomplete";
import InputText from "components/InputText";

describe("Autocomplete", () => {
  it("works with the base implementation", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <Autocomplete value="Vacation" onChange={handleChange}>
        <Autocomplete.Trigger>
          {(attributes) => (
            <InputText
              label="Trip type"
              name="trip-type"
              value="Vacation"
              inputAttributes={attributes}
            />
          )}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          {["Vacation", "Business trip", "Other"].map((value) => (
            <Autocomplete.Item key={value} value={value}>
              {value}
            </Autocomplete.Item>
          ))}
        </Autocomplete.Popover>
      </Autocomplete>
    );

    const inputEl = screen.getByRole("combobox");
    expect(inputEl).toBeInTheDocument();

    act(() => {
      inputEl.click();
    });

    let optionEls: HTMLElement[] = [];
    await waitFor(() => {
      optionEls = screen.getAllByRole("option");
    });
    const firstOption = optionEls[0];

    expect(optionEls.length).toBe(3);
    expect(inputEl).toHaveAttribute("autocomplete", "off");
    expect(inputEl).toHaveValue("Vacation");

    const controlledId = inputEl.getAttribute("aria-describedby");
    expect(controlledId).toBeTruthy();
    expect(document.getElementById(controlledId!)).toBeInTheDocument();

    await user.click(firstOption);

    expect(handleChange).toBeCalledTimes(1);
    expect(handleChange).toBeCalledWith({ value: "Vacation" });
  });

  it("opens popover on the arrow down key press", async () => {
    const { user } = setup(
      <Autocomplete>
        <Autocomplete.Trigger>
          {(attributes) => (
            <InputText
              label="Trip type"
              name="trip-type"
              value="Vacation"
              inputAttributes={attributes}
            />
          )}
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Item value="Vacation">Vacation</Autocomplete.Item>
        </Autocomplete.Popover>
      </Autocomplete>
    );

    const inputEl = screen.getByRole("combobox");

    await act(async () => {
      inputEl.focus();
      await user.keyboard("{ArrowDown}");
    });

    await waitFor(() => {
      const optionEls = screen.getAllByRole("option");
      expect(optionEls.length > 0).toBeTruthy();
    });
  });
});
