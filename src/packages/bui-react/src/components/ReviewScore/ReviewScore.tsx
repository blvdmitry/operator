import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Stack from "components/Stack";
import Text, { type TextProps } from "components/Text";
import HiddenVisually from "components/HiddenVisually";
import type * as T from "./ReviewScore.types";
import styles from "@bookingcom/bui-core/css/ReviewScore.module.css";

const ReviewScore = (props: T.Props) => {
  const {
    score,
    scoreAriaLabel,
    reviewCount,
    rating,
    ratingReviewAriaLabel,
    variant,
    size = "medium",
    inline,
    alignment,
    className,
    attributes,
    mixin,
  } = props;
  const isTextVariant = variant === "text";
  const isAlignedEnd = alignment === "end";
  const shouldSwapScoreOrder = isAlignedEnd && !(inline && variant === "text");
  const rootClassName = classNames(
    styles.root,
    className,
    variant && styles[`root--variant-${variant}`],
    size && styles[`root--size-${size}`],
    inline && styles[`root--inline`],
    isAlignedEnd && styles["root--alignment-end"],
    !inline && variant !== "text" && styles["root--adjusted-text-gap"]
  );
  const shouldRenderTitle = !!rating;
  const shouldRenderText = !!reviewCount;
  const titleStyleMap: Record<
    NonNullable<T.Props["size"]>,
    TextProps["variant"]
  > = {
    medium: "emphasized_1",
    small: "emphasized_2",
    smaller: "small_1",
  };
  const titleStyle = titleStyleMap[size];
  const subtitleStyle = size === "medium" ? "small_1" : "small_2";

  return (
    <Stack
      direction={isAlignedEnd ? "row-reverse" : "row"}
      gap={2}
      alignItems="center"
      attributes={attributes}
      className={rootClassName}
      mixin={mixin}
    >
      {!isTextVariant && (
        <Text variant={titleStyle} className={styles.badge}>
          {score}
          {scoreAriaLabel && <HiddenVisually>{scoreAriaLabel}</HiddenVisually>}
        </Text>
      )}

      {(shouldRenderTitle || shouldRenderText || isTextVariant) && (
        <Stack.Item grow className={styles.content}>
          <Text
            variant={titleStyle}
            className={styles.title}
            color="neutral"
            tagName={inline ? "span" : "div"}
          >
            {!shouldSwapScoreOrder && isTextVariant && score}
            {shouldRenderTitle && !shouldSwapScoreOrder && " "}
            {shouldRenderTitle && rating}
            {shouldRenderTitle && shouldSwapScoreOrder && " "}
            {shouldSwapScoreOrder && isTextVariant && score}
            {ratingReviewAriaLabel && (
              <HiddenVisually>{ratingReviewAriaLabel}</HiddenVisually>
            )}
          </Text>

          {shouldRenderTitle && shouldRenderText && (
            <Text
              variant={inline ? titleStyle : subtitleStyle}
              color="neutral_alt"
              className={styles.text}
              tagName={inline ? "span" : "div"}
            >
              {inline && <>&nbsp;&middot;&nbsp;</>}
              {reviewCount}
            </Text>
          )}
        </Stack.Item>
      )}
    </Stack>
  );
};

export default ReviewScore;
