import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import InputSelect from "components/InputSelect";

describe("InputSelect", () => {
  test("renders InputSelect", () => {
    const testId = "test-bui-input-select-render";
    const name = "test-input-name";
    const label = "Test Label";
    const helperText = "Test Helper";

    setup(
      <InputSelect
        label={label}
        name={name}
        inputAttributes={{ "data-testid": testId }}
        helper={helperText}
        options={[
          {
            text: "Option 1",
            value: "opt1",
          },
        ]}
      />
    );

    const inputByTestId = screen.getByTestId(testId);
    expect(inputByTestId).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText(label);
    expect(inputByLabel).toBeInTheDocument();

    const helper = screen.getByText(helperText);
    expect(helper).toBeInTheDocument();

    expect(inputByLabel).toBeEnabled();
  });

  test("disabled", () => {
    const name = "test-input-disabled";
    const label = "Disabled";

    setup(
      <InputSelect
        disabled
        name={name}
        label={label}
        options={[
          {
            text: "Option 1",
            value: "opt1",
          },
        ]}
      />
    );

    const input = screen.getByLabelText(label);
    expect(input).toBeDisabled();
  });

  test("onChange", () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();
    const value = "option3";
    const options = [
      {
        text: "Option 1",
        value: "option1",
      },
      {
        text: "Option 2",
        value: "option2",
      },
      {
        text: "Option 3",
        value: "option3",
      },
    ];

    setup(
      <InputSelect
        label={label}
        name={name}
        onChange={handleChange}
        options={options}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith({
      name,
      value,
      event: expect.any(Object),
    });
  });

  test("onFocus, onBlur", () => {
    const name = "test-input-focus-blur";
    const label = "Testing onFocus & onBlur";
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const options = [
      {
        text: "Option 1",
        value: "option1",
      },
      {
        text: "Option 2",
        value: "option2",
      },
      {
        text: "Option 3",
        value: "option3",
      },
    ];

    setup(
      <InputSelect
        label={label}
        name={name}
        onFocus={onFocus}
        onBlur={onBlur}
        options={options}
      />
    );

    const input = screen.getByLabelText(label);

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("renders <button> if onClick is provided", async () => {
    const name = "test-input-change";
    const label = "Testing onClick";
    const onClick = jest.fn();

    const { user } = setup(
      <InputSelect label={label} name={name} onClick={onClick} />
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("controlled", () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();
    const initialValue = "option3";
    const modifiedValue = "option1";
    const options = [
      {
        text: "Option 1",
        value: "option1",
      },
      {
        text: "Option 2",
        value: "option2",
      },
      {
        text: "Option 3",
        value: "option3",
      },
    ];

    setup(
      <InputSelect
        label={label}
        name={name}
        onChange={handleChange}
        options={options}
        value={initialValue}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value: modifiedValue } });

    expect((input as HTMLInputElement).value).toBe(initialValue);
  });

  test("controlled with optgroups", () => {
    const name = "test-input-change";
    const label = "Testing onChange";
    const handleChange = jest.fn();
    const initialValue = "1-4";
    const modifiedValue = "2-1";
    const optgroups = [
      {
        label: "Group 1",
        options: [
          {
            text: "1-1 option",
            value: "1-1",
          },
          {
            text: "1-2 option",
            value: "1-2",
          },
          {
            text: "1-3 option",
            value: "1-3",
          },
          {
            text: "1-4 option",
            value: "1-4",
          },
          {
            text: "1-5 option",
            value: "1-5",
          },
        ],
      },
      {
        label: "Group 2",
        options: [
          {
            text: "2-1 option",
            value: "2-1",
          },
          {
            text: "2-2 option",
            value: "2-2",
          },
          {
            text: "2-3 option",
            value: "2-3",
          },
          {
            text: "2-4 option",
            value: "2-4",
          },
          {
            text: "2-5 option",
            value: "2-5",
          },
        ],
      },
    ];

    setup(
      <InputSelect
        label={label}
        name={name}
        onChange={handleChange}
        optgroups={optgroups}
        value={initialValue}
      />
    );

    const input = screen.getByLabelText(label);
    fireEvent.change(input, { target: { value: modifiedValue } });

    expect((input as HTMLInputElement).value).toBe(initialValue);
  });
});
