import React from "react";
import { screen } from "@testing-library/react";
import { setup } from "tools/jest";
import Pagination from "components/Pagination";

const fixtures = {
  testId: "test-id",
  totalPage: 50,
  currentPage: 1,
  infoLabel: "Page 100-110 of 1000 items",
  pageLabelPrefix: "Page",
  previousLabel: "Previous",
  nextLabel: "Next",
  select: {
    onChange: () => {},
    options: [
      {
        text: "Show 20",
        value: "20",
      },
      {
        text: "Show 40",
        value: "40",
      },
      {
        text: "Show 60",
        value: "60",
      },
    ],
    name: "showBy",
    attributes: {
      "data-testid": "select-test-id",
    },
    inputAttributes: {
      "aria-label": "Select how many items should be shown",
    },
  },
  ariaPageLabelPrefix: "Page",
  ariaPreviousLabel: "Previous Item",
  ariaNextLabel: "Next Item",
};

describe("Pagination props", () => {
  test("renders pagination", () => {
    setup(
      <Pagination
        totalPages={fixtures.totalPage}
        currentPage={fixtures.currentPage}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const pagination = screen.getByTestId(fixtures.testId);
    const prevButtonWithLabel = screen.queryByLabelText(
      fixtures.ariaPreviousLabel
    );
    const nextButtonWithLabel = screen.queryByLabelText(fixtures.ariaNextLabel);
    const select = screen.queryByTestId(
      fixtures.select.attributes["data-testid"]
    );
    const infoLabel = screen.queryByText(fixtures.infoLabel);
    const nextLabel = screen.queryByText(fixtures.nextLabel);
    const previousLabel = screen.queryByText(fixtures.previousLabel);

    expect(pagination).toBeInTheDocument();
    expect(select).not.toBeInTheDocument();
    expect(infoLabel).not.toBeInTheDocument();
    expect(nextLabel).not.toBeInTheDocument();
    expect(previousLabel).not.toBeInTheDocument();
    expect(prevButtonWithLabel).toBeInTheDocument();
    expect(nextButtonWithLabel).toBeInTheDocument();
  });

  test("renders simplified pagination", () => {
    setup(
      <Pagination
        isLastPage
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const pagination = screen.getByTestId(fixtures.testId);
    const prevButtonWithLabel = screen.queryByLabelText(
      fixtures.ariaPreviousLabel
    );
    const nextButtonWithLabel = screen.queryByLabelText(fixtures.ariaNextLabel);
    const select = screen.queryByTestId(
      fixtures.select.attributes["data-testid"]
    );
    const infoLabel = screen.queryByText(fixtures.infoLabel);
    const nextLabel = screen.queryByText(fixtures.nextLabel);
    const previousLabel = screen.queryByText(fixtures.previousLabel);
    const pageLabelPrefix = screen.queryByText(`${fixtures.pageLabelPrefix} 1`);

    expect(pagination).toBeInTheDocument();
    expect(select).not.toBeInTheDocument();
    expect(infoLabel).not.toBeInTheDocument();
    expect(nextLabel).toBeInTheDocument();
    expect(previousLabel).toBeInTheDocument();
    expect(pageLabelPrefix).toBeInTheDocument();
    expect(prevButtonWithLabel).toBeInTheDocument();
    expect(nextButtonWithLabel).toBeInTheDocument();
  });

  test("renders simplified pagination with infoLabel and select", () => {
    setup(
      <Pagination
        isLastPage
        infoLabel={fixtures.infoLabel}
        select={fixtures.select}
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
        attributes={{ "data-testid": fixtures.testId }}
      />
    );

    const pagination = screen.getByTestId(fixtures.testId);
    const prevButtonWithLabel = screen.queryByLabelText(
      fixtures.ariaPreviousLabel
    );
    const nextButtonWithLabel = screen.queryByLabelText(fixtures.ariaNextLabel);
    const select = screen.queryByTestId(
      fixtures.select.attributes["data-testid"]
    );
    const infoLabel = screen.queryByText(fixtures.infoLabel);
    const nextLabel = screen.queryByText(fixtures.nextLabel);
    const previousLabel = screen.queryByText(fixtures.previousLabel);
    const pageLabelPrefix = screen.queryByText(`${fixtures.pageLabelPrefix} 1`);

    expect(pagination).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(infoLabel).toBeInTheDocument();
    expect(nextLabel).toBeInTheDocument();
    expect(previousLabel).toBeInTheDocument();
    expect(pageLabelPrefix).toBeInTheDocument();
    expect(prevButtonWithLabel).toBeInTheDocument();
    expect(nextButtonWithLabel).toBeInTheDocument();
  });
});
