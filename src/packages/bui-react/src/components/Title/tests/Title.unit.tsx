import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Title from "components/Title";

const fixtures = {
  title: "Title",
  subtitle: "Subtitle",
  className: "test-className",
  titleClassName: "test-title-className",
  subtitleClassName: "test-subtitle-className",
  tagName: "span" as const,
  titleTagName: "h1",
  subtitleTagName: "h2",
  id: "test-id",
  titleId: "test-title-id",
  subtitleId: "test-subtitle-id",
};

describe("Title", () => {
  test("renders Title", () => {
    setup(<Title title={fixtures.title} subtitle={fixtures.subtitle} />);

    const titleEl = screen.getByText(fixtures.title);
    const subtitleEl = screen.getByText(fixtures.subtitle);

    expect(titleEl).toBeInTheDocument();
    expect(subtitleEl).toBeInTheDocument();
  });

  it("applies classNames and attributes", () => {
    const { output } = setup(
      <Title
        title={fixtures.title}
        subtitle={fixtures.subtitle}
        tagName={fixtures.tagName}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
        titleTagName={fixtures.titleTagName}
        titleClassName={fixtures.titleClassName}
        titleAttributes={{ id: fixtures.titleId }}
        subtitleTagName={fixtures.subtitleTagName}
        subtitleClassName={fixtures.subtitleClassName}
        subtitleAttributes={{ id: fixtures.subtitleId }}
      />
    );

    const rootEl = output.container.firstChild! as HTMLElement;
    const titleEl = screen.getByText(fixtures.title);
    const subtitleEl = screen.getByText(fixtures.subtitle);

    expect(rootEl).toHaveClass(fixtures.className);
    expect(rootEl).toHaveAttribute("id", fixtures.id);
    expect(rootEl.tagName).toBe(fixtures.tagName.toUpperCase());

    expect(titleEl).toHaveClass(fixtures.titleClassName);
    expect(titleEl).toHaveAttribute("id", fixtures.titleId);
    expect(titleEl.tagName).toBe(fixtures.titleTagName.toUpperCase());

    expect(subtitleEl).toHaveClass(fixtures.subtitleClassName);
    expect(subtitleEl).toHaveAttribute("id", fixtures.subtitleId);
    expect(subtitleEl.tagName).toBe(fixtures.subtitleTagName.toUpperCase());
  });
});
