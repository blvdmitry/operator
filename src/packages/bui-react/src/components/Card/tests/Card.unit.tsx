import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Card from "components/Card";

describe("Card", () => {
  const testId = "test-bui-card";
  const children = "Content";

  test("renders the default Card", () => {
    setup(<Card attributes={{ "data-testid": testId }}>{children}</Card>);

    const card = screen.getByTestId(testId);
    const content = screen.getByText(children);

    expect(card).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
