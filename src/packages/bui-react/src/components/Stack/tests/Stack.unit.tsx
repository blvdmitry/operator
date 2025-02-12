import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Stack from "components/Stack";

describe("Stack", () => {
  it("Should render", () => {
    const testId = "test-bui-Stack-1";
    setup(<Stack attributes={{ "data-testid": testId }} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("Should render as the correct tag", () => {
    const { output } = setup(<Stack tagName="section" />);

    expect(output.container.querySelector("section")).toBeInTheDocument();
  });

  it("Should apply a nowrap class if <Stack.Item grow /> exists", () => {
    const testId = "test-bui-Stack-2";

    setup(
      <Stack direction="row" attributes={{ "data-testid": testId }}>
        <div>Lorem ipsum</div>
        <Stack.Item grow>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Stack.Item>
      </Stack>
    );

    expect(screen.getByTestId(testId)).toHaveClass("root--nowrap");
  });

  it("Should NOT apply a nowrap class if <Stack.Item grow /> does not exist", () => {
    const testId = "test-bui-Stack-2";

    setup(
      <Stack direction="row" attributes={{ "data-testid": testId }}>
        <div>Lorem ipsum</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </Stack>
    );

    expect(screen.getByTestId(testId)).not.toHaveClass("root--nowrap");
  });
});

describe("Stack.Item", () => {
  it("Should render", () => {
    const testId = "test-bui-StackItem-1";
    setup(<Stack.Item attributes={{ "data-testid": testId }} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
