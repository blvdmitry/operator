import React from "react";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import ArrowNavUpIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavUpIcon";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { setStickyHeaderStyles } from "@bookingcom/bui-core/utilities/table";
import Button from "../Button/index.js";
import styles from "@bookingcom/bui-core/css/Table.module.css";
const TableContext = React.createContext({
    tableHeadRef: React.createRef(),
    scrollRef: React.createRef(),
});
const useTable = () => React.useContext(TableContext);
const TableCellPrivate = (props) => {
    const { rowSpan, colSpan, align, tagName: TagName, children, className, attributes, mixin, } = props;
    const width = props.width === "auto" ? 0 : props.width;
    const cellClassNames = classNames(styles.cell, align && styles[`cell--align-${align}`], mixinClassNames(mixin), className);
    const cellAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            width,
            minWidth: width,
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement(TagName, { ...cellAttributes, className: cellClassNames, rowSpan: rowSpan, colSpan: colSpan, role: !children ? "presentation" : undefined }, children));
};
const TableCell = (props) => {
    return React.createElement(TableCellPrivate, { ...props, tagName: "td" });
};
const TableHeading = (props) => {
    return React.createElement(TableCellPrivate, { ...props, tagName: "th" });
};
const TableRow = (props) => {
    const { active, children, verticalAlign, collapsedContent, onExpandToggle, expandToggleAriaLabel, expanded, defaultExpanded, onClick, attributes, } = props;
    const [expandedState, setExpandedState] = React.useState(expanded ?? defaultExpanded ?? false);
    const rowClassNames = classNames(styles.row, active && styles["row--active"], verticalAlign && styles[`row--vertical-align-$${verticalAlign}`]);
    const expandedRowClassNames = classNames(rowClassNames, styles["row--expanded-content"]);
    const cellsCount = React.Children.count(children);
    const handleExpandToggle = () => {
        if (onClick)
            return;
        const nextValue = !expandedState;
        if (expanded === undefined)
            setExpandedState(nextValue);
        onExpandToggle?.({ expanded: nextValue });
    };
    React.useEffect(() => {
        if (expanded === undefined)
            return;
        setExpandedState(expanded || false);
    }, [expanded]);
    return (React.createElement(React.Fragment, null,
        React.createElement("tr", { ...attributes, className: rowClassNames, onClick: onClick },
            collapsedContent && (React.createElement(TableCell, { width: "auto" },
                React.createElement(Button.Aligner, { alignment: ["bottom", "top", "end", "start"] },
                    React.createElement(Button, { variant: "tertiary-neutral", onClick: handleExpandToggle, icon: expandedState ? ArrowNavUpIcon : ArrowNavDownIcon, attributes: { "aria-label": expandToggleAriaLabel } })))),
            children),
        collapsedContent && expandedState && (React.createElement("tr", { className: expandedRowClassNames },
            React.createElement(TableCell, { colSpan: cellsCount }, collapsedContent)))));
};
const TableBody = (props) => {
    return React.createElement("tbody", null, props.children);
};
const TableHead = (props) => {
    const { tableHeadRef } = useTable();
    return (React.createElement("thead", { ref: tableHeadRef, className: styles.head }, props.children));
};
const Table = (props) => {
    const { children, stickyHeader, compact, borderless, className, attributes, mixin, } = props;
    const { scrollRef, tableHeadRef } = useTable();
    const rootClassNames = classNames(styles.root, className, borderless && styles["root--borderless"], compact && styles["root--compact"], stickyHeader && styles["root--sticky-header"], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    React.useEffect(() => {
        if (!stickyHeader)
            return;
        const handleScroll = () => {
            setStickyHeaderStyles(scrollRef.current, tableHeadRef.current);
        };
        document.addEventListener("scroll", handleScroll, false);
        return () => {
            document.removeEventListener("scroll", handleScroll, false);
        };
    });
    return (React.createElement("div", { ...rootAttributes, className: rootClassNames },
        React.createElement("div", { ref: scrollRef, className: styles.scroll },
            React.createElement("table", { className: styles.table }, children))));
};
Table.Cell = TableCell;
Table.Heading = TableHeading;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Head = TableHead;
export default Table;
