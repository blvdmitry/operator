import React from "react";
import {
  getElementScroll,
  getElementScrollPosition,
} from "@bookingcom/bui-core/utilities/scroll";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { debounceHandler } from "utilities/handlers";
import { useSlider } from "./SliderContext";
import * as util from "./Slider.util";
import type * as T from "./Slider.types";
import styles from "@bookingcom/bui-core/css/_base/Slider.module.css";

const SliderContainer = (props: T.ContainerProps) => {
  const { onAfterNavigate, onFocus, onBlur, children, className } = props;
  const {
    realItems,
    items,
    navigate,
    startGhostsCount,
    endGhostsCount,
    setSliderState,
    infinite,
    containerRef,
    scrollValue,
    scrollingState,
    isScrollEnabled,
    itemsCount,
    setItemsCount,
    id,
  } = useSlider();
  const childrenCount = React.Children.count(children);
  const currentIndexRef = React.useRef(0);

  const getThreshold = () => {
    return containerRef.current!.clientWidth + 50;
  };

  const getCurrentItem = () => {
    const containerEl = containerRef.current;

    if (!containerEl) return;
    return util.getCurrentItem(containerEl, items);
  };

  const addGhosts = () => {
    const threshold = getThreshold();
    const lastIndex = realItems.length - 1;
    const nextState = { startGhostsCount, endGhostsCount };

    ["start", "end"].forEach((position) => {
      const isStart = position === "start";
      const delta = isStart ? -1 : 1;
      let index = isStart ? lastIndex : 0;
      let totalWidth = 0;

      while (totalWidth <= threshold && index <= lastIndex && index >= 0) {
        const el = realItems[index].el;
        const key = isStart ? "startGhostsCount" : "endGhostsCount";

        nextState[key] += 1;
        totalWidth += el.clientWidth;
        index += delta;
      }
    });

    setSliderState(nextState);
  };

  const handleScroll = debounceHandler(
    (event: React.UIEvent<HTMLUListElement>) => {
      const el = event.target as Element;
      const currentItem = getCurrentItem();

      if (!currentItem) return;

      if (
        currentItem.realIndex !== currentIndexRef.current &&
        onAfterNavigate
      ) {
        currentIndexRef.current = currentItem.realIndex;
        onAfterNavigate({ index: currentIndexRef.current });
      }

      setSliderState({ scrollValue: el.scrollLeft });
    },
    20
  );

  const handleInfiniteScrolling = (item: T.ContextItem) => {
    const containerEl = containerRef.current;

    if (!containerEl) return;

    const threshold = getThreshold();
    const currentScrollValue = getElementScroll(containerEl);
    const index = item.realIndex + startGhostsCount;

    if (currentScrollValue < threshold) {
      const position = getElementScrollPosition(item.el, containerEl);
      navigate(index, { instant: true, delta: -position });
      return;
    }

    const endScrollValue =
      containerEl.scrollWidth - currentScrollValue - containerEl.clientWidth;
    if (endScrollValue < threshold) {
      const position = getElementScrollPosition(item.el, containerEl);
      navigate(index, { instant: true, delta: -position });
    }
  };

  React.useEffect(() => {
    if (!infinite || !isScrollEnabled) return;

    const currentItem = getCurrentItem();

    if (!currentItem) return;
    handleInfiniteScrolling(currentItem);
  }, [scrollValue]);

  const renderItems = () => {
    const lastIndex = realItems.length - 1;
    const startGhostsBoundary = lastIndex - startGhostsCount + 1;
    const startGhosts =
      !!startGhostsCount &&
      React.Children.toArray(children).slice(startGhostsBoundary);
    const endGhosts =
      !!endGhostsCount &&
      React.Children.toArray(children).slice(0, endGhostsCount);

    return (
      <>
        {startGhosts &&
          startGhosts.map((child, index) => {
            if (!React.isValidElement(child)) return null;

            return React.cloneElement(child, {
              ghost: true,
              index,
              realIndex: startGhostsBoundary + index,
              key: index,
            } as any);
          })}

        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;
          const totalIndex = index + startGhostsCount;

          return React.cloneElement(child, {
            index: totalIndex,
            realIndex: index,
            key: totalIndex,
          } as any);
        })}

        {endGhosts &&
          endGhosts.map((child, index) => {
            if (!React.isValidElement(child)) return null;
            const totalIndex =
              React.Children.count(children) + startGhostsCount + index;

            return React.cloneElement(child, {
              ghost: true,
              index: totalIndex,
              realIndex: index,
              key: totalIndex,
            } as any);
          })}
      </>
    );
  };

  React.useEffect(() => {
    if (itemsCount !== childrenCount) setItemsCount(childrenCount);
  }, [itemsCount, setItemsCount, childrenCount]);

  React.useEffect(() => {
    if (infinite) addGhosts();
  }, [infinite]);

  return (
    <ul
      className={classNames(
        className,
        styles.container,
        !isScrollEnabled && styles["container--scroll-disabled"],
        scrollingState === "idle" && styles["container--snappy"]
      )}
      onScroll={handleScroll}
      ref={containerRef}
      id={id}
      tabIndex={0} // eslint-disable-line
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {renderItems()}
    </ul>
  );
};

export default SliderContainer;
