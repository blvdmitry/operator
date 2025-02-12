import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { getElementScroll } from "@bookingcom/bui-core/utilities/scroll";
import type * as G from "types/global";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import type * as T from "./Table.types";
import styles from "@bookingcom/bui-core/css/Table.module.css";

const Table = (props: T.Props) => {
  const {
    className,
    attributes,
    rows,
    headings,
    checkboxName,
    stickyHeader,
    borderless,
    compact,
    viewLessLabel,
    viewMoreLabel,
    onChange,
    onChangeAll,
    verticalAlign,
    overflowFade = true,
    value: controlledValue,
    defaultValue = [],
    mixin,
  } = props;
  const [value, setValue] = React.useState<string[]>(defaultValue || []);
  const isControlled = controlledValue !== undefined;
  const usedValue = isControlled ? controlledValue! : value;
  const [fadeSide, setFadeSide] = React.useState<
    "start" | "end" | "both" | null
  >(null);
  const scrollRef = React.useRef<HTMLTableElement>(null);
  const hasCollapsibleRows =
    rows.findIndex((row) => row.collapsedContent) !== -1;
  const rootClassName = classNames(
    styles.root,
    className,
    overflowFade && fadeSide && styles[`root--faded-${fadeSide}`],
    borderless && styles["root--borderless"],
    compact && styles["root--compact"],
    stickyHeader && styles["root--sticky-header"],
    mixinClassNames(mixin)
  );
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const handleRowSelect: T.RowProps["onRowSelect"] = ({
    value: rowValue,
    checked,
    event,
    name,
  }) => {
    let nextValue;

    if (checked) {
      nextValue = [...usedValue, rowValue as string];
    } else {
      nextValue = usedValue.filter((v) => v !== rowValue);
    }

    if (!isControlled) setValue(nextValue);

    if (onChange) {
      onChange({ name, value: nextValue, event });
    }
  };

  const handleSelectAll = ({ checked, event }: G.CheckArgs) => {
    if (!checkboxName) return;

    const nextValue = checked ? rows.map((row) => row.checkboxValue!) : [];
    if (!isControlled) setValue(nextValue);

    if (onChange) onChange({ name: checkboxName, value: nextValue, event });
    if (onChangeAll) {
      onChangeAll({ name: checkboxName, value: nextValue, event });
    }
  };

  const updateFade = React.useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const scrollValue = getElementScroll(scrollEl);
    const hasLeftContent = scrollValue > 0;
    const hasRightContent =
      scrollValue + scrollEl.clientWidth < scrollEl.scrollWidth;

    if (hasLeftContent && hasRightContent) return setFadeSide("both");
    if (hasRightContent) return setFadeSide("end");
    if (hasLeftContent) return setFadeSide("start");
    setFadeSide(null);
  }, []);

  React.useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    updateFade();

    window.addEventListener("resize", updateFade);
    scrollEl.addEventListener("scroll", updateFade);

    return () => {
      window.removeEventListener("resize", updateFade);
      scrollEl.removeEventListener("scroll", updateFade);
    };
  }, [updateFade]);

  return (
    <div {...rootAttributes} className={rootClassName}>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <TableHead
            hasCollapsibleRows={hasCollapsibleRows}
            headings={headings}
            checkboxName={checkboxName}
            rowsAmount={rows.length}
            value={usedValue}
            onSelectAll={checkboxName ? handleSelectAll : undefined}
          />

          <tbody className={styles.body}>
            {rows.map((row, index) => {
              const selected =
                !!row.checkboxValue &&
                usedValue.indexOf(row.checkboxValue) !== -1;

              return (
                <TableRow
                  {...row}
                  hasCollapsibleRows={hasCollapsibleRows}
                  key={row.key || row.id || index}
                  headings={headings}
                  checkboxName={checkboxName}
                  selected={selected}
                  onRowSelect={checkboxName ? handleRowSelect : undefined}
                  viewLessLabel={viewLessLabel}
                  viewMoreLabel={viewMoreLabel}
                  verticalAlign={verticalAlign}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
