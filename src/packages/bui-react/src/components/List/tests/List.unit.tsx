import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import List from "components/List";
import Text from "components/Text";

const fixtures = {
  item1: "Item one",
  item2: "Item two",
  className: "test-classname",
  id: "test-id",
};

describe("List", () => {
  test("should render list with items", () => {
    setup(
      <List>
        <Text>{fixtures.item1}</Text>
        <Text>{fixtures.item2}</Text>
      </List>
    );

    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");
    const item1 = screen.getByText(fixtures.item1);
    const item2 = screen.getByText(fixtures.item2);

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <List className={fixtures.className} attributes={{ id: fixtures.id }}>
        <Text>{fixtures.item1}</Text>
      </List>
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
