import React from "react";
import { screen, within } from "@testing-library/react";
import { setup } from "tools/jest";
import AvatarBlock from "components/AvatarBlock";

const fixtures = {
  src: "/img.png",
  title: "Title",
  subtitle: "Subtitle",
  className: "test-className",
  id: "test-id",
  avatarTestId: "avatar-test-id",
};

describe("AvatarBlock", () => {
  test("renders AvatarBlock", () => {
    setup(
      <AvatarBlock
        title={fixtures.title}
        subtitle={fixtures.subtitle}
        avatar={{
          src: fixtures.src,
          attributes: { "data-testid": fixtures.avatarTestId },
        }}
      />
    );

    const elTitle = screen.getByText(fixtures.title);
    const elSubtitle = screen.getByText(fixtures.subtitle);
    const elAvatar = screen.getByTestId(fixtures.avatarTestId);
    const elImg = within(elAvatar).getByRole("presentation");

    expect(elTitle).toBeInTheDocument();
    expect(elSubtitle).toBeInTheDocument();
    expect(elImg).toHaveAttribute("src", fixtures.src);
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <AvatarBlock
        title={fixtures.title}
        subtitle={fixtures.subtitle}
        avatar={{ src: fixtures.src }}
        className={fixtures.className}
        attributes={{ id: fixtures.id }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
