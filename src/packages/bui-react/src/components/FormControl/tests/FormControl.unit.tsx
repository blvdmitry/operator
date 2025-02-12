import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import FormControl from "components/FormControl";

const fixtures = {
  testId: "form-control-test",
  helper: "Helper text",
  label: "Label text",
  error: "Error text",
  success: "Success text",
};

describe("FormControl", () => {
  test("renders FormControl", () => {
    setup(
      <FormControl attributes={{ "data-testid": fixtures.testId }}>
        {(attrs) => <input {...attrs} />}
      </FormControl>
    );

    const component = screen.getByTestId(fixtures.testId);

    expect(component).toBeInTheDocument();
  });

  test("renders FormControl with label and helper", () => {
    setup(
      <FormControl
        helper={fixtures.helper}
        label={fixtures.label}
        attributes={{ "data-testid": fixtures.testId }}
      >
        {(attrs) => <input {...attrs} />}
      </FormControl>
    );

    const helper = screen.getByText(fixtures.helper);
    const label = screen.getByText(fixtures.label);

    expect(helper).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test("renders FormControl with error", () => {
    setup(
      <FormControl
        error={fixtures.error}
        label={fixtures.label}
        attributes={{ "data-testid": fixtures.testId }}
      >
        {(attrs) => <input {...attrs} />}
      </FormControl>
    );

    const label = screen.getByText(fixtures.label);
    const error = screen.getByText(fixtures.error);

    expect(label).toBeInTheDocument();
    expect(error).toBeInTheDocument();
  });

  test("renders FormControl with success", () => {
    setup(
      <FormControl
        success={fixtures.success}
        label={fixtures.label}
        attributes={{ "data-testid": fixtures.testId }}
      >
        {(attrs) => <input {...attrs} />}
      </FormControl>
    );

    const label = screen.getByText(fixtures.label);
    const success = screen.getByText(fixtures.success);

    expect(label).toBeInTheDocument();
    expect(success).toBeInTheDocument();
  });
});
