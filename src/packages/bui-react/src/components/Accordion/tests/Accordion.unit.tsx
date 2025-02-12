import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Accordion from "components/Accordion";

describe("Accordion", () => {
  const titleContent = "Open accordion";
  const children = "Accordion content";

  test("renders basic configuration", () => {
    const testId = "test-bui-accordion-1";

    setup(
      <Accordion
        titleContent={titleContent}
        attributes={{ "data-testid": testId }}
      >
        {children}
      </Accordion>
    );

    const accordion = screen.getByTestId(testId);
    const title = screen.getByRole("button");
    const content = screen.getByText(children);

    expect(accordion).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(title).toHaveAttribute("aria-expanded", "false");
  });

  test("title click", async () => {
    const testId = "test-bui-accordion-2";
    const onOpenTrigger = jest.fn();
    const onCloseTrigger = jest.fn();

    const { user } = setup(
      <Accordion
        titleContent={titleContent}
        attributes={{ "data-testid": testId }}
        onOpen={onOpenTrigger}
        onClose={onCloseTrigger}
      >
        {children}
      </Accordion>
    );

    const accordion = screen.getByTestId(testId);
    const title = screen.getByRole("button");

    expect(accordion).toBeInTheDocument();
    expect(title).toHaveAttribute("aria-expanded", "false");

    await user.click(title);

    expect(onOpenTrigger).toHaveBeenCalledTimes(1);
    expect(title).toHaveAttribute("aria-expanded", "true");

    await user.click(title);

    expect(onCloseTrigger).toHaveBeenCalledTimes(1);
    expect(title).toHaveAttribute("aria-expanded", "false");
  });

  test("accessibility check", () => {
    const testId = "test-bui-accordion-3";

    setup(
      <Accordion
        titleContent={titleContent}
        attributes={{ "data-testid": testId }}
      >
        {children}
      </Accordion>
    );

    const title = screen.getByRole("button");
    const content = screen.getByText(children);
    expect(title).toHaveAttribute("aria-expanded");
    expect(content).toHaveAttribute("aria-labelledby");
    expect(content).not.toBeVisible();
  });
});
