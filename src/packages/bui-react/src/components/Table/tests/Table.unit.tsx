import React from "react";
import { screen, within } from "@testing-library/react";
import { setup } from "tools/jest";
import Table from "components/Table";

const h1 = "Heading 1";
const h2 = "Heading 2";
const r11 = "Row 1 - Cell 1";
const r12 = "Row 1 - Cell 2";
const r21 = "Row 2 - Cell 1";
const r22 = "Row 2 - Cell 2";
const collapsedText = "Collapsed text";
const viewMoreLabel = "More";
const viewLessLabel = "Less";

describe("Table", () => {
  it("should render content", () => {
    setup(
      <Table
        headings={[{ content: h1 }, { content: h2 }]}
        rows={[
          {
            cells: [{ content: r11 }, { content: r12 }],
          },
          {
            cells: [{ content: r21 }, { content: r22 }],
          },
        ]}
      />
    );

    const headings = screen.getAllByRole("columnheader");
    const rows = screen.getAllByRole("row");

    expect(headings).toHaveLength(2);
    expect(screen.getByText(h1)).toBeInTheDocument();
    expect(screen.getByText(h2)).toBeInTheDocument();

    expect(rows).toHaveLength(3);
    expect(screen.getByText(r11)).toBeInTheDocument();
    expect(screen.getByText(r12)).toBeInTheDocument();
    expect(screen.getByText(r21)).toBeInTheDocument();
    expect(screen.getByText(r22)).toBeInTheDocument();

    rows.forEach((row) => {
      const cells = within(row).queryAllByRole("cell");

      // Ignore row with headings
      if (cells.length === 0) return;
      expect(cells).toHaveLength(2);
    });
  });

  it("should work with collapsed content", async () => {
    const handleOpen = jest.fn();
    const handleClose = jest.fn();

    const { user } = setup(
      <Table
        viewLessLabel={viewLessLabel}
        viewMoreLabel={viewMoreLabel}
        headings={[{ content: h1 }, { content: h2 }]}
        rows={[
          {
            collapsedContent: collapsedText,
            defaultExpanded: true,
            onOpen: handleOpen,
            onClose: handleClose,
            cells: [{ content: r11 }, { content: r12 }],
          },
          {
            cells: [{ content: r21 }, { content: r22 }],
          },
        ]}
      />
    );

    const expandButtons = screen.getAllByRole("button");
    const viewLessButton = screen.getAllByLabelText(viewLessLabel);
    const mainActionButton = expandButtons[0];

    expect(screen.getByText(collapsedText)).toBeVisible();
    // Arrow icon button and button in the first content cell
    expect(expandButtons).toHaveLength(2);
    expect(viewLessButton).toHaveLength(1);

    await user.click(expandButtons[0]);
    expect(mainActionButton).toHaveAttribute("aria-label", viewMoreLabel);
    expect(handleOpen).toBeCalledTimes(0);
    expect(handleClose).toBeCalledTimes(1);

    // Checking that both buttons are working
    await user.click(expandButtons[1]);
    expect(mainActionButton).toHaveAttribute("aria-label", viewLessLabel);
    expect(handleOpen).toBeCalledTimes(1);
    expect(handleClose).toBeCalledTimes(1);
  });

  it("should work with selectable rows", async () => {
    const name = "name";
    const values = ["1", "2"];
    const handleChange = jest.fn();
    const handleChangeAll = jest.fn();

    const { user } = setup(
      <Table
        onChange={handleChange}
        onChangeAll={handleChangeAll}
        defaultValue={[values[0]]}
        checkboxName={name}
        headings={[{ content: h1 }, { content: h2 }]}
        rows={[
          {
            checkboxValue: values[0],
            cells: [{ content: r11 }, { content: r12 }],
          },
          {
            checkboxValue: values[1],
            cells: [{ content: r21 }, { content: r22 }],
          },
        ]}
      />
    );

    const inputs = screen.getAllByRole("checkbox");

    // Includes "select all" checkbox
    expect(inputs).toHaveLength(3);
    expect(inputs[0]).not.toHaveAttribute("name", name);
    expect(inputs[0]).toBePartiallyChecked();
    expect(inputs[1]).toHaveAttribute("value", values[0]);
    expect(inputs[1]).toHaveAttribute("name", name);
    expect(inputs[1]).toBeChecked();
    expect(inputs[2]).toHaveAttribute("value", values[1]);
    expect(inputs[2]).toHaveAttribute("name", name);
    expect(inputs[2]).not.toBeChecked();

    await user.click(inputs[2]);
    expect(inputs[2]).toBeChecked();
    expect(inputs[0]).toBeChecked();

    await user.click(inputs[0]);
    expect(inputs[0]).not.toBeChecked();
    expect(inputs[1]).not.toBeChecked();
    expect(inputs[2]).not.toBeChecked();

    expect(handleChange).toBeCalledTimes(2);
    expect(handleChangeAll).toBeCalledTimes(1);
  });
});
