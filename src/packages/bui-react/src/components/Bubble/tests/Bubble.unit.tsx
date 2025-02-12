import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Bubble from "components/Bubble";

describe("Bubble", () => {
  test("renders empty Bubble", () => {
    const testId = "test-bui-bubble-1";
    const ariaLabel = "test-bubble-aria-label";

    setup(
      <Bubble attributes={{ "data-testid": testId }} ariaLabel={ariaLabel} />
    );

    const bubble = screen.getByTestId(testId);
    expect(bubble).toBeInTheDocument();
    expect(bubble.getAttribute("aria-label")).toBe(ariaLabel);
  });
  test("renders Bubble with value as string", () => {
    const testId = "test-bui-bubble-2";
    const ariaLabel = "test-bubble-aria-label";
    const value = "111";

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
        maxValue={99}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${value}`);
  });
  test("renders bubble with value < default maxValue", () => {
    const testId = "test-bui-bubble-3";
    const ariaLabel = "test-bubble-aria-label";
    const value = 98;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${value}`);
  });
  test("renders bubble with value = default maxValue", () => {
    const testId = "test-bui-bubble-3";
    const ariaLabel = "test-bubble-aria-label";
    const value = 99;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${value}`);
  });
  test("renders bubble with value > default maxValue", () => {
    const testId = "test-bui-bubble-4";
    const ariaLabel = "test-bubble-aria-label";
    const maxValue = 99;
    const value = maxValue + 1;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${maxValue}+`);
  });
  test("renders bubble with value < custom maxValue", () => {
    const testId = "test-bui-bubble-5";
    const ariaLabel = "test-bubble-aria-label";
    const maxValue = 10;
    const value = maxValue - 1;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
        maxValue={maxValue}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${value}`);
  });
  test("renders bubble with value = custom maxValue", () => {
    const testId = "test-bui-bubble-6";
    const ariaLabel = "test-bubble-aria-label";
    const maxValue = 9;
    const value = maxValue;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
        maxValue={maxValue}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${value}`);
  });
  test("renders bubble with value > custom maxValue", () => {
    const testId = "test-bui-bubble-7";
    const ariaLabel = "test-bubble-aria-label";
    const maxValue = 9;
    const value = maxValue + 1;

    setup(
      <Bubble
        attributes={{ "data-testid": testId }}
        ariaLabel={ariaLabel}
        text={value}
        maxValue={maxValue}
      />
    );

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(`${maxValue}+`);
  });
});
