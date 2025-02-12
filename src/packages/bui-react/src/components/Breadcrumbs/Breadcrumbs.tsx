import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import Icon from "components/Icon";
import Link from "components/Link";
import Stack from "components/Stack";
import Text from "components/Text";
import type * as TLink from "components/Link/Link.types";
import type * as T from "./Breadcrumbs.types";
import styles from "@bookingcom/bui-core/css/Breadcrumbs.module.css";

const Breadcrumbs = (props: T.Props) => {
  const { items, back, className, ariaLabel, attributes, mixin } = props;
  const tagName = back ? "div" : "nav";
  const rootClassName = classNames(styles.root, className);

  const renderItemText = (item: T.Props["items"][0]) => {
    if (item.href || item.onClick) {
      return <Link href={item.href} text={item.text} onClick={item.onClick} />;
    }

    return item.text;
  };

  const renderBack = () => {
    const item = items[0];
    const backLinkProperties: Partial<TLink.Props> = {
      variant: "secondary",
      icon: ArrowNavLeftIcon,
    };

    return (
      <Link
        href={item.href}
        text={item.text}
        onClick={item.onClick}
        {...backLinkProperties}
      />
    );
  };

  const renderItems = () => {
    return (
      <Stack tagName="ol" direction="row" gap={1} className={styles.list}>
        {items.map((item, index) => (
          <Stack.Item tagName="li" key={item.text}>
            <span className={styles.item}>
              {index > 0 && (
                <Icon svg={ArrowNavRightIcon} className={styles.icon} />
              )}
              {index === items.length - 1 ? (
                <Text variant="small_1">{item.text}</Text>
              ) : (
                renderItemText(item)
              )}
            </span>
          </Stack.Item>
        ))}
      </Stack>
    );
  };

  return (
    <Text
      tagName={tagName}
      attributes={{ ...attributes, "aria-label": ariaLabel }}
      className={rootClassName}
      variant="small_1"
      mixin={mixin}
    >
      {back ? renderBack() : renderItems()}
    </Text>
  );
};

export default Breadcrumbs;
