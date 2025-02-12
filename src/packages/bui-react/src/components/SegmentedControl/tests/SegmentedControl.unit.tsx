import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import SegmentedControl from "components/SegmentedControl";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const name = "test-input-name";
const label = "Test Label";
const className = "test-className";
const attributes = { "data-testid": "test-root" };
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

describe("SegmentedControl", () => {
  test("render", () => {
    const handleChange = jest.fn();
    setup(
      <SegmentedControl
        label={label}
        name={name}
        options={options}
        attributes={attributes}
        onChange={handleChange}
        className={className}
      />
    );

    const root = screen.getByTestId(attributes["data-testid"]);
    const radios = screen.getAllByRole("radio");

    expect(root).toBeInTheDocument();
    expect(root).toHaveClass(className);
    expect(radios).toHaveLength(3);

    radios.forEach((radio, index) => {
      expect(radio).toBeInTheDocument();
      expect(radio).toBeEnabled();
      expect(radio).toHaveAttribute("name", name);
      expect(radio).toHaveAttribute("value", options[index].value);
    });
  });

  test("uncontrolled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <SegmentedControl
        label={label}
        name={name}
        options={options}
        attributes={attributes}
        onChange={handleChange}
        className={className}
        defaultValue={options[0].value}
      />
    );

    const radios = screen.getAllByRole("radio");
    const radioDefault = radios[0];
    const radioTarget = radios[1];

    expect(radioDefault).toBeChecked();

    await user.click(radios[1]);
    expect(radioDefault).not.toBeChecked();
    expect(radioTarget).toBeChecked();
    expect(handleChange).toBeCalledTimes(1);
  });

  test("controlled", async () => {
    const handleChange = jest.fn();
    const { user } = setup(
      <SegmentedControl
        label={label}
        name={name}
        options={options}
        attributes={attributes}
        onChange={handleChange}
        className={className}
        value={options[0].value}
      />
    );

    const radios = screen.getAllByRole("radio");
    const radioDefault = radios[0];
    const radioTarget = radios[1];

    expect(radioDefault).toBeChecked();

    await user.click(radios[1]);

    expect(radioDefault).toBeChecked();
    expect(radioTarget).not.toBeChecked();
    expect(handleChange).toBeCalledTimes(1);
  });
});
