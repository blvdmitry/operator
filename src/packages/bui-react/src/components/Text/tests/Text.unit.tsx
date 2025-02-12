import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Text from "components/Text";

describe("Text", () => {
  test("renders children", () => {
    setup(<Text>Children</Text>);

    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  test("applies custom tag", () => {
    const { output } = setup(<Text tagName="h1">Children</Text>);

    expect(output.container.querySelector("h1")).toBeInTheDocument();
  });
});
