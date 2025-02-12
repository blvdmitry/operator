import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import {
  isScreenSmall,
  normalizeKey,
  isRTL,
  nextFrame,
} from "@bookingcom/bui-core/utilities/helpers";
import { getTabsTransforms } from "@bookingcom/bui-core/utilities/rendering";
import Keys from "@bookingcom/bui-core/constants/keys";
import ArrowMenuIcon from "@bookingcom/bui-assets-react/streamline/ArrowMenuIcon";
import Icon from "components/Icon";
import DropdownMenu from "components/DropdownMenu";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import TabTriggerPrivate from "./TabTriggerPrivate";
import TabTrigger from "./TabTrigger";
import { useTabContext } from "./Tab.context";
import type * as T from "./Tab.types";
import styles from "@bookingcom/bui-core/css/Tab.module.css";

const TabTriggerList = (props: T.TriggerList) => {
  const { children, className, attributes } = props;
  const {
    variant,
    activeTabId,
    fillEqually,
    vertical,
    moreLabel,
    rootRef,
    navRef,
    moreRef,
    changeTab,
    buttonRefs,
  } = useTabContext();
  const [animated, setAnimated] = React.useState(false);
  const triggerListClassNames = classNames(
    styles["trigger-list"],
    variant && styles[`trigger-list--variant-${variant}`],
    animated && styles["trigger-list--animated"],
    className
  );
  const triggers: any[] = [];
  let activeIndex: number = 0;
  let isLinkBehavior = false;
  let triggerTextCombined = "";

  React.Children.forEach(children, (child: any) => {
    if (!child || child.type !== TabTrigger) return;

    triggers.push(child);
    triggerTextCombined += child.props.text;
    if (child.props.href) isLinkBehavior = true;
    if (activeTabId && child.props.id === activeTabId)
      activeIndex = triggers.length - 1;
  });

  const initialRender = React.useRef(true);
  const prevActiveIndexRef = React.useRef(activeIndex);
  const [navStyle, setNavStyle] = React.useState<{
    width?: string;
    left?: string;
  }>({});
  const [previewMode, setPreviewMode] = React.useState(false);
  const [isMobile, setMobile] = React.useState(true);
  const [visibleButtons, setVisibleButtons] = React.useState<number>(
    triggers.length
  );
  const triggersCount = triggers.length;
  const firstTriggerId = triggers[0].props.id;

  const getItemStyle = () => {
    if (!fillEqually || previewMode) return undefined;
    return { width: `${100 / triggers.length}%` };
  };

  const isMoreShown = previewMode || visibleButtons < triggers.length;
  const moreClassName = classNames(
    styles.item,
    styles["item--more"],
    isMoreShown && !isMobile && styles["item--more-active"]
  );
  const dropdownItems = triggers.slice(visibleButtons).map((trigger) => {
    const { text, icon, bubble, title, href, native, linkAttributes } =
      trigger.props;
    return {
      text,
      icon,
      bubble,
      href,
      native,
      endSlot: title,
      attributes: linkAttributes,
    };
  });

  const handleKeys = (event: React.KeyboardEvent) => {
    const lastIndex = triggers.length - 1;
    const nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    const prevIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    const hasNativeTriggers =
      triggers.filter((trigger) => trigger.props.native).length > 0;

    if (hasNativeTriggers) return;

    switch (normalizeKey(event.key)) {
      case Keys.RIGHT:
        changeTab(triggers[nextIndex].props.id, nextIndex, { focus: true });
        break;

      case Keys.LEFT:
        changeTab(triggers[prevIndex].props.id, prevIndex, { focus: true });
        break;

      case Keys.HOME:
        changeTab(triggers[0].props.id, 0, { focus: true });
        break;

      case Keys.END:
        changeTab(triggers[lastIndex].props.id, lastIndex, { focus: true });
        break;

      default:
        break;
    }
  };

  const handleDropdownItemClick = (_: T.DropdownMenuItem, index: number) => {
    const tabIndex = index + visibleButtons;
    const tab = triggers[tabIndex];

    changeTab(tab.props.id, tabIndex);
  };

  // Scrolls to active tab on first render
  // and does smooth scroll on user navigating between tabs
  useIsomorphicLayoutEffect(() => {
    if (!navRef.current || !buttonRefs.current) return;

    const activeButton = buttonRefs.current[activeIndex];
    const shouldHaveAtLeast =
      (navRef.current.clientWidth - activeButton.clientWidth) / 2;
    // When tab is larger than container width —
    // align it to start or end depending on content direction
    const alignmentCompensation = isRTL()
      ? activeButton.offsetLeft +
        (activeButton.clientWidth - navRef.current.clientWidth)
      : activeButton.offsetLeft;
    const scrollLeft =
      activeButton.clientWidth > navRef.current.clientWidth
        ? alignmentCompensation
        : activeButton.offsetLeft - shouldHaveAtLeast;

    navRef.current.scrollTo({
      left: scrollLeft,
      behavior: initialRender.current ? "auto" : "smooth",
    });
    initialRender.current = false;
  }, [activeIndex, buttonRefs, navRef]);

  useIsomorphicLayoutEffect(() => {
    if (!activeTabId) {
      changeTab(firstTriggerId, 0);
    }
  }, [firstTriggerId, activeTabId, changeTab]);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      if (fillEqually) return;

      const isMobile = isScreenSmall();

      setMobile(isMobile);
      if (!isMobile) setPreviewMode(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fillEqually, triggersCount]);

  React.useEffect(() => {
    if (triggersCount < activeIndex) {
      changeTab(firstTriggerId, 0, { focus: true });
    }
  }, [
    triggerTextCombined,
    activeIndex,
    changeTab,
    triggersCount,
    firstTriggerId,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (
      variant !== "underlined" ||
      (activeIndex >= visibleButtons && !isMobile)
    ) {
      return;
    }

    const activeButton = buttonRefs.current?.[activeIndex];
    const style = getTabsTransforms(activeButton);
    const prevActiveIndex = prevActiveIndexRef.current;

    prevActiveIndexRef.current = activeIndex;

    if (prevActiveIndex !== activeIndex) setAnimated(true);
    nextFrame(() => {
      setNavStyle(style);
    });
  }, [activeIndex, isMobile, navRef, variant, visibleButtons, buttonRefs]);

  // Preview buttons to count new sizes
  useIsomorphicLayoutEffect(() => {
    if (!previewMode) return;
    if (!rootRef.current) return;

    let isOverflow = false;
    let buttonsWidth = 0;
    let nextVisibleButtons = 0;
    const moreButtonWidth =
      (moreRef.current && moreRef.current.clientWidth) || 0;
    const rootEl = rootRef.current;
    const rootWidth = rootEl.clientWidth;

    buttonRefs.current?.forEach((el, index) => {
      // Whenever possible, use parent clientWidth (<li>) since button has borders
      // which are not taken into account when measuring with clientWidth
      buttonsWidth += el?.parentElement?.clientWidth!;
      const exceedsWidth = buttonsWidth > rootWidth;

      // More button may not fit in the free space, so we'll have to hide previous item as well
      if (
        exceedsWidth &&
        !isOverflow &&
        buttonsWidth + (moreButtonWidth || 0) > rootWidth
      ) {
        const lastEl = buttonRefs.current
          ? buttonRefs.current[index - 1]
          : undefined;

        nextVisibleButtons -= 1;
        if (lastEl && lastEl.clientWidth < moreButtonWidth)
          nextVisibleButtons -= 1;
      }

      if (exceedsWidth) isOverflow = true;
      if (!isOverflow) nextVisibleButtons += 1;
    });

    if (visibleButtons !== nextVisibleButtons) {
      setVisibleButtons(nextVisibleButtons);
    }

    setPreviewMode(false);
  }, [previewMode]);

  const handleTransitionEnd = (event: React.TransitionEvent) => {
    if (
      variant === "underlined" &&
      event.target === navRef.current &&
      event.pseudoElement === "::after"
    ) {
      setAnimated(false);
    }
  };

  return (
    <div
      {...attributes}
      className={triggerListClassNames}
      style={
        {
          "--bui-tab-underline-scale-x": navStyle.width,
          "--bui-tab-underline-transform-x": navStyle.left,
        } as React.CSSProperties
      }
    >
      <ul
        className={styles.nav}
        role={isLinkBehavior ? undefined : "tablist"}
        ref={navRef}
        onTransitionEnd={handleTransitionEnd}
      >
        {triggers.map((trigger: any, index) => {
          const isOverflow = index + 1 > visibleButtons && !previewMode;
          return (
            <TabTriggerPrivate
              {...trigger.props}
              key={trigger.props.id}
              isOverflow={isOverflow}
              triggerIndex={index}
              handleKeys={handleKeys}
              isMobile={isMobile}
              getItemStyle={getItemStyle}
            />
          );
        })}
        {dropdownItems && (
          <li
            className={moreClassName}
            role="presentation"
            ref={moreRef}
            style={getItemStyle()}
          >
            <DropdownMenu
              items={dropdownItems}
              onItemChoose={handleDropdownItemClick}
              position="bottom-end"
            >
              {(attributes) => (
                <button
                  {...attributes}
                  className={styles.link}
                  type="button"
                  role="tab"
                >
                  {moreLabel}
                  {!vertical && (
                    <Icon
                      svg={ArrowMenuIcon}
                      size="small"
                      className={styles.iconMore}
                    />
                  )}
                </button>
              )}
            </DropdownMenu>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TabTriggerList;
