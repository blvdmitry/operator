import React from "react";
import env from "@bookingcom/bui-env-react";
import Pagination from "components/Pagination";

const fixtures = {
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
  },
  ariaPageLabelPrefix: "Page",
  ariaPreviousLabel: "Previous Item",
  ariaNextLabel: "Next Item",
};

env.test.vrt({
  paginationNumbers: {
    component: (
      <Pagination
        totalPages={fixtures.totalPage}
        currentPage={fixtures.currentPage}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationNumbersWithInfoLabel: {
    component: (
      <Pagination
        infoLabel={fixtures.infoLabel}
        totalPages={fixtures.totalPage}
        currentPage={fixtures.currentPage}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationNumbersWithSelect: {
    component: (
      <Pagination
        select={fixtures.select}
        totalPages={fixtures.totalPage}
        currentPage={fixtures.currentPage}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationNumbersWithInfoLabelAndSelect: {
    component: (
      <Pagination
        infoLabel={fixtures.infoLabel}
        select={fixtures.select}
        totalPages={fixtures.totalPage}
        currentPage={fixtures.currentPage}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationSimplified: {
    component: (
      <Pagination
        isLastPage
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationSimplifiedWithFirstPageButton: {
    component: (
      <Pagination
        isLastPage
        firstPageButtonLabel="To the first page"
        showFirstPageButton
        currentPage={3}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationSimplifiedWithInfoLabel: {
    component: (
      <Pagination
        isLastPage={false}
        infoLabel={fixtures.infoLabel}
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationSimplifiedWithSelect: {
    component: (
      <Pagination
        isLastPage={false}
        select={fixtures.select}
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationSimplifiedWithInfoLabelAndSelect: {
    component: (
      <Pagination
        isLastPage={false}
        infoLabel={fixtures.infoLabel}
        select={fixtures.select}
        currentPage={fixtures.currentPage}
        previousLabel={fixtures.previousLabel}
        nextLabel={fixtures.nextLabel}
        pageLabelPrefix={fixtures.pageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
  paginationMiddlePageSelected: {
    component: (
      <Pagination
        totalPages={fixtures.totalPage}
        currentPage={25}
        ariaPageLabelPrefix={fixtures.ariaPageLabelPrefix}
        ariaNextLabel={fixtures.ariaNextLabel}
        ariaPreviousLabel={fixtures.ariaPreviousLabel}
      />
    ),
    viewports: ["small", "large"],
  },
});
