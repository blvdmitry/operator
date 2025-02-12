import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Actionable from "components/Actionable";
import type * as T from "./Table.types";
import styles from "@bookingcom/bui-core/css/Table.module.css";

const TableCell = (props: T.CellProps) => {
  const { content, colspan, align, className, onClick } = props;
  const cellClassName = classNames(
    styles.cell,
    align && styles[`cell--align-${align}`],
    className
  );

  return (
    <td className={cellClassName} colSpan={colspan}>
      {onClick ? <Actionable onClick={onClick}>{content}</Actionable> : content}
    </td>
  );
};

export default TableCell;
