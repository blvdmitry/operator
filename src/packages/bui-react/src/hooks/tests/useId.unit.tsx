import React from "react";
import { render, screen } from "@testing-library/react";
import BUIProvider from "components/BUIProvider";
import useId from "hooks/useId";
import TravellerTheme from "themes/traveller";
import mockedUseId from "./__mocks__/useId";

jest.mock("../useId.ts", () => ({
  __esModule: true,
  default: jest.fn((id) => mockedUseId(id)),
}));

const Generator = () => {
  const id = useId();

  return <div data-testid="id">{id}</div>;
};

describe("useId", () => {
  test("generates ids", () => {
    render(
      <BUIProvider theme={TravellerTheme}>
        <Generator />
        <Generator />
        <Generator />
      </BUIProvider>
    );

    const ids = screen.getAllByTestId("id");
    expect(ids).toMatchSnapshot();
  });

  test("works with multiple providers", () => {
    render(
      <>
        <BUIProvider theme={TravellerTheme}>
          <Generator />
          <Generator />
          <Generator />
        </BUIProvider>
        <BUIProvider theme={TravellerTheme}>
          <Generator />
          <Generator />
          <Generator />
        </BUIProvider>
      </>
    );

    const ids = screen.getAllByTestId("id");
    expect(ids).toMatchSnapshot();
  });
});
