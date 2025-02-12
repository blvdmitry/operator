import React from "react";
import Divider from "components/Divider";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import {
  responsiveStyles,
  mixinStyles,
} from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Stack.types";
import styles from "@bookingcom/bui-core/css/Stack.module.css";

const StackItem = (props: T.ItemProps) => {
  const {
    split,
    grow,
    shrink,
    alignSelf,
    children,
    tagName,
    className,
    attributes,
  } = props;
  const TagName: any = tagName || "div";
  const itemClassNames = classNames(
    styles.item,
    grow && styles["item--grow"],
    (grow || shrink) && styles["item--shrink"],
    split && styles["item--split"],
    alignSelf && styles[`item--align-self-${alignSelf}`],
    className
  );

  return (
    <TagName {...attributes} className={itemClassNames}>
      {children}
    </TagName>
  );
};

const Stack = (props: T.Props) => {
  const {
    className,
    attributes,
    children,
    tagName,
    direction = "column",
    gap = 2,
    alignItems,
    justifyContent,
    wrap,
    grow = false,
    split,
    alignSelf,
    mixin,
    divided,
  } = props;

  const TagName: any = tagName || "div";
  const hasGrowItem = React.Children.toArray(children).some(
    (child: any) => child.props?.grow
  );

  const rootClassNames = classNames(
    styles.root,
    responsiveClassNames(styles, "root--direction", direction),
    responsiveClassNames(styles, "root--align-items", alignItems),
    responsiveClassNames(styles, "root--justify-content", justifyContent),
    hasGrowItem && styles[`root--nowrap`],
    split && styles[`root--split`],
    responsiveClassNames(styles, "root--wrap", wrap),
    responsiveClassNames(styles, "root--grow", grow),
    alignSelf && responsiveClassNames(styles, "root--align-self", alignSelf),
    mixinClassNames(mixin),
    className
  );

  const variables = {
    ...responsiveStyles(gap, "stack", "gap"),
    ...mixinStyles(mixin),
    ...((attributes?.style as React.CSSProperties) || {}),
  };

  const renderDividedChildrem = () => {
    const isDividerVertical = mapResponsiveProps<T.Direction, boolean>(
      direction,
      {
        column: false,
        "column-reverse": false,
        row: true,
        "row-reverse": true,
      }
    );

    return React.Children.toArray(children).reduce(
      (acc: any, child: any, index) => {
        if (index > 0) {
          acc.push(
            <div className={styles.divider} key={index}>
              <Divider vertical={isDividerVertical} />
            </div>,
            React.cloneElement(child, { key: `pair-${index}` })
          );
        } else {
          acc.push(React.cloneElement(child, { key: `single-${index}` }));
        }

        return acc;
      },
      []
    );
  };

  return (
    <TagName {...attributes} style={variables} className={rootClassNames}>
      {divided ? renderDividedChildrem() : children}
    </TagName>
  );
};

StackItem.displayName = "Stack.Item";
Stack.Item = StackItem;

export default Stack;
