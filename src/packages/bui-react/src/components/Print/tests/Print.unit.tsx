import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Print from "components/Print";

const fixtures = {
  text: "Content",
};

describe("Print", () => {
  test("renders Print", () => {
    setup(<Print>{fixtures.text}</Print>);

    const component = screen.getByText(fixtures.text);

    expect(component).toBeInTheDocument();
  });
});
