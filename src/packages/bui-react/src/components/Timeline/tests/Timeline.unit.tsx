import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Timeline from "components/Timeline";

const fixtures = {
  itemTitle: "Item title",
  itemContent: "Item content",
  className: "test-className",
  id: "test-id",
};

describe("Timeline", () => {
  test("renders component", () => {
    setup(
      <Timeline>
        <Timeline.Item title={fixtures.itemTitle}>
          {fixtures.itemContent}
        </Timeline.Item>
        <Timeline.Item>{fixtures.itemContent}</Timeline.Item>
        <div>{fixtures.itemContent}</div>
      </Timeline>
    );

    const contentEls = screen.getAllByText(fixtures.itemContent);
    const titleEls = screen.getAllByText(fixtures.itemTitle);

    expect(contentEls).toHaveLength(3);
    expect(titleEls).toHaveLength(1);
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <Timeline className={fixtures.className} attributes={{ id: fixtures.id }}>
        <div>{fixtures.itemContent}</div>
      </Timeline>
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
