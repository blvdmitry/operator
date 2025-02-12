import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import InputCheckbox from "components/InputCheckbox";
import type * as T from "./Table.types";
import styles from "@bookingcom/bui-core/css/Table.module.css";

const TableHead = (props: T.HeadProps) => {
  const {
    headings,
    checkboxName,
    rowsAmount,
    value,
    onSelectAll,
    hasCollapsibleRows,
  } = props;
  const actionCellClassNames = classNames(
    styles.cell,
    styles["cell--head"],
    styles["cell--action"]
  );
  const isChecked = (value && rowsAmount === value.length) || false;
  const isIndeterminate =
    value && value.length > 0 && value.length < rowsAmount;

  return (
    <thead className={styles.head}>
      <tr className={styles.row}>
        {/* Reserve space for the column with toggle button */}
        {hasCollapsibleRows && <td className={actionCellClassNames} />}

        {checkboxName && (
          <th className={actionCellClassNames}>
            <InputCheckbox
              name="_check-all"
              checked={isChecked}
              indeterminate={isIndeterminate}
              onChange={onSelectAll}
            />
          </th>
        )}

        {headings.map((heading, index) => {
          const headingClassName = classNames(
            styles.cell,
            styles["cell--head"],
            heading.align && styles[`cell--align-${heading.align}`],
            heading.className
          );

          return (
            <th
              key={
                heading.key ||
                heading.id ||
                (typeof heading.content === "string" && heading.content) ||
                index
              }
              className={headingClassName}
              colSpan={heading.colspan}
              style={{ width: heading.width, minWidth: heading.width }}
            >
              {heading.content}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
