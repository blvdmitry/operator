import React from "react";
// @ts-ignore
import { omitProps } from "@bookingcom/foundry-react/utilities";
import { controls as defaultSelectControls } from "components/InputSelect/tests/InputSelect.foundry";
import Pagination from "components/Pagination";
import readme from "components/Pagination/Pagination.mdx";

const selectControls = omitProps(defaultSelectControls, "label");

export const controls = [
  {
    type: "number",
    label: "Current page",
    propertyName: "currentPage",
  },
  {
    type: "number",
    label: "Total pages",
    propertyName: "totalPages",
    defaultValue: 50,
  },
  {
    type: "string",
    label: "ARIA Page Label Prefix",
    propertyName: "ariaPageLabelPrefix",
    defaultValue: "",
  },
  {
    type: "boolean",
    label: "Show first page button",
    propertyName: "showFirstPageButton",
    defaultValue: false,
  },
  {
    type: "string",
    label: "First Page Label",
    propertyName: "firstPageButtonLabel",
    defaultValue: "",
  },
  {
    type: "boolean",
    label: "Is Last Page",
    propertyName: "isLastPage",
    defaultValue: false,
  },
  {
    type: "string",
    label: "Previous label",
    propertyName: "previousLabel",
    required: true,
    defaultValue: "Previous",
  },
  {
    type: "string",
    label: "Next label",
    propertyName: "nextLabel",
    required: true,
    defaultValue: "Next",
  },
  {
    type: "string",
    label: "Page label prefix",
    propertyName: "pageLabelPrefix",
    required: true,
    defaultValue: "Page",
  },
  {
    type: "string",
    label: "Info label",
    propertyName: "infoLabel",
  },
  {
    type: "object",
    label: "Select",
    propertyName: "select",
    controls: selectControls,
  },
  {
    type: "string",
    label: "ARIA Previous Label",
    propertyName: "ariaPreviousLabel",
    defaultValue: "",
  },
  {
    type: "string",
    label: "ARIA Next Label",
    propertyName: "ariaNextLabel",
    defaultValue: "",
  },
];

export default {
  name: "Components/Patterns/Pagination",
  readme,
  keywords: ["page", "next", "previous"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4259%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Pagination"],
    },
  },
  playground: {
    template: (props: any) => <Pagination {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Pagination
          totalPages={50}
          currentPage={1}
          infoLabel="Page 100-110 of 1000 items"
          select={{
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
            inputAttributes: {
              "aria-label": "Select how many items should be shown",
            },
          }}
          ariaNextLabel="Next Page"
          ariaPreviousLabel="Previous Page"
          ariaPageLabelPrefix="Page"
          onPageChange={({ page }) => console.log(page)}
        />
      ),
    },
    simplified: {
      template: () => (
        <Pagination
          currentPage={1}
          select={{
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
            inputAttributes: {
              "aria-label": "Select how many items should be shown",
            },
          }}
          previousLabel="Back"
          ariaPreviousLabel="Previous Page"
          ariaNextLabel="Next Page"
          nextLabel="Next"
          pageLabelPrefix="Page"
          isLastPage={false}
          onPageChange={({ page }) => console.log(page)}
        />
      ),
    },
    simplifiedWithFirstButton: {
      template: () => (
        <Pagination
          currentPage={3}
          firstPageButtonLabel="To the first page"
          showFirstPageButton
          select={{
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
            inputAttributes: {
              "aria-label": "Select how many items should be shown",
            },
          }}
          previousLabel="Back"
          ariaPreviousLabel="Previous Page"
          ariaNextLabel="Next Page"
          nextLabel="Next"
          pageLabelPrefix="Page"
          isLastPage={false}
          onPageChange={({ page }) => console.log(page)}
        />
      ),
    },
  },
};
