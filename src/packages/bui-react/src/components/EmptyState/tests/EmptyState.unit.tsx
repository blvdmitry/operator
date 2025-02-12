import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import EmptyState from "components/EmptyState";

const fixtures = {
  text: "Text",
  className: "test-className",
  id: "test-id",
};

describe("EmptyState", () => {
  test("supports className and attributes", () => {
    const { output } = setup(
      <EmptyState
        text={fixtures.text}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    const textEl = screen.getByText(fixtures.text);

    expect(textEl).toBeInTheDocument();
    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
