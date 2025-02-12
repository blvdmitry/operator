import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import DateItem from "components/DateItem";

const fixtures = {
  label: "Label",
  title: "Title",
  subtitle: "Subtitle",
  originalTitle: "Original title",
  dateTime: "22-07",
  className: "test-className",
  id: "test-id",
  href: "/",
};

describe("DateItem", () => {
  test("renders simplified DateItem", () => {
    setup(
      <DateItem
        title={fixtures.title}
        subtitle={fixtures.subtitle}
        label={fixtures.label}
        originalTitle={fixtures.originalTitle}
      />
    );

    const elTitle = screen.getByText(fixtures.title);
    const elSubtitle = screen.getByText(fixtures.subtitle);
    const elLabel = screen.queryByText(fixtures.label);
    const elOriginalTitle = screen.queryByText(fixtures.originalTitle);

    expect(elTitle).toBeInTheDocument();
    expect(elSubtitle).toBeInTheDocument();
    expect(elLabel).not.toBeInTheDocument();
    expect(elOriginalTitle).not.toBeInTheDocument();
  });

  test("renders detailed DateItem", () => {
    setup(
      <DateItem
        variant="detailed"
        title={fixtures.title}
        subtitle={fixtures.subtitle}
        label={fixtures.label}
        originalTitle={fixtures.originalTitle}
      />
    );

    const elTitle = screen.getByText(fixtures.title);
    const elSubtitle = screen.getByText(fixtures.subtitle);
    const elLabel = screen.queryByText(fixtures.label);
    const elOriginalTitle = screen.queryByText(fixtures.originalTitle);

    expect(elTitle).toBeInTheDocument();
    expect(elSubtitle).toBeInTheDocument();
    expect(elLabel).toBeInTheDocument();
    expect(elOriginalTitle).toBeInTheDocument();
  });

  it("applied onClick", async () => {
    const handleClick = jest.fn();

    const { user } = setup(
      <DateItem title={fixtures.title} onClick={handleClick} />
    );

    const elButton = screen.getByRole("button");

    await user.click(elButton);

    expect(handleClick).toBeCalledTimes(1);
  });

  it("applied href", () => {
    setup(<DateItem title={fixtures.title} href={fixtures.href} />);

    const elLink = screen.getByRole("link");

    expect(elLink).toHaveAttribute("href", fixtures.href);
  });

  it("applies className, datetime and attributes", () => {
    const { output } = setup(
      <DateItem
        title={fixtures.title}
        className={fixtures.className}
        datetime={fixtures.dateTime}
        attributes={{ id: fixtures.id }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute(
      "datetime",
      fixtures.dateTime
    );
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
