import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import StarIcon from "@bookingcom/bui-assets-react/streamline/StarIcon";
import StarHalfIcon from "@bookingcom/bui-assets-react/streamline/StarHalfIcon";
import CircleIcon from "@bookingcom/bui-assets-react/streamline/CircleIcon";
import CircleHalfIcon from "@bookingcom/bui-assets-react/streamline/CircleHalfIcon";
import DiamondFillIcon from "@bookingcom/bui-assets-react/streamline/DiamondFillIcon";
import DiamondHalfIcon from "@bookingcom/bui-assets-react/streamline/DiamondHalfIcon";
import SquareRatingIcon from "@bookingcom/bui-assets-react/fallback/SquareRatingIcon";
import Icon, { type IconProps } from "components/Icon";
import type * as T from "./Rating.types";
import styles from "@bookingcom/bui-core/css/Rating.module.css";

const sizeMap: Record<T.Size, IconProps["size"]> = {
  smaller: "smallest",
  small: "smaller",
  medium: "small",
  large: "medium",
  larger: "large",
};

const Rating = (props: T.Props) => {
  const {
    className,
    attributes,
    ariaLabel,
    tagName,
    variant = "stars",
    value,
    size = "medium",
    mixin,
  } = props;
  const rootClassName = classNames(styles.root, className, mixinClassNames(mixin));
  const rootAttributes = {
    ...attributes,
    style: {
      ...(attributes?.style || {}),
      ...mixinStyles(mixin),
    },
  };
  const TagName = tagName || "div";
  const iconSize = sizeMap[size];
  const icons = [];

  const getSVG = (index: number) => {
    const isHalf = index + 1 > value;

    if (isHalf && variant === "stars") return StarHalfIcon;
    if (isHalf && variant === "circles") return CircleHalfIcon;
    if (isHalf && variant === "diamonds") return DiamondHalfIcon;
    if (variant === "circles") return CircleIcon;
    if (variant === "diamonds") return DiamondFillIcon;
    if (variant === "squares") return SquareRatingIcon;
    return StarIcon;
  };

  for (let i = 0; i < Math.ceil(value); i += 1) {
    const svg = getSVG(i);
    icons.push(
      <Icon
        className={styles.item}
        key={i}
        svg={svg}
        size={iconSize}
        attributes={{ "aria-hidden": "true" }}
      />
    );
  }

  return (
    <TagName
      {...rootAttributes}
      className={rootClassName}
      role="img"
      aria-label={ariaLabel || attributes?.["aria-label"]}
    >
      {icons}
    </TagName>
  );
};

export default Rating;
