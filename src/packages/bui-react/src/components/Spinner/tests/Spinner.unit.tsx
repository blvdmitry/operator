import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Spinner from "components/Spinner";

const fixtures = {
  label: "Loading",
  className: "test-className",
  id: "test-id",
};

describe("Spinner", () => {
  test("renders component", () => {
    setup(<Spinner ariaLabel={fixtures.label} />);

    const el = screen.getByLabelText(fixtures.label);
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-live");
  });

  test("renders with aria-label attribute", () => {
    setup(<Spinner attributes={{ "aria-label": fixtures.label }} />);

    const el = screen.getByLabelText(fixtures.label);
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("aria-live");
  });

  test("works with className and attributes", () => {
    const { output } = setup(
      <Spinner
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
