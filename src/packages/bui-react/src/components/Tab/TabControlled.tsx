import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { TabProvider } from "./Tab.context";
import type * as T from "./Tab.types";
import styles from "@bookingcom/bui-core/css/Tab.module.css";

const TabControlled = (props: T.Props) => {
  const {
    activeTabId,
    attributes,
    className,
    variant = "underlined",
    vertical,
    fillEqually,
    borderless,
    color,
    moreLabel,
    onTabChange,
    children,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    variant !== "rounded" && vertical && styles["root--vertical"],
    fillEqually && styles["root--equal"],
    borderless && styles["root--borderless"],
    color === "inherit" && styles["root--color-inherit"]
  );
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRefs = React.useRef<HTMLButtonElement[]>([]);
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const moreRef = React.useRef<HTMLLIElement | null>(null);

  const getButtonRef = (el: HTMLButtonElement | null, index: number) => {
    if (el) buttonRefs.current[index] = el;
  };

  const changeTab: T.ContextProps["changeTab"] = (id, index, options = {}) => {
    const { focus } = options;
    if (onTabChange) onTabChange(id);
    if (focus && buttonRefs.current) {
      buttonRefs.current[index].focus();
    }
  };

  return (
    <TabProvider
      value={{
        variant,
        activeTabId,
        fillEqually,
        moreLabel,
        vertical,
        rootRef,
        navRef,
        buttonRefs,
        moreRef,
        changeTab,
        getButtonRef,
      }}
    >
      <nav {...attributes} className={rootClassName} ref={rootRef}>
        {children}
      </nav>
    </TabProvider>
  );
};

export default TabControlled;
