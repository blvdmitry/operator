import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import CollapsedText from "components/CollapsedText";

const testId = "test-bui-collapsed-text";
const fixtures = {
  text: "We are open for feature requests and anyone can create one by adding an issue to this repository board. If your feature or idea needs discussion - you can reach out to us in #bui-react Slack channel. If you want to contribute to the project - feel free to pick any issue and create a merge request once you're done with it. However, in most cases, it's also good to contact someone from core contributors, to discuss the issue. That is likely to make your work on the issue easier.",
  readMoreLabel: "Read more",
  readLessLabel: "Read less",
  attributes: { "data-testid": testId },
};

describe("CollapsedText", () => {
  test("renders the default CollapsedText", () => {
    setup(<CollapsedText {...fixtures} />);

    const collapsedText = screen.getByTestId(testId);
    const content = screen.getByText(fixtures.text);

    expect(collapsedText).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
