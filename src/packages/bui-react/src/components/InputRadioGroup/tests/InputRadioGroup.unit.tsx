import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputRadioGroup from "components/InputRadioGroup";
import InputRadio from "components/InputRadio";

describe("InputRadioGroup", () => {
  test("renders InputRadioGroup", () => {
    const name = "test-input-name";
    const label = "Test Label";
    const options = [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ];

    setup(
      <InputRadioGroup label={label} name={name}>
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);

    radios.forEach((radio) => {
      expect(radio).toBeInTheDocument();
      expect(radio).toBeEnabled();
    });
  });

  test("disabled", () => {
    const name = "test-input-disabled";
    const label = "Disabled";
    const options = [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ];

    setup(
      <InputRadioGroup disabled name={name} label={label}>
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toBeInTheDocument();
      expect(radio).toBeDisabled();
    });
  });

  test("onChange", async () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();
    const options = [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ];

    const { user } = setup(
      <InputRadioGroup label={label} name={name} onChange={handleChange}>
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");

    await user.click(radios[1]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: options[1].value,
      event: expect.any(Object),
    });

    await user.click(radios[2]);

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: options[2].value,
      event: expect.any(Object),
    });

    await user.click(radios[1]);

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: options[1].value,
      event: expect.any(Object),
    });
  });

  test("onFocus, onBlur", async () => {
    const name = "test-input-focus-blur";
    const label = "Testing onFocus & onBlur";
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const options = [
      {
        label: "Option 1",
        value: "option1",
        onFocus,
        onBlur,
      },
    ];

    setup(
      <InputRadioGroup label={label} name={name}>
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");

    fireEvent.focus(radios[0]);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(radios[0]);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("controlled", async () => {
    const name = "test-input-controlled";
    const label = "Testing controlled";
    const handleChange = jest.fn();
    const options = [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ];

    const { user } = setup(
      <InputRadioGroup
        label={label}
        value={options[2].value}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");

    await user.click(radios[0]);
    await user.click(radios[1]);

    expect((radios as HTMLInputElement[])[0].checked).toBe(false);
    expect((radios as HTMLInputElement[])[1].checked).toBe(false);
    expect((radios as HTMLInputElement[])[2].checked).toBe(true);
  });

  test("uncontrolled", async () => {
    const name = "test-input-uncontrolled";
    const label = "Testing uncontrolled";
    const handleChange = jest.fn();
    const options = [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ];

    const { user } = setup(
      <InputRadioGroup
        label={label}
        defaultValue={options[2].value}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <InputRadio {...option} key={option.value} />
        ))}
      </InputRadioGroup>
    );

    const radios = screen.getAllByRole("radio");

    await user.click(radios[0]);

    expect((radios as HTMLInputElement[])[0].checked).toBe(true);
    expect((radios as HTMLInputElement[])[1].checked).toBe(false);
    expect((radios as HTMLInputElement[])[2].checked).toBe(false);

    await user.click(radios[1]);

    expect((radios as HTMLInputElement[])[0].checked).toBe(false);
    expect((radios as HTMLInputElement[])[1].checked).toBe(true);
    expect((radios as HTMLInputElement[])[2].checked).toBe(false);
  });
});
