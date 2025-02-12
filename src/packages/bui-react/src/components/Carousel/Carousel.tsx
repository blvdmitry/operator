import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Button from "components/Button";
import Stack from "components/Stack";
import Slider, {
  SliderControlType,
  type SliderRef,
} from "components/_base/Slider";
import type * as T from "./Carousel.types";
import styles from "@bookingcom/bui-core/css/Carousel.module.css";

const PrivateCarouselItem = (props: T.PrivateItemProps) => {
  const { children, className, attributes, index } = props;
  const itemClassNames = classNames(styles.item, className);

  return (
    <Slider.Item
      className={itemClassNames}
      key={index}
      index={index}
      realIndex={index}
      attributes={attributes}
    >
      {children}
    </Slider.Item>
  );
};

// This is a public component developers will use which we then replace with a private one and extending the passed props
const CarouselItem = (_: T.ItemProps) => null;

const CarouselBase = (props: T.Props, ref: SliderRef) => {
  const {
    title,
    action,
    children,
    size,
    onAfterNavigate,
    attributes,
    className,
    ariaLabel,
    previousButtonAriaLabel,
    nextButtonAriaLabel,
    topNavigationOffset,
    mixin,
  } = props;
  const rootClassName = classNames(
    styles.root,
    className,
    size && styles[`root--size-${size}`],
    mixinClassNames(mixin)
  );
  const rootAttributes: T.Props["attributes"] = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <Stack direction="row" alignItems="end">
          <Stack.Item grow>{title}</Stack.Item>
          {action && (
            <Stack.Item>
              <Button.Aligner alignment={["bottom", "end"]}>
                <Button {...action} variant="tertiary" />
              </Button.Aligner>
            </Stack.Item>
          )}
        </Stack>
      </div>
    );
  };

  return (
    <>
      {title && renderHeader()}
      <Slider ref={ref}>
        <div
          {...rootAttributes}
          aria-label={ariaLabel}
          className={rootClassName}
        >
          <Slider.Container
            className={styles.inner}
            onAfterNavigate={onAfterNavigate}
          >
            {React.Children.map(children, (child: any, index) => {
              if (!child) return null;

              if (child.type === CarouselItem) {
                return <PrivateCarouselItem index={index} {...child.props} />;
              }

              return (
                <PrivateCarouselItem key={child.key || index} index={index}>
                  {child}
                </PrivateCarouselItem>
              );
            })}
          </Slider.Container>

          <div className={styles.nav} style={{ top: topNavigationOffset }}>
            <Slider.Control
              className={styles.control}
              type={SliderControlType.previous}
              attributes={{ "aria-label": previousButtonAriaLabel }}
            />

            <Slider.Control
              className={styles.control}
              type={SliderControlType.next}
              attributes={{ "aria-label": nextButtonAriaLabel }}
            />
          </div>
        </div>
      </Slider>
    </>
  );
};

const Carousel = React.forwardRef(CarouselBase) as T.Compound;
Carousel.Item = CarouselItem;

export default Carousel;
