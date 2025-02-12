import React from "react";
import type * as T from "./Table.types";
declare const Table: {
    (props: T.Props): React.JSX.Element;
    Cell: (props: T.CellProps) => React.JSX.Element;
    Heading: (props: T.HeadingProps) => React.JSX.Element;
    Row: (props: T.RowProps) => React.JSX.Element;
    Body: (props: T.BodyProps) => React.JSX.Element;
    Head: (props: T.HeadProps) => React.JSX.Element;
};
export default Table;
