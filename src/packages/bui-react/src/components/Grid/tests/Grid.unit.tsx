import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Grid from "components/Grid";

describe("Grid", () => {
  it("Should render", () => {
    const testId = "test-bui-Grid-1";
    setup(<Grid attributes={{ "data-testid": testId }} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("Should render as the correct tag", () => {
    const { output } = setup(<Grid tagName="section" />);

    expect(output.container.querySelector("section")).toBeInTheDocument();
  });
});

describe("Grid.Column", () => {
  it("Should render", () => {
    const testId = "test-bui-StackItem-1";
    setup(<Grid.Column attributes={{ "data-testid": testId }} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
