import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Scrim from "components/Scrim";

const className = "test-className-scrim";
const testId = "test-scrim";
const attributes = { "data-testid": testId };
const content = "scrim content";

describe("Scrim", () => {
  test("render", () => {
    setup(
      <Scrim attributes={attributes} className={className}>
        {content}
      </Scrim>
    );

    const scrim = screen.getByTestId(testId);
    expect(scrim).toBeInTheDocument();
    expect(scrim).toHaveClass(className);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
