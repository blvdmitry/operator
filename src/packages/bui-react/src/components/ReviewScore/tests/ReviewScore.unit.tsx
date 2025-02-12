import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import ReviewScore from "components/ReviewScore";

const fixtures = {
  score: "9.0",
  scoreAriaLabel: "Scored 9.0",
  rating: "Fabulous",
  reviewCount: "1,234 reviews",
  ratingReviewAriaLabel: "Rated fabulous from 1,234 reviews",
  testId: "test-id",
};

describe("ReviewScore", () => {
  test("renders ReviewScore", () => {
    setup(
      <ReviewScore
        {...fixtures}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const reviewScore = screen.getByTestId(fixtures.testId);
    const scoreAriaLabel = screen.getByText(fixtures.scoreAriaLabel);
    const ratingReviewAriaLabel = screen.getByText(
      fixtures.ratingReviewAriaLabel
    );

    expect(reviewScore).toBeInTheDocument();
    expect(scoreAriaLabel).toBeInTheDocument();
    expect(ratingReviewAriaLabel).toBeInTheDocument();
  });
});
