import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { setup } from "tools/jest";
import Image from "components/Image";

const fixtures = {
  src: "https://picsum.photos/200",
  fallbackSrc: "https://picsum.photos/300",
  alt: "Alt text",
  id: "root",
  imgId: "image",
  className: "test-classname",
  imgClassName: "test-img-classname",
  srcSet: "test-srcset",
};

describe("Image", () => {
  it("Should render", () => {
    setup(<Image src={fixtures.src} />);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByRole("presentation")).toHaveAttribute(
      "src",
      fixtures.src
    );
    expect(screen.getByRole("presentation")).toHaveAttribute("loading", "lazy");
  });

  it("Should have alt text", () => {
    setup(<Image src={fixtures.src} alt={fixtures.alt} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Alt text");
  });

  it("Should set to loading 'eager' when priority is set to true", () => {
    setup(<Image src={fixtures.src} priority />);
    expect(screen.getByRole("presentation")).toHaveAttribute(
      "loading",
      "eager"
    );
  });

  it("Should render fallback image by url", () => {
    setup(
      <Image
        src={fixtures.src}
        alt={fixtures.alt}
        fallback="image"
        fallbackImageSrc={fixtures.fallbackSrc}
      />
    );

    const elImg = screen.getByRole("img");

    fireEvent.error(elImg);
    expect(elImg).toHaveAttribute("src", fixtures.fallbackSrc);
  });

  it("applies className, attributes and imageAttributes", () => {
    const { output } = setup(
      <Image
        src={fixtures.src}
        className={fixtures.className}
        imgClassName={fixtures.imgClassName}
        attributes={{ id: fixtures.id }}
        imgAttributes={{ id: fixtures.imgId }}
      />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);

    const img = screen.getByRole("presentation");

    expect(img).toHaveClass(fixtures.imgClassName);
    expect(img).toHaveAttribute("id", fixtures.imgId);
  });

  it("applies custom srcset", () => {
    setup(
      <Image src={fixtures.src} imgAttributes={{ srcSet: fixtures.srcSet }} />
    );

    const img = screen.getByRole("presentation");

    expect(img).toHaveAttribute("srcset", fixtures.srcSet);
  });
});
