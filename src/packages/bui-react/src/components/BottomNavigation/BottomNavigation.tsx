import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Actionable from "components/Actionable";
import Avatar from "components/Avatar";
import BubbleContainer from "components/BubbleContainer";
import Icon from "components/Icon";
import Text from "components/Text";
import useId from "hooks/useId";
import type * as T from "./BottomNavigation.types";
import styles from "@bookingcom/bui-core/css/BottomNavigation.module.css";

const BottomNavigation = (props: T.Props) => {
  const { items, className, selectedId, onItemChoose, attributes, mixin } =
    props;
  const rootClassNames = classNames(
    styles.root,
    className,
    mixinClassNames(mixin)
  );
  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const navId = useId();

  const handleItemClick = (
    event: React.MouseEvent | React.KeyboardEvent,
    item: T.Item
  ) => {
    if (item.onChoose) item.onChoose(event);
    if (onItemChoose) onItemChoose(item, event);
  };

  const renderItem = (item: T.Item, index: number) => {
    const itemClassNames = classNames(
      styles.item,
      item.id === selectedId && styles["item--selected"]
    );
    const curItemId = `${navId}_${index}`;
    const bubbleId = item.notificationValue ? curItemId : undefined;

    return (
      <Actionable
        href={item.href}
        key={item.id}
        className={itemClassNames}
        attributes={{
          ...item.attributes,
          "aria-label": item.ariaLabel,
          "aria-describedby": bubbleId,
        }}
        onClick={(e: React.MouseEvent | React.KeyboardEvent) =>
          handleItemClick(e, item)
        }
        preventDefault={
          item.preventDefault ?? !!(item.onChoose || onItemChoose)
        }
      >
        <BubbleContainer
          attributes={{ id: curItemId }}
          value={item.notificationValue}
          ariaLabel={item.notificationAriaLabel}
        >
          {item.avatar && <Avatar {...item.avatar} size="small" />}
          {item.icon && !item.avatar && <Icon svg={item.icon} size="large" />}
        </BubbleContainer>

        {item.text && (
          <Text tagName="span" className={styles.text} variant="small_1">
            {item.text}
          </Text>
        )}
      </Actionable>
    );
  };

  return (
    <nav {...rootAttributes} className={rootClassNames}>
      {items && items.map((item, index) => renderItem(item, index))}
    </nav>
  );
};

export default BottomNavigation;
