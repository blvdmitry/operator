import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import AspectRatio from "components/AspectRatio";
import type * as T from "./SkeletonLoader.types";
import styles from "@bookingcom/bui-core/css/SkeletonLoader.module.css";

const SkeletonLoader = (props: T.Props) => {
  const {
    variant,
    width,
    color = "neutral",
    aspectRatio = "1:1",
    className,
    tagName,
    attributes,
    mixin,
  } = props;

  const rootClassNames = classNames(
    styles.root,
    color === "inherit"
      ? styles["root--color-inherit"]
      : styles["root--color-neutral"],
    className,
    mixinClassNames(mixin)
  );
  const TagName: any = tagName || "div";
  const lineAttributes = {
    ...attributes,
    style: {
      ...mixinStyles(mixin),
      width,
    },
  };

  if (variant === "title") {
    return (
      <TagName {...lineAttributes} className={rootClassNames}>
        <span className={classNames(styles.skeleton, styles.title)} />
      </TagName>
    );
  }

  if (variant === "box") {
    return (
      <AspectRatio
        width={width}
        ratio={aspectRatio}
        attributes={attributes}
        className={rootClassNames}
      >
        <span className={classNames(styles.skeleton, styles.box)} />
      </AspectRatio>
    );
  }

  return (
    <TagName {...lineAttributes} className={rootClassNames}>
      <span className={classNames(styles.skeleton, styles.line)} />
      {variant === "three-lines" && (
        <span className={classNames(styles.skeleton, styles.line)} />
      )}
      {(variant === "two-lines" || variant === "three-lines") && (
        <span className={classNames(styles.skeleton, styles.halfLine)} />
      )}
    </TagName>
  );
};

export default SkeletonLoader;
