import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Icon from "components/Icon";
import Text from "components/Text";
import type * as T from "./List.types";
import styles from "@bookingcom/bui-core/css/List.module.css";
import localStyles from "@bookingcom/bui-core/css/List.react.module.css";

const List = (props: T.Props) => {
  const {
    children,
    variant = "text",
    divided,
    items,
    className,
    attributes,
    rowSpacing = "medium",
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    divided && styles["root--divided"],
    variant && styles[`root--variant-${variant}`],
    mixinClassNames(mixin)
  );

  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const renderMainSection = (item: T.Item) => {
    if (!item.title) {
      return <div className={styles.main}>{item.content}</div>;
    }

    return (
      <div className={styles.main}>
        {item.title && <Text variant="strong_2">{item.title}</Text>}
        <Text color="neutral_alt">{item.content}</Text>
      </div>
    );
  };

  const renderItem = (item: T.Item, index: number) => {
    const isTextOnly = !item.icon && !item.sideContent;
    const key = item.key || index;
    const itemClassNames = classNames(
      styles.item,
      localStyles.item,
      isTextOnly && localStyles["item--text-only"],
      item.title && localStyles["item--with-title"],
      rowSpacing && styles[`item--spacing-${rowSpacing}`]
    );

    if (isTextOnly) {
      return (
        <li className={itemClassNames} key={key}>
          {renderMainSection(item)}
        </li>
      );
    }

    return (
      <li className={itemClassNames} key={key}>
        {item.icon && (
          <Icon
            size="large"
            {...item.iconProps}
            svg={item.icon}
            className={localStyles.icon}
          />
        )}
        <div className={localStyles.body}>
          {renderMainSection(item)}
          {item.sideContent && (
            <div className={localStyles.side}>{item.sideContent}</div>
          )}
        </div>
      </li>
    );
  };

  const childClassNames = classNames(
    styles.item,
    rowSpacing && styles[`item--spacing-${rowSpacing}`]
  );

  const renderItems = () => items?.map(renderItem);
  const renderChildren = () =>
    React.Children.map(children, (child: any, index) => {
      return (
        <li className={childClassNames} key={child.key || index}>
          {child}
        </li>
      );
    });

  return (
    <ul {...rootAttributes} className={rootClassName}>
      {items ? renderItems() : renderChildren()}
    </ul>
  );
};

export default List;
