import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import InputCheckbox, {
  type InputCheckboxProps,
} from "components/InputCheckbox";
import Actionable from "components/Actionable";
import Icon from "components/Icon";
import useId from "hooks/useId";
import TableCell from "./TableCell";
import type * as T from "./Table.types";
import styles from "@bookingcom/bui-core/css/Table.module.css";

const TableRow = (props: T.RowProps) => {
  const {
    selected,
    collapsedContent,
    onRowSelect,
    checkboxValue,
    headings,
    className,
    checkboxName,
    cells,
    viewLessLabel,
    viewMoreLabel,
    verticalAlign,
    hasCollapsibleRows,
    onOpen,
    onClose,
    defaultExpanded,
    expanded,
  } = props;

  const rowId = useId();
  const [isExpanded, setExpanded] = React.useState(defaultExpanded || false);
  const isControlled = expanded !== undefined;
  const usedExpanded = isControlled ? expanded : isExpanded;
  const hasCheckbox = checkboxValue && checkboxName;
  const rowClassName = classNames(
    styles.row,
    verticalAlign && styles[`row--vertical-align-${verticalAlign}`],
    !!collapsedContent && styles["row--collapse-togle"],
    usedExpanded && styles["row--expanded"],
    selected && styles["row--selected"],
    className
  );

  const handleRowExpand = () => {
    if (usedExpanded) {
      onClose?.();
    } else {
      onOpen?.();
    }
    if (!isControlled) setExpanded((isExpanded) => !isExpanded);
  };

  const handleRowSelect: InputCheckboxProps["onChange"] = ({
    checked,
    event,
  }) => {
    if (onRowSelect && hasCheckbox && checkboxName) {
      onRowSelect({ value: checkboxValue, checked, event, name: checkboxName });
    }
  };

  const getHeadingByIndex = (cellIndex: number) => {
    let adjustedCellStartIndex = 0;
    let adjustedHeadingEndIndex = -1;

    // Find what start index value would be if there were no colspans before this cell
    for (let i = 1; i <= cellIndex; i += 1) {
      const previousCell = cells[i - 1];
      const colspan = previousCell.colspan || 1;

      adjustedCellStartIndex += colspan;
    }

    // Find a heading which contains an  adjusted start index of the current cell
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const adjustedHeadingStartIndex = adjustedHeadingEndIndex + 1;
      const colspan = heading.colspan || 1;

      adjustedHeadingEndIndex += colspan;

      if (
        adjustedCellStartIndex >= adjustedHeadingStartIndex &&
        adjustedCellStartIndex <= adjustedHeadingEndIndex
      ) {
        return heading;
      }
    }

    console.warn(
      "BUI React: The following row has more cells than header: ",
      cells
    );
    return null;
  };

  const renderCheckbox = () => {
    if (!hasCheckbox || !checkboxName) return null;
    const cellClassName = classNames(styles.cell, styles["cell--action"]);

    return (
      <td className={cellClassName}>
        <InputCheckbox
          name={checkboxName}
          value={checkboxValue}
          checked={selected || false}
          onChange={handleRowSelect}
        />
      </td>
    );
  };

  const renderToggle = () => {
    if (!hasCollapsibleRows) return null;
    const cellClassName = classNames(styles.cell, styles["cell--action"]);

    return (
      <td className={cellClassName}>
        {collapsedContent && (
          <Actionable
            className={styles["expand-button"]}
            onClick={handleRowExpand}
            attributes={{
              "aria-controls": rowId,
              "aria-label": usedExpanded ? viewLessLabel : viewMoreLabel,
            }}
          >
            <Icon svg={ArrowNavDownIcon} size="medium" />
          </Actionable>
        )}
      </td>
    );
  };

  const renderCollapsedContent = () => {
    if (!collapsedContent) return null;
    const rowClassNames = classNames(styles.row, styles["row--collapsible"]);
    let colspan = cells.reduce((total, cell) => total + (cell.colspan || 1), 0);

    if (hasCheckbox) colspan += 1;
    if (collapsedContent) colspan += 1;

    return (
      <tr id={rowId} className={rowClassNames}>
        <td
          colSpan={hasCheckbox ? colspan + 1 : colspan}
          className={styles.cell}
        >
          {collapsedContent}
        </td>
      </tr>
    );
  };

  return (
    <>
      <tr className={rowClassName}>
        {renderCheckbox()}
        {renderToggle()}

        {cells &&
          cells.map((cell, index) => {
            const heading = getHeadingByIndex(index);

            return (
              <TableCell
                {...cell}
                key={cell.key || cell.id || index}
                align={heading ? heading.align : undefined}
                onClick={
                  index === 0 && collapsedContent ? handleRowExpand : undefined
                }
              />
            );
          })}
      </tr>

      {renderCollapsedContent()}
    </>
  );
};

export default TableRow;
