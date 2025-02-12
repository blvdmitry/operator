import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { isScreenSmall, normalizeKey, nextFrame, } from "@bookingcom/bui-core/utilities/helpers";
import { getTabsTransforms } from "@bookingcom/bui-core/utilities/rendering";
import Keys from "@bookingcom/bui-core/constants/keys";
import { ArrowMenuIcon, DotsHorizontalOutlineIcon, } from "@bookingcom/bui-assets-react/streamline";
import Icon from "../Icon/index.js";
import DropdownMenu from "../DropdownMenu/index.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import useRTL from "../../hooks/useRTL.js";
import usePrevious from "../../hooks/usePrevious.js";
import TabTriggerPrivate from "./TabTriggerPrivate.js";
import TabTrigger from "./TabTrigger.js";
import { useTabContext } from "./Tab.context.js";
import styles from "@bookingcom/bui-core/css/Tab.module.css";
const TabTriggerList = (props) => {
    const { children, className, attributes } = props;
    const { variant, activeTabId, fillEqually, vertical, edgeGradient, moreLabel, rootRef, navRef, moreRef, changeTab, buttonRefs, } = useTabContext();
    const [isRtl] = useRTL();
    const prevIsRtl = usePrevious(isRtl);
    const [animated, setAnimated] = React.useState(false);
    const [mask, setMask] = React.useState(false);
    const triggerListClassNames = classNames(styles["trigger-list"], variant && styles[`trigger-list--variant-${variant}`], animated && styles["trigger-list--animated"], edgeGradient && mask && styles[`trigger-list--mask-${mask}`], className);
    const triggers = [];
    let activeIndex = 0;
    let areAllItemsTab = true;
    let triggerTextCombined = "";
    React.Children.forEach(children, (child) => {
        if (!child || child.type !== TabTrigger)
            return;
        triggers.push(child);
        triggerTextCombined += child.props.text;
        if (child.props.href && !child.props.href.startsWith("#"))
            areAllItemsTab = false;
        if (activeTabId && child.props.id === activeTabId)
            activeIndex = triggers.length - 1;
    });
    const initialRender = React.useRef(true);
    const prevActiveIndexRef = React.useRef(activeIndex);
    const [navStyle, setNavStyle] = React.useState({});
    const [previewMode, setPreviewMode] = React.useState(false);
    const [isMobile, setMobile] = React.useState(true);
    const [visibleButtons, setVisibleButtons] = React.useState(triggers.length);
    const triggersCount = triggers.length;
    const firstTriggerId = triggers[0].props.id;
    const getItemStyle = () => {
        if (!fillEqually || previewMode)
            return undefined;
        return { width: `${100 / triggers.length}%` };
    };
    const isMoreShown = previewMode || visibleButtons < triggers.length;
    const moreClassName = classNames(styles.item, styles["item--more"], isMoreShown && !isMobile && styles["item--more-active"]);
    const dropdownItems = triggers.slice(visibleButtons).map((trigger) => {
        const { text, icon, bubble, title, href, native, linkAttributes } = trigger.props;
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
    const handleKeys = (event) => {
        const lastIndex = triggers.length - 1;
        const nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
        const prevIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
        const hasNativeTriggers = triggers.filter((trigger) => trigger.props.native).length > 0;
        if (hasNativeTriggers)
            return;
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
    const handleDropdownItemClick = (_, index) => {
        const tabIndex = index + visibleButtons;
        const tab = triggers[tabIndex];
        changeTab(tab.props.id, tabIndex);
    };
    // Scrolls to active tab on first render
    // and does smooth scroll on user navigating between tabs
    React.useEffect(() => {
        if (!navRef.current || !buttonRefs.current)
            return;
        if (prevIsRtl !== isRtl) {
            initialRender.current = true;
        }
        const activeButton = buttonRefs.current[activeIndex];
        const shouldHaveAtLeast = (navRef.current.clientWidth - activeButton.offsetWidth) / 2;
        // When tab is larger than container width —
        // align it to start or end depending on content direction
        const activeButtonOffset = activeButton.offsetLeft + (activeButton.parentElement?.offsetLeft || 0);
        const alignmentCompensation = isRtl
            ? activeButtonOffset +
                (activeButton.offsetWidth - navRef.current.clientWidth)
            : activeButtonOffset;
        const scrollLeft = activeButton.offsetWidth > navRef.current.clientWidth
            ? alignmentCompensation
            : activeButtonOffset - shouldHaveAtLeast;
        navRef.current.scrollTo({
            left: scrollLeft,
            behavior: initialRender.current ? "auto" : "smooth",
        });
        // On initial render we check if gradient mask should be applied
        // To indicate for the user that it's a scrollable area
        if (edgeGradient && initialRender.current) {
            // The logic for wherther to mask the scrollview works as follows:
            // If the text of next/previous tab button is not visible within the scrollview
            // then the mask is required. We treat button whitespace as non-visible part.
            const buttonGroups = {
                prev: buttonRefs.current.slice(0, activeIndex),
                next: buttonRefs.current.slice(activeIndex + 1),
            };
            const nextButtons = isRtl ? buttonGroups.prev : buttonGroups.next;
            const prevButtons = isRtl ? buttonGroups.next : buttonGroups.prev;
            // Most of the time text nodes still have some whitespace in them
            // So we compensate that with a fixed 2px compensation
            const compensation = 2;
            const whitespaceBoundaries = [
                buttonRefs.current[activeIndex].children[0]
                    .offsetLeft +
                    buttonRefs.current[activeIndex].offsetLeft +
                    compensation,
                -buttonRefs.current[activeIndex].children[0]
                    .offsetLeft - compensation,
            ];
            const buttonOnEndEdge = nextButtons.length > 0 &&
                nextButtons.find((button) => {
                    if (!button || !navRef.current)
                        return false;
                    const distanceToEndScrollviewEdge = navRef.current.scrollLeft + navRef.current.clientWidth;
                    const buttonDistanceToEndSrollviewEdge = distanceToEndScrollviewEdge -
                        (button.parentElement?.offsetLeft || 0);
                    return (buttonDistanceToEndSrollviewEdge <= whitespaceBoundaries[0] &&
                        buttonDistanceToEndSrollviewEdge >= whitespaceBoundaries[1]);
                });
            const buttonOnStartEdge = prevButtons.length > 0 &&
                prevButtons.find((button) => {
                    if (!button || !navRef.current)
                        return false;
                    const distanceToEndScrollviewEdge = navRef.current.scrollLeft;
                    const buttonDistanceToEndSrollviewEdge = distanceToEndScrollviewEdge -
                        ((button.parentElement?.offsetLeft || 0) +
                            (button.parentElement?.offsetWidth || 0));
                    return (buttonDistanceToEndSrollviewEdge <= whitespaceBoundaries[0] &&
                        buttonDistanceToEndSrollviewEdge >= whitespaceBoundaries[1]);
                });
            if (buttonOnEndEdge && buttonOnStartEdge) {
                setMask("both");
            }
            else if (buttonOnStartEdge) {
                setMask("start");
            }
            else if (buttonOnEndEdge) {
                setMask("end");
            }
        }
        requestAnimationFrame(() => {
            if (initialRender.current) {
                initialRender.current = false;
            }
        });
    }, [
        activeIndex,
        buttonRefs,
        navRef,
        setMask,
        edgeGradient,
        isRtl,
        prevIsRtl,
    ]);
    useIsomorphicLayoutEffect(() => {
        if (!activeTabId) {
            changeTab(firstTriggerId, 0);
        }
    }, [firstTriggerId, activeTabId, changeTab]);
    useIsomorphicLayoutEffect(() => {
        const handleResize = () => {
            if (fillEqually)
                return;
            const isMobile = isScreenSmall();
            setMobile(isMobile);
            if (!isMobile)
                setPreviewMode(true);
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
        if (variant !== "underlined" ||
            (activeIndex >= visibleButtons && !isMobile)) {
            return;
        }
        const activeButton = buttonRefs.current?.[activeIndex];
        const style = getTabsTransforms(activeButton);
        const prevActiveIndex = prevActiveIndexRef.current;
        prevActiveIndexRef.current = activeIndex;
        if (prevActiveIndex !== activeIndex)
            setAnimated(true);
        nextFrame(() => {
            setNavStyle(style);
        });
    }, [activeIndex, isMobile, navRef, variant, visibleButtons, buttonRefs]);
    // Preview buttons to count new sizes
    useIsomorphicLayoutEffect(() => {
        if (!previewMode)
            return;
        if (!rootRef.current)
            return;
        let isOverflow = false;
        let buttonsWidth = 0;
        let nextVisibleButtons = 0;
        const moreButtonWidth = (moreRef.current && moreRef.current.clientWidth) || 0;
        const rootEl = rootRef.current;
        const rootWidth = rootEl.clientWidth;
        buttonRefs.current?.forEach((el, index) => {
            // Whenever possible, use parent clientWidth (<li>) since button has borders
            // which are not taken into account when measuring with clientWidth
            buttonsWidth += el?.parentElement?.clientWidth;
            const exceedsWidth = buttonsWidth > rootWidth;
            // More button may not fit in the free space, so we'll have to hide previous item as well
            if (exceedsWidth &&
                !isOverflow &&
                buttonsWidth + (moreButtonWidth || 0) > rootWidth) {
                const lastEl = buttonRefs.current
                    ? buttonRefs.current[index - 1]
                    : undefined;
                nextVisibleButtons -= 1;
                if (lastEl && lastEl.clientWidth < moreButtonWidth)
                    nextVisibleButtons -= 1;
            }
            if (exceedsWidth)
                isOverflow = true;
            if (!isOverflow)
                nextVisibleButtons += 1;
        });
        if (visibleButtons !== nextVisibleButtons) {
            setVisibleButtons(nextVisibleButtons);
        }
        setPreviewMode(false);
    }, [previewMode]);
    React.useEffect(() => {
        if (edgeGradient && activeIndex !== prevActiveIndexRef.current) {
            setMask(false);
        }
    }, [edgeGradient, activeIndex]);
    const handleTransitionEnd = (event) => {
        if (variant === "underlined" &&
            event.target === navRef.current &&
            event.pseudoElement === "::after") {
            setAnimated(false);
        }
    };
    const handleScroll = () => {
        if (edgeGradient && mask && !initialRender.current) {
            setMask(false);
        }
    };
    return (React.createElement("div", { ...attributes, className: triggerListClassNames, style: {
            "--bui-tab-underline-scale-x": navStyle.width,
            "--bui-tab-underline-transform-x": navStyle.left,
        } },
        React.createElement("ul", { className: styles.nav, role: areAllItemsTab ? "tablist" : undefined, ref: navRef, onTransitionEnd: handleTransitionEnd, onScroll: handleScroll },
            triggers.map((trigger, index) => {
                const isOverflow = index + 1 > visibleButtons && !previewMode;
                return (React.createElement(TabTriggerPrivate, { ...trigger.props, key: trigger.props.id, isOverflow: isOverflow, triggerIndex: index, handleKeys: handleKeys, isMobile: isMobile, getItemStyle: getItemStyle, hasParentRole: areAllItemsTab }));
            }),
            dropdownItems && (React.createElement("li", { className: moreClassName, role: "presentation", ref: moreRef, style: getItemStyle() },
                React.createElement(DropdownMenu, { items: dropdownItems, onItemChoose: handleDropdownItemClick, position: "bottom-end" }, (attributes) => (React.createElement("button", { ...attributes, className: styles.link, type: "button", role: "tab" },
                    vertical && (React.createElement(Icon, { svg: DotsHorizontalOutlineIcon, size: "medium", scale: true, className: styles["icon-more--vertical"] })),
                    moreLabel,
                    !vertical && (React.createElement(Icon, { svg: ArrowMenuIcon, size: "small", scale: true, className: styles["icon-more--horizontal"] }))))))))));
};
export default TabTriggerList;
