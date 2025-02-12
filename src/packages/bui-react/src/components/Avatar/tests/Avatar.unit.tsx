import React from "react";
import { PersonHalfIcon } from "@bookingcom/bui-assets-react/streamline";
import { fireEvent, screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Avatar from "components/Avatar";

const fixtures = {
  text: "DS",
  src: "/image.jpg",
  ariaLabel: "Avatar description",
  className: "test-className",
  attribute: "test-attribute",
};

describe("Avatar", () => {
  it("renders Avatar with an image", () => {
    setup(
      <Avatar
        text={fixtures.text}
        src={fixtures.src}
        ariaLabel={fixtures.ariaLabel}
      />
    );

    const img = screen.getByRole("img");
    const text = screen.queryByText(fixtures.text);

    expect(img).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
  });

  it("renders Avatar with an asset", () => {
    setup(
      <Avatar
        text={fixtures.text}
        countryCode="nl"
        ariaLabel={fixtures.ariaLabel}
      />
    );

    const img = screen.getByRole("img");
    const text = screen.queryByText(fixtures.text);

    expect(img).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
  });

  it("renders Avatar with text", () => {
    setup(<Avatar text={fixtures.text} />);

    const img = screen.queryByRole("img");
    const text = screen.queryByText(fixtures.text);

    expect(img).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders Avatar with an icon", () => {
    const { output } = setup(
      <Avatar text={fixtures.text} icon={PersonHalfIcon} />
    );

    const svg = output.container.querySelector("svg");
    const text = screen.queryByText(fixtures.text);

    expect(svg).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
  });

  it("render Avatar with text in case passed image url is wrong", () => {
    setup(
      <Avatar
        text={fixtures.text}
        src={fixtures.src}
        ariaLabel={fixtures.ariaLabel}
      />
    );

    const elImg = screen.getByRole("img");

    fireEvent.error(elImg);
    const text = screen.queryByText(fixtures.text);

    expect(text).toBeInTheDocument();
  });

  it("render Avatar with icon in case passed image url is wrong", () => {
    const { output } = setup(
      <Avatar
        icon={PersonHalfIcon}
        src={fixtures.src}
        ariaLabel={fixtures.ariaLabel}
      />
    );

    const elImg = screen.getByRole("img");

    fireEvent.error(elImg);
    const svg = output.container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });

  it("applies ariaLabel", () => {
    setup(<Avatar text={fixtures.text} ariaLabel={fixtures.ariaLabel} />);

    expect(screen.getByLabelText(fixtures.ariaLabel)).toBeInTheDocument();
  });

  it("applies className and attributes", () => {
    const { output } = setup(
      <Avatar
        text={fixtures.text}
        className={fixtures.className}
        attributes={{ "data-test": fixtures.attribute }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute(
      "data-test",
      fixtures.attribute
    );
  });
});
