import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { useSlider } from "./SliderContext";
import type * as T from "./Slider.types";
import styles from "@bookingcom/bui-core/css/_base/Slider.module.css";

const SliderItem = (props: T.ItemProps) => {
  const ref = React.useRef<HTMLLIElement | null>(null);
  const {
    className,
    attributes,
    children,
    index = 0,
    realIndex = 0,
    ghost,
  } = props;
  const itemClasses = classNames(styles.item, className);
  const slider = useSlider();

  React.useEffect(() => {
    const itemData = { index, realIndex, el: ref.current! };

    if (!ghost) slider.realItems[realIndex] = itemData;
    slider.items[index] = itemData;

    return () => {
      if (!ghost) slider.realItems.splice(realIndex, 1);
      slider.items.splice(index, 1);
    };
  }, [ghost, index, realIndex, slider.items, slider.realItems]);

  return (
    <li {...attributes} className={itemClasses} ref={ref}>
      {children}
    </li>
  );
};

export default SliderItem;
