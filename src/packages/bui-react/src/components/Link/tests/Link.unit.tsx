import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Link from "components/Link";

describe("Link", () => {
  test("renders Link", async () => {
    const testId = "test-bui-link-span-tag";
    const ariaLabel = "test-link-aria-label";
    const handleClick = jest.fn();

    const { user } = setup(
      <Link
        onClick={handleClick}
        attributes={{ "aria-label": ariaLabel, "data-testid": testId }}
      />
    );

    const link = screen.getByTestId(testId);

    await user.click(link);

    expect(link).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(link.getAttribute("aria-label")).toBe(ariaLabel);
  });

  test("renders <a> tag", async () => {
    const handleClick = jest.fn();

    const { user } = setup(<Link onClick={handleClick} href="test.href" />);

    const link = screen.getByRole("link");

    await user.click(link);

    expect(link).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders <span> tag", () => {
    const testId = "test-bui-link-span-tag";

    setup(<Link attributes={{ "data-testid": testId }} />);

    const link = screen.getByTestId(testId);
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("SPAN");
  });

  test("disabled link", async () => {
    const testId = "test-bui-link-span-tag";
    const handleClick = jest.fn();

    const { user } = setup(
      <Link
        disabled
        onClick={handleClick}
        attributes={{ "data-testid": testId }}
      />
    );

    const link = screen.getByTestId(testId);

    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
