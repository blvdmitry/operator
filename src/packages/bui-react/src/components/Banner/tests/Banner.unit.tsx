import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Banner from "components/Banner";

const fixtures = {
  className: "test-classname",
  id: "test-id",
  href: "#",
  children: "Banner content",
  title: "Booking.com in your pocket!",
  text: "No need to print your booking confirmations for your 2 upcoming trips - see them in the app!",
  topImage: {
    src: "https://picsum.photos/360",
    alt: "Top photo description",
  },
  startImage: {
    src: "https://picsum.photos/360",
    alt: "Start photo description",
  },
  action: "Download the app",
  closeAriaLabel: "Close banner",
  customTitleId: "test-title-id",
};

describe("Banner", () => {
  test("render basic configuration", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
      >
        {fixtures.children}
      </Banner>
    );

    const title = screen.getByRole("heading");
    const text = screen.getByText(fixtures.text);
    const content = screen.getByText(fixtures.children);

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(fixtures.title);
    expect(text).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  test("close button", async () => {
    const onCloseTrigger = jest.fn();

    const { user } = setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        onClose={onCloseTrigger}
      />
    );

    const closeButton = screen.getByRole("button");

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("aria-label", fixtures.closeAriaLabel);

    await user.click(closeButton);

    expect(onCloseTrigger).toHaveBeenCalledTimes(1);
  });

  test("not dismissible", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        dismissible={false}
      />
    );

    const closeButton = screen.queryByRole("button");

    expect(closeButton).not.toBeInTheDocument();
  });

  test("hide banner", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        shown={false}
        attributes={{ "data-testid": fixtures.id }}
      />
    );

    const banner = screen.queryByTestId(fixtures.id);

    expect(banner).not.toBeInTheDocument();
  });

  test("with an action link", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        actions={[
          {
            text: fixtures.action,
            href: fixtures.href,
          },
        ]}
      />
    );

    const action = document.querySelector("[href]");

    expect(action).toBeInTheDocument();
    expect(action).toHaveAttribute("href", fixtures.href);
    expect(action).toHaveTextContent(fixtures.action);
  });

  test("with an action button", async () => {
    const onClickTrigger = jest.fn();

    const { user } = setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        dismissible={false}
        actions={[
          {
            text: fixtures.action,
            onClick: onClickTrigger,
          },
        ]}
      />
    );

    const action = screen.getByRole("button");

    expect(action).toBeInTheDocument();

    await user.click(action);

    expect(onClickTrigger).toHaveBeenCalledTimes(1);
  });

  test("top image", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        topImage={fixtures.topImage}
      />
    );

    const image = screen.getByAltText(fixtures.topImage.alt);

    expect(image).toBeInTheDocument();
  });

  test("start image", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        startImage={fixtures.startImage}
      />
    );

    const image = screen.getByAltText(fixtures.startImage.alt);

    expect(image).toBeInTheDocument();
  });

  test("top and start image", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        topImage={fixtures.topImage}
        startImage={fixtures.startImage}
      />
    );

    const topImage = screen.getByAltText(fixtures.topImage.alt);
    const startImage = screen.queryByAltText(fixtures.startImage.alt);

    expect(topImage).toBeInTheDocument();
    expect(startImage).not.toBeInTheDocument();
  });

  test("className and attributes props", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        className={fixtures.className}
        attributes={{ "data-testid": fixtures.id }}
      />
    );

    const banner = screen.getByTestId(fixtures.id);
    expect(banner).toHaveClass(fixtures.className);
    expect(banner).toHaveAttribute("data-testid", fixtures.id);
  });

  test("custom content with aria-labelledby attribute", () => {
    setup(
      <Banner
        closeAriaLabel={fixtures.closeAriaLabel}
        className={fixtures.className}
        attributes={{
          "data-testid": fixtures.id,
          "aria-labelledby": fixtures.customTitleId,
        }}
      >
        <h2 id={fixtures.customTitleId}>Custom title in the content</h2>
        <p>Other text content</p>
      </Banner>
    );

    const banner = screen.getByTestId(fixtures.id);
    expect(banner).toHaveAttribute("aria-labelledby", fixtures.customTitleId);
  });

  test("default titleTagName", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        closeAriaLabel={fixtures.closeAriaLabel}
        className={fixtures.className}
        attributes={{ "data-testid": fixtures.id }}
      />
    );

    const titleDefault = screen.getByRole("heading");

    expect(titleDefault.tagName).toBe("H3");
  });

  test("custom titleTagName", () => {
    setup(
      <Banner
        title={fixtures.title}
        text={fixtures.text}
        titleTagName="h5"
        closeAriaLabel={fixtures.closeAriaLabel}
        className={fixtures.className}
        attributes={{ "data-testid": fixtures.id }}
      />
    );

    const titleCustom = screen.getByRole("heading");

    expect(titleCustom.tagName).toBe("H5");
  });
});
