import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import DateRange from "components/DateRange";

const fixtures = {
  fromTitle: "From",
  toTitle: "To",
  className: "test-className",
  id: "test-id",
};

/**
 * Rendering of the items is tested in DateItem component
 */
describe("DateRange", () => {
  test("renders DateRange", () => {
    setup(
      <DateRange
        from={{ title: fixtures.fromTitle }}
        to={{ title: fixtures.toTitle }}
      />
    );

    const elFromTitle = screen.getByText(fixtures.fromTitle);
    const elToTitle = screen.getByText(fixtures.toTitle);

    expect(elFromTitle).toBeInTheDocument();
    expect(elToTitle).toBeInTheDocument();
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <DateRange
        from={{ title: fixtures.fromTitle }}
        to={{ title: fixtures.toTitle }}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
