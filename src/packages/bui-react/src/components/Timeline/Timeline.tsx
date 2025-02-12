import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "components/Icon";
import Text from "components/Text";
import Stack from "components/Stack";
import type * as T from "./Timeline.types";
import styles from "@bookingcom/bui-core/css/Timeline.module.css";

const TimelineItem = (props: T.ItemProps) => {
  const { title, children, marker, markerColor, lineVariant } = props;
  const itemClassNames = classNames(
    styles.item,
    lineVariant && styles[`item--line-variant-${lineVariant}`]
  );

  return (
    <li className={itemClassNames}>
      <Text className={styles.marker} color={markerColor}>
        {marker && <Icon svg={marker} size="large" />}
      </Text>
      <Stack gap={2}>
        {title && <Stack.Item>{title}</Stack.Item>}
        <Stack.Item>{children}</Stack.Item>
      </Stack>
    </li>
  );
};

const Timeline = (props: T.Props) => {
  const { children, className, attributes, mixin } = props;
  const rootClassName = classNames(styles.root, className);

  return (
    <Text
      attributes={attributes}
      className={rootClassName}
      tagName="ol"
      mixin={mixin}
    >
      {React.Children.map(children, (child: any, index) => {
        if (child.type === TimelineItem) return child;
        return <TimelineItem key={child.key || index}>{child}</TimelineItem>;
      })}
    </Text>
  );
};

Timeline.Item = TimelineItem;
export default Timeline;
