import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import FocusPositionObserver from "../FocusPositionObserver";
import { getFocusableElements } from "../focus";

jest.mock("../focus", () => {
  const original = jest.requireActual("../focus");
  return {
    __esModule: true,
    ...original,
    getFocusableElements: jest.fn(() => {
      const nodes = document.querySelectorAll("button,input");

      return Array.from(nodes);
    }),
  };
});

const fixtures = {
  dom: {
    empty: <div data-testid="root" />,
    base: (
      <div data-testid="root">
        <button type="button">1</button>
        <button type="button">2</button>
        <input type="text" name="1" />
        <input type="text" name="2" />
      </div>
    ),
    sameLength: (
      <div>
        <input type="text" name="1" />
        <input type="text" name="2" />
        <button type="button">1</button>
        <button type="button">2</button>
      </div>
    ),
    longerLength: (
      <div>
        <input type="text" name="1" />
        <input type="text" name="2" />
        <input type="text" name="3" />
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
      </div>
    ),
  },
};

describe("utilities/a11y/FocusPositionObserver", () => {
  test("amount of focusable elements stayed the same, active element was removed", async () => {
    const base = render(fixtures.dom.base);
    const elRoot = screen.getByTestId("root");
    const focusPositionObserver = new FocusPositionObserver(elRoot);
    const list = getFocusableElements(elRoot);

    focusPositionObserver.observe({
      onFocusUpdate: (el) => el.focus(),
    });
    list[1].focus();
    focusPositionObserver.sync();

    base.rerender(fixtures.dom.sameLength);

    await waitFor(() => {
      const updatedList = getFocusableElements(elRoot);
      expect(updatedList[1]).toHaveFocus();
    });

    focusPositionObserver.disconnect();
  });

  test("amount of focusable elements has been reduced, active element is still rendered", async () => {
    render(fixtures.dom.base);
    const elRoot = screen.getByTestId("root");
    const focusPositionObserver = new FocusPositionObserver(elRoot);
    const list = getFocusableElements(elRoot);

    focusPositionObserver.observe({
      onFocusUpdate: (el) => el.focus(),
    });
    list[1].focus();
    focusPositionObserver.sync();

    list[3].remove();

    await waitFor(() => {
      const updatedList = getFocusableElements(elRoot);
      expect(updatedList[1]).toHaveFocus();
    });

    focusPositionObserver.disconnect();
  });

  test("amount of focusable elements has been reduced, active element was removed", async () => {
    render(fixtures.dom.base);
    const elRoot = screen.getByTestId("root");
    const focusPositionObserver = new FocusPositionObserver(elRoot);
    const list = getFocusableElements(elRoot);

    focusPositionObserver.observe({
      onFocusUpdate: (el) => el.focus(),
    });
    list[3].focus();
    focusPositionObserver.sync();

    list[3].remove();

    await waitFor(() => {
      const updatedList = getFocusableElements(elRoot);
      expect(updatedList[2]).toHaveFocus();
    });

    focusPositionObserver.disconnect();
  });

  test("amount of focusable elements has been increased, active element was removed", async () => {
    const base = render(fixtures.dom.base);
    const elRoot = screen.getByTestId("root");
    const focusPositionObserver = new FocusPositionObserver(elRoot);
    const list = getFocusableElements(elRoot);

    focusPositionObserver.observe({
      onFocusUpdate: (el) => el.focus(),
    });
    list[list.length - 1].focus();
    focusPositionObserver.sync();

    base.rerender(fixtures.dom.longerLength);

    await waitFor(() => {
      const updatedList = getFocusableElements(elRoot);
      expect(updatedList[updatedList.length - 1]).toHaveFocus();
    });

    focusPositionObserver.disconnect();
  });

  test("no focusable elements originally, new focusable elements were added", async () => {
    const handleEnable = jest.fn();
    const base = render(fixtures.dom.empty);
    const elRoot = screen.getByTestId("root");
    const focusPositionObserver = new FocusPositionObserver(elRoot);

    focusPositionObserver.observe({
      onFocusUpdate: (el) => el.focus(),
      onFocusEnable: handleEnable,
    });

    base.rerender(fixtures.dom.base);

    await waitFor(() => {
      expect(handleEnable).toBeCalledTimes(1);
    });

    focusPositionObserver.disconnect();
  });
});
