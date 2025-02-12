import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Divider from "components/Divider";

describe("Divider", () => {
  it("Should render", () => {
    const testId = "test-bui-divider-1";

    setup(<Divider attributes={{ "data-testid": testId }} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
