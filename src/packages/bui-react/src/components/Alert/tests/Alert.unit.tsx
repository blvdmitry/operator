import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Alert from "components/Alert";

const fixtures = {
  className: "test-className",
  attribute: "test-attribute",
  children: "Alert content",
  href: "#",
  title: "Your booking is confirmed",
  text: "We've sent your confirmation email to booker@booking.com.",
  action: "Get Directions",
};

describe("Alert", () => {
  test("render basic configuration", () => {
    setup(
      <Alert title={fixtures.title} text={fixtures.text} variant="success" />
    );

    const alert = screen.getByRole("status");
    const title = screen.getByText(fixtures.title);
    const text = screen.getByText(fixtures.text);

    expect(alert).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("with content", () => {
    setup(
      <Alert title={fixtures.title} text={fixtures.text} variant="success">
        {fixtures.children}
      </Alert>
    );

    const content = screen.getByText(fixtures.children);

    expect(content).toBeInTheDocument();
  });

  test("with action link", () => {
    setup(
      <Alert
        title={fixtures.title}
        text={fixtures.text}
        variant="success"
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

  test("with action button", async () => {
    const onClickTrigger = jest.fn();

    const { user } = setup(
      <Alert
        title={fixtures.title}
        text={fixtures.text}
        variant="success"
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

  test("renders status role for success", () => {
    setup(
      <Alert title={fixtures.title} text={fixtures.text} variant="success" />
    );

    const alert = screen.getByRole("status");
    expect(alert).toBeInTheDocument();
  });

  test("renders alert role for alert", () => {
    setup(
      <Alert title={fixtures.title} text={fixtures.text} variant="error" />
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  test("renders with custom title tag name", () => {
    setup(
      <Alert
        title={fixtures.title}
        text={fixtures.text}
        titleTagName="h2"
        variant="error"
      />
    );

    const alert = screen.getByText(fixtures.title);
    expect(alert.tagName).toBe("H2");
  });

  test("className and attributes props", () => {
    setup(
      <Alert
        title={fixtures.title}
        text={fixtures.text}
        variant="success"
        className={fixtures.className}
        attributes={{ "data-test": fixtures.attribute }}
      />
    );

    const alert = screen.getByRole("status");

    expect(alert).toHaveClass(fixtures.className);
    expect(alert).toHaveAttribute("data-test", fixtures.attribute);
  });
});
