import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import AspectRatio from "components/AspectRatio";

describe("AspectRatio", () => {
  it("renders component", () => {
    setup(
      <AspectRatio attributes={{ "data-testid": "test" }}>Content</AspectRatio>
    );

    const text = screen.queryByText("Content");
    const el = screen.queryByTestId("test");

    expect(text).toBeInTheDocument();
    expect(el).toBeInTheDocument();
  });
});
