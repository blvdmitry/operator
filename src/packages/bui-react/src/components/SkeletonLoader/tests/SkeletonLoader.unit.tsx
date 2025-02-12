import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import SkeletonLoader from "components/SkeletonLoader";

const fixtures = {
  className: "test-classname",
  id: "test-id",
};

describe("SkeletonLoader", () => {
  test("renders component", () => {
    setup(
      <SkeletonLoader
        variant="title"
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
        tagName="progress"
      />
    );

    const skeleton = screen.getByRole("progressbar");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass(fixtures.className);
    expect(skeleton).toHaveAttribute("id", fixtures.id);
  });
});
