import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Actionable from "components/Actionable";

const fixtures = {
  children: "Content",
  href: "#",
};

describe("Actionable", () => {
  test("renders children", () => {
    setup(<Actionable>{fixtures.children}</Actionable>);
    expect(screen.getByText(fixtures.children)).toBeInTheDocument();
  });

  test("works as a link", async () => {
    const noop = jest.fn();
    const { user } = setup(
      <Actionable href={fixtures.href} onClick={noop}>
        {fixtures.children}
      </Actionable>
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(fixtures.href);

    await user.click(link);
    expect(noop).toBeCalledTimes(1);
  });

  test("works as a button", async () => {
    const noop = jest.fn();
    const { user } = setup(
      <Actionable onClick={noop}>{fixtures.children}</Actionable>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(noop).toBeCalledTimes(1);
    await user.keyboard("[Enter>]");
    expect(noop).toBeCalledTimes(2);
    await user.keyboard("[Space]");
    expect(noop).toBeCalledTimes(3);
  });

  test("applies correct button type", async () => {
    const handleClick = jest.fn();
    const handleSubmit = jest.fn();

    const { user } = setup(
      <form onSubmit={handleSubmit}>
        <Actionable onClick={handleClick}>{fixtures.children}</Actionable>
      </form>
    );

    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleSubmit).not.toBeCalled();
  });

  test("disables the button", async () => {
    const noop = jest.fn();
    const { user } = setup(
      <Actionable onClick={noop} disabled>
        {fixtures.children}
      </Actionable>
    );

    const button = screen.getByRole("button");

    await user.click(button);
    expect(noop).not.toBeCalled();
  });

  test("renders attributes", () => {
    setup(
      <Actionable type="button" attributes={{ "aria-label": "hey" }}>
        {fixtures.children}
      </Actionable>
    );

    const button = screen.getByRole("button");
    expect(button.getAttribute("aria-label")).toBeDefined();
  });

  test("works inside the form", async () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    const handleClick = jest.fn();

    const { user } = setup(
      <form onSubmit={handleSubmit}>
        <Actionable type="submit" onClick={handleClick}>
          {fixtures.children}
        </Actionable>
      </form>
    );

    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleSubmit).toBeCalledTimes(1);
  });

  test("supports onClick and attributes.onClick simultaneously", async () => {
    const handleClick = jest.fn();
    const handleClickAttribute = jest.fn();

    const { user } = setup(
      <Actionable
        onClick={handleClick}
        attributes={{ onClick: handleClickAttribute }}
      >
        {fixtures.children}
      </Actionable>
    );

    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClickAttribute).toBeCalledTimes(1);
  });
});
