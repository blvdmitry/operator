import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Box from "components/Box";

describe("Box", () => {
  test("renders Box", () => {
    setup(<Box>Content</Box>);

    const box = screen.getByText("Content");
    expect(box).toBeInTheDocument();
  });
});
