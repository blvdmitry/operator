import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Container from "components/Container";

const fixtures = {
  testId: "container-test",
  className: "content",
};

describe("Container", () => {
  test("renders Container", () => {
    setup(<Container>Content</Container>);

    const container = screen.getByText("Content");
    expect(container).toBeInTheDocument();
  });

  test("has className", () => {
    setup(
      <Container
        className={fixtures.className}
        attributes={{
          "data-testid": fixtures.testId,
        }}
      >
        Content
      </Container>
    );

    const container = screen.getByTestId(fixtures.testId);

    expect(container).toHaveClass(fixtures.className);
  });
});
