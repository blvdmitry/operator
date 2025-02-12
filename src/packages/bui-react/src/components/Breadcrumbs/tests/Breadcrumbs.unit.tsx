import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Breadcrumbs from "components/Breadcrumbs";

describe("Breadcrumbs", () => {
  const fixtures = {
    className: "test-className",
    testId: "test-bui-breadcrumbs",
    items: [
      {
        text: "Item #1",
        href: "#",
      },
      {
        text: "Item #2",
        href: "#",
      },
    ],
    ariaLabel: "test-bui-breadcrumbs-aria-label",
  };

  test("renders Breadcrumbs with items", () => {
    setup(
      <Breadcrumbs
        items={fixtures.items}
        attributes={{ "data-testid": fixtures.testId }}
        className={fixtures.className}
      />
    );

    const breadcrumbs = screen.getByTestId(fixtures.testId);
    const text = screen.queryByText(fixtures.items[0].text);
    const list = screen.queryByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(breadcrumbs).toHaveClass(fixtures.className);
    expect(breadcrumbs).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems.length).toEqual(fixtures.items.length);
    expect(text).toBeInTheDocument();
  });

  test("renders Breadcrumbs with ariaLabel", () => {
    setup(
      <Breadcrumbs
        items={[
          {
            text: "Item #1",
            href: "#",
          },
        ]}
        attributes={{ "data-testid": fixtures.testId }}
        ariaLabel={fixtures.ariaLabel}
      />
    );

    const breadcrumbs = screen.getByTestId(fixtures.testId);
    expect(breadcrumbs).toBeInTheDocument();
    expect(breadcrumbs.getAttribute("aria-label")).toEqual(fixtures.ariaLabel);
  });

  test("renders Breadcrumbs with back prop", () => {
    setup(
      <Breadcrumbs
        back
        items={fixtures.items}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const breadcrumbs = screen.getByTestId(fixtures.testId);
    const text1 = screen.queryByText(fixtures.items[0].text);
    const text2 = screen.queryByText(fixtures.items[1].text);
    const list = screen.queryByRole("list");
    const link = screen.queryByRole("link");

    expect(breadcrumbs).toBeInTheDocument();
    expect(list).not.toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(text1).toBeInTheDocument();
    expect(text2).not.toBeInTheDocument();
  });
});
