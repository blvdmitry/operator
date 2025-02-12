import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import NavigationProgress from "components/NavigationProgress";

const fixtures = {
  className: "test-className",
  id: "test-id",
  title1: "Title 1",
  title2: "Title 2",
  title3: "Title 3",
  content1: "Content 1",
  content2: "Content 2",
  content3: "Content 3",
};

describe("Navigation progress", () => {
  it("renders vertical", () => {
    setup(
      <NavigationProgress
        variant="vertical"
        items={[
          {
            title: fixtures.title1,
            content: fixtures.content1,
          },
          {
            title: fixtures.title2,
            content: fixtures.content2,
            status: "current",
          },
          {
            title: fixtures.title3,
            content: fixtures.content3,
            status: "next",
          },
        ]}
      />
    );

    const titleEl1 = screen.getByText(fixtures.title1);
    const titleEl2 = screen.getByText(fixtures.title2);
    const titleEl3 = screen.getByText(fixtures.title3);
    const contentEl1 = screen.queryByText(fixtures.content1);
    const contentEl2 = screen.queryByText(fixtures.content2);
    const contentEl3 = screen.queryByText(fixtures.content3);

    expect(titleEl1).toBeInTheDocument();
    expect(titleEl2).toBeInTheDocument();
    expect(titleEl3).toBeInTheDocument();
    expect(contentEl1).not.toBeInTheDocument();
    expect(contentEl2).toBeInTheDocument();
    expect(contentEl3).not.toBeInTheDocument();
  });

  it("ignores content when horizontal", () => {
    const renderMobileProgress = (current: number, total: number) => (
      <span data-testid="label">
        Step ${current} of ${total}
      </span>
    );

    setup(
      <NavigationProgress
        items={[
          {
            title: fixtures.title1,
            content: fixtures.content1,
          },
          {
            title: fixtures.title2,
            content: fixtures.content2,
            status: "current",
          },
          {
            title: fixtures.title3,
            content: fixtures.content3,
            status: "next",
          },
        ]}
        renderMobileProgress={renderMobileProgress}
      />
    );

    const titleEl1 = screen.getByText(fixtures.title1);
    const titleEls2 = screen.getAllByText(fixtures.title2);
    const titleEl3 = screen.getByText(fixtures.title3);
    const contentEl1 = screen.queryByText(fixtures.content1);
    const contentEl2 = screen.queryByText(fixtures.content2);
    const contentEl3 = screen.queryByText(fixtures.content3);
    const ariaLabelEl = screen.getByTestId("label");

    expect(titleEl1).toBeInTheDocument();
    expect(titleEls2[0]).toBeInTheDocument();
    expect(titleEls2[1]).toBeInTheDocument();
    expect(titleEl3).toBeInTheDocument();
    expect(contentEl1).not.toBeInTheDocument();
    expect(contentEl2).not.toBeInTheDocument();
    expect(contentEl3).not.toBeInTheDocument();
    expect(ariaLabelEl).toBeInTheDocument();
  });

  it("works without currrent step", () => {
    const renderMobileProgress = (current: number, total: number) => (
      <span data-testid="label">
        Step ${current} of ${total}
      </span>
    );

    setup(
      <NavigationProgress
        items={[
          {
            title: fixtures.title1,
          },
          {
            title: fixtures.title2,
          },
          {
            title: fixtures.title3,
          },
        ]}
        renderMobileProgress={renderMobileProgress}
      />
    );

    const titleEls1 = screen.getAllByText(fixtures.title1);
    const titleEl2 = screen.getByText(fixtures.title2);
    const titleEl3 = screen.getByText(fixtures.title3);
    const ariaLabelEl = screen.getByTestId("label");

    expect(titleEls1[0]).toBeInTheDocument();
    expect(titleEls1[1]).toBeInTheDocument();
    expect(titleEl2).toBeInTheDocument();
    expect(titleEl3).toBeInTheDocument();
    expect(ariaLabelEl).toBeInTheDocument();
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <NavigationProgress
        variant="vertical"
        items={[
          {
            title: fixtures.title1,
            content: fixtures.content1,
          },
          {
            title: fixtures.title2,
            content: fixtures.content2,
            status: "current",
          },
          {
            title: fixtures.title3,
            content: fixtures.content3,
            status: "next",
          },
        ]}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    const liEl2 = output.container.querySelectorAll(
      `.${fixtures.className} *[aria-current]`
    )[1];

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
    expect(liEl2).toBeTruthy();
    expect(liEl2?.getAttribute("aria-current")).toEqual("step");
  });
});
