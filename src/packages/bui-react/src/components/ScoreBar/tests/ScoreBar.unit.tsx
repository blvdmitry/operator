import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import ScoreBar from "components/ScoreBar";

describe("ScoreBar", () => {
  const fixtures = {
    className: "test-className",
    testId: "test-bui-breadcrumbs",
    labelStart: "Start Label",
    labelEnd: "End Label",
    ariaLabel: "test-bui-score-bar-aria-label",
    value: 0.45,
  };

  test("renders ScoreBar with both labels", () => {
    setup(
      <ScoreBar
        value={fixtures.value}
        labelStart={fixtures.labelStart}
        labelEnd={fixtures.labelEnd}
        className={fixtures.className}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const scoreBar = screen.getByTestId(fixtures.testId);
    const labelStart = screen.getByText(fixtures.labelStart);
    const labelEnd = screen.getByText(fixtures.labelEnd);

    expect(scoreBar).toHaveClass(fixtures.className);
    expect(labelStart).toBeInTheDocument();
    expect(labelEnd).toBeInTheDocument();
  });

  test("renders ScoreBar with no labels", () => {
    setup(
      <ScoreBar
        value={fixtures.value}
        className={fixtures.className}
        ariaLabel={fixtures.ariaLabel}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const scoreBarRoot = screen.getByTestId(fixtures.testId);
    const scoreBar = screen.getByRole("meter");
    const labelStart = screen.queryByText(fixtures.labelStart);
    const labelEnd = screen.queryByText(fixtures.labelEnd);

    expect(scoreBarRoot).toHaveClass(fixtures.className);
    expect(scoreBar).toHaveAttribute("aria-label", fixtures.ariaLabel);
    expect(labelStart).not.toBeInTheDocument();
    expect(labelEnd).not.toBeInTheDocument();
  });
});
