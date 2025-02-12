import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Button from "components/Button";

const fixtures = {
  id: "test-id",
  ariaLabel: "Button label",
  loadingAriaLabel: "Loading label",
  href: "https://booking.com",
  content: "Content",
  className: "test-className",
};

describe("Button", () => {
  test("renders content", async () => {
    const handleClick = jest.fn();

    const { user } = setup(
      <Button
        onClick={handleClick}
        attributes={{ "aria-label": fixtures.ariaLabel }}
      >
        {fixtures.content}
      </Button>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button.tagName).toBe("BUTTON");
    expect(screen.getByText(fixtures.content)).toBeInTheDocument();
    expect(screen.getByLabelText(fixtures.ariaLabel)).toBeInTheDocument();
  });

  test("renders as link", async () => {
    const handleClick = jest.fn();

    const { user } = setup(
      <Button onClick={handleClick} href={fixtures.href} />
    );

    const button = screen.getByRole("link");

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button.tagName).toBe("A");
    expect(button).toHaveAttribute("href", fixtures.href);
  });

  test("renders as button", () => {
    setup(<Button type="button" />);

    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
  });

  test("renders as span", () => {
    setup(<Button attributes={{ "data-testid": fixtures.id }} />);

    const button = screen.getByTestId(fixtures.id);
    expect(button.tagName).toBe("SPAN");
  });

  test("supports disabled state", async () => {
    const handleClick = jest.fn();
    const { user } = setup(<Button disabled onClick={handleClick} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("supports loading state", () => {
    const handleClick = jest.fn();

    setup(
      <Button
        loading
        loadingAriaLabel={fixtures.loadingAriaLabel}
        onClick={handleClick}
      />
    );

    const buttonSpinner = screen.getByLabelText(fixtures.loadingAriaLabel);

    expect(buttonSpinner).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("applies className and attributes", () => {
    const { output } = setup(
      <Button className={fixtures.className} attributes={{ id: fixtures.id }} />
    );

    expect(output.container.firstChild).toHaveClass(fixtures.className);
    expect(output.container.firstChild).toHaveAttribute("id", fixtures.id);
  });
});
