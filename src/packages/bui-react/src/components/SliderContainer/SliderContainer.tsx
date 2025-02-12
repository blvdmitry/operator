import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box from "components/Box";
import PaginationIndicator from "components/PaginationIndicator";
import Scrim from "components/Scrim";
import Slider, {
  SliderControlType,
  type SliderContainerProps,
} from "components/_base/Slider";
import SliderContainerItem from "./SliderContainerItem";
import type * as T from "./SliderContainer.types";
import styles from "@bookingcom/bui-core/css/SliderContainer.module.css";

const SliderContainerBase = (props: T.Props, ref: T.Ref) => {
  const {
    variant = "media",
    infinite = true,
    borderRadius,
    showNavigationControls,
    isScrollEnabled = true,
    defaultActiveIndex,
    className,
    attributes,
    children,
    previousButtonAriaLabel,
    nextButtonAriaLabel,
    onAfterNavigate,
    onNavigationControlClick,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
  const [containerIsFocused, setContainerIsFocused] = React.useState(false);
  const rootClassNames = classNames(
    styles.root,
    styles[`root--variant-${variant}`],
    containerIsFocused && styles["root--focused"],
    !showNavigationControls && styles["root--hide-controls"],
    borderRadius && styles[`root--border-radius-${borderRadius}`],
    className
  );
  const childrenLength = React.Children.count(children);

  const handleNavigate: SliderContainerProps["onAfterNavigate"] = (props) => {
    const { index } = props;
    setActiveIndex(index);

    onAfterNavigate?.(props);
  };

  const previousControlClassName = classNames(
    styles.control,
    styles["previous-control"]
  );
  const nextControlClassName = classNames(
    styles.control,
    styles["next-control"]
  );

  return (
    <Slider
      infinite={variant === "content" ? false : infinite}
      isScrollEnabled={
        "isScrollEnabled" in props ? isScrollEnabled : variant !== "content"
      }
      defaultActiveIndex={defaultActiveIndex}
      ref={ref}
    >
      <div {...attributes} className={rootClassNames}>
        <div className={styles.inner}>
          <Slider.Container
            className={styles.items}
            onAfterNavigate={handleNavigate}
            onFocus={() => setContainerIsFocused(true)}
            onBlur={() => setContainerIsFocused(false)}
          >
            {React.Children.map(children, (child, index) => {
              return (
                <Slider.Item
                  className={styles.item}
                  index={index}
                  realIndex={index}
                  key={index}
                >
                  {child}
                </Slider.Item>
              );
            })}
          </Slider.Container>
        </div>

        {childrenLength > 1 && (
          <>
            {variant === "media" && (
              <div className={previousControlClassName}>
                <Slider.Control
                  type={SliderControlType.previous}
                  attributes={{ "aria-label": previousButtonAriaLabel }}
                  onNavigationControlClick={onNavigationControlClick}
                />
              </div>
            )}

            {variant === "media" && (
              <div className={nextControlClassName}>
                <Slider.Control
                  type={SliderControlType.next}
                  attributes={{ "aria-label": nextButtonAriaLabel }}
                  onNavigationControlClick={onNavigationControlClick}
                />
              </div>
            )}

            {variant === "media" && (
              <Scrim position="bottom" centered>
                <PaginationIndicator
                  variant="white"
                  total={childrenLength}
                  activeIndex={activeIndex}
                />
              </Scrim>
            )}
            {variant === "content" && (
              <Box
                padding={6}
                className={styles["pagination-indicator-container"]}
              >
                <PaginationIndicator
                  total={childrenLength}
                  activeIndex={activeIndex}
                />
              </Box>
            )}
          </>
        )}
      </div>
    </Slider>
  );
};

const SliderContainer = React.forwardRef(SliderContainerBase) as T.Compound;
SliderContainer.Item = SliderContainerItem;

export default SliderContainer;
