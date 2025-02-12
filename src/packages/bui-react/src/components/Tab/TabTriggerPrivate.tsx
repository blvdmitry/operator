import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Actionable from "components/Actionable";
import Bubble from "components/Bubble";
import Icon from "components/Icon";
import Stack from "components/Stack";
import Text from "components/Text";
import { useTabContext } from "./Tab.context";
import type * as T from "./Tab.types";
import styles from "@bookingcom/bui-core/css/Tab.module.css";

const TabTriggerPrivate = (props: T.TriggerPrivate) => {
  const {
    id,
    text,
    title,
    icon,
    bubble,
    href,
    linkAttributes,
    native,
    handleKeys,
    triggerIndex,
    isOverflow,
    isMobile,
    getItemStyle,
  } = props;
  const { activeTabId, changeTab, getButtonRef, vertical, variant } =
    useTabContext();
  const isLinkBehavior = !!href;
  const isSelected = activeTabId === id;
  const isRowBehaviour = !vertical || variant === "rounded";
  const itemClassName = classNames(
    styles.item,
    isOverflow && !isMobile && styles["item--hidden"],
    isSelected && styles["item--selected"]
  );

  return (
    <li role="none" key={id} className={itemClassName} style={getItemStyle()}>
      <Actionable
        onClick={() => changeTab(id, triggerIndex)}
        preventDefault={!native}
        href={href}
        className={styles.link}
        insetFocus
        ref={(el: HTMLButtonElement | null) => getButtonRef(el, triggerIndex)}
        attributes={{
          ...linkAttributes,
          role: isLinkBehavior ? undefined : "tab",
          "aria-current": isLinkBehavior && isSelected ? "page" : undefined,
          "aria-selected": isLinkBehavior ? undefined : isSelected,
          "aria-controls": href && !href.startsWith("#") ? undefined : id,
          onKeyUp: handleKeys,
          tabIndex: isSelected || native ? 0 : -1,
        }}
      >
        <Stack
          tagName="span"
          direction={isRowBehaviour ? "row" : "column"}
          alignItems="center"
          gap={isRowBehaviour ? 2 : 1}
          wrap="nowrap"
        >
          {icon && <Icon className={styles.icon} svg={icon} size="medium" />}
          {title && !icon && <span className={styles.title}>{title}</span>}
          <Stack.Item shrink>
            <Text tagName="span">
              {text}
              {bubble && <Bubble className={styles.bubble} {...bubble} />}
            </Text>
          </Stack.Item>
        </Stack>
      </Actionable>
    </li>
  );
};

export default TabTriggerPrivate;
