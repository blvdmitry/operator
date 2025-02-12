import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputCheckboxGroup from "components/InputCheckboxGroup";
import InputCheckbox from "components/InputCheckbox";

describe("InputCheckboxGroup", () => {
  test("renders InputCheckboxGroup", () => {
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
      <InputCheckboxGroup label={label} name={name}>
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(3);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeEnabled();
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
      <InputCheckboxGroup disabled name={name} label={label}>
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeDisabled();
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
      <InputCheckboxGroup label={label} name={name} onChange={handleChange}>
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[1]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: [options[1].value],
      event: expect.any(Object),
    });

    await user.click(checkboxes[2]);

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: [options[1].value, options[2].value],
      event: expect.any(Object),
    });

    await user.click(checkboxes[2]);

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value: [options[1].value],
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
      <InputCheckboxGroup label={label} name={name}>
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.focus(checkboxes[0]);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(checkboxes[0]);
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
      <InputCheckboxGroup
        label={label}
        value={[options[2].value]}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[2]);

    expect((checkboxes as HTMLInputElement[])[0].checked).toBe(false);
    expect((checkboxes as HTMLInputElement[])[2].checked).toBe(true);
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
      <InputCheckboxGroup
        label={label}
        defaultValue={[options[2].value]}
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <InputCheckbox {...option} key={option.value} />
        ))}
      </InputCheckboxGroup>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    await user.click(checkboxes[0]);
    await user.click(checkboxes[2]);

    expect((checkboxes as HTMLInputElement[])[0].checked).toBe(true);
    expect((checkboxes as HTMLInputElement[])[2].checked).toBe(false);
  });
});
