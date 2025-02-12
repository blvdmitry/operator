import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import BubbleContainer from "components/BubbleContainer";

describe("BubbleContainer", () => {
  test("renders BubbleContainer", () => {
    const testId = "bui-bubble-container-1";
    const bubbleText = "18";
    const ariaLabel = "bubble-container-aria-label";
    const bubbleContainerClassName = "bubble-container-classname";

    setup(
      <BubbleContainer
        value={bubbleText}
        className={bubbleContainerClassName}
        ariaLabel={ariaLabel}
        attributes={{ "data-testid": testId }}
      >
        <div style={{ width: "24px", height: "24px" }} />
      </BubbleContainer>
    );

    const bubbleContainer = screen.getByTestId(testId);
    expect(bubbleContainer).toBeInTheDocument();
    expect(bubbleContainer).toHaveClass(bubbleContainerClassName);

    const bubble = screen.getByLabelText(ariaLabel);
    expect(bubble).toBeInTheDocument();
    expect(bubble).toHaveTextContent(bubbleText);
  });
});
