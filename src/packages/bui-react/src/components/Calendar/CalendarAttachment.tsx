import React from "react";
import SkeletonLoader from "components/SkeletonLoader";
import Text, { type TextProps } from "components/Text";
import type * as T from "./Calendar.types";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

const colorMap: Record<
  NonNullable<T.AttachmentProps["variant"]>,
  TextProps["color"]
> = {
  good: "constructive",
  neutral: "neutral",
  bad: "destructive",
};

const CalendarAttachment = (props: T.AttachmentProps) => {
  const { variant = "neutral", count, text, loading, selected } = props;
  const textColor = selected ? "inherit" : colorMap[variant];

  let content = null;
  if (text) content = text;
  if (count)
    content = new Array(count)
      .fill("")
      .map((_, index) => <React.Fragment key={index}>•</React.Fragment>);
  if (loading)
    content = (
      <SkeletonLoader
        variant="box"
        width="36px"
        aspectRatio="3:1"
        className={styles.loader}
      />
    );

  return (
    <Text variant="small_2" color={textColor} className={styles.attachment}>
      {content}
    </Text>
  );
};

export default CalendarAttachment;
