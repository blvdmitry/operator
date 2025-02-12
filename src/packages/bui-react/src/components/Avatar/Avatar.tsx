import React from "react";
import {
  classNames,
  responsiveClassNames,
} from "@bookingcom/bui-core/utilities/classNames";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import Icon from "components/Icon";
import type { Size as IconSize } from "components/Icon/Icon.types";
import Image from "components/Image";
import Box from "components/Box";
import type * as T from "./Avatar.types";
import styles from "@bookingcom/bui-core/css/Avatar.module.css";

const Avatar = (props: T.Props) => {
  const {
    src,
    countryCode,
    text,
    icon,
    backgroundPosition,
    backgroundSize,
    className,
    attributes,
    color,
    outline,
    ariaLabel,
    size = "medium",
    mixin,
  } = props;
  const [isImageNotFound, setImageNotFound] = React.useState(false);
  const mountedRef = React.useRef(false);

  /**
   * In the case the image src is changed,
   * we have to check again the url is valid
   * */
  React.useEffect(() => {
    // Only reset the fallback on prop changes and not on the initial mount
    const isMounted = mountedRef.current;
    mountedRef.current = true;
    if (!isMounted) return;

    setImageNotFound(false);
  }, [src, countryCode]);

  const rootClassName = classNames(
    styles.root,
    className,
    responsiveClassNames(styles, "root--size", size),
    color && styles[`root--color-${color}`],
    outline && styles[`root--outline-${outline}`],
    outline && countryCode
      ? styles["root--border-thin"]
      : styles["root--border-thick"]
  );

  const iconSize = () => {
    return mapResponsiveProps<T.Size, IconSize>(size, {
      small: "smaller",
      medium: "small",
      large: "large",
      larger: "larger",
      largest: "largest",
    });
  };

  const renderContent = () => {
    if ((src || countryCode) && !isImageNotFound) {
      const isBackground =
        !countryCode && (backgroundPosition || backgroundSize);

      if (isBackground) {
        return (
          <span
            className={styles.imageWrapper}
            aria-label={ariaLabel}
            role={ariaLabel ? "img" : undefined}
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition,
              backgroundSize,
            }}
          />
        );
      }

      return (
        <Image
          className={styles.imageWrapper}
          imgClassName={styles.image}
          src={src}
          asset={
            countryCode && {
              setName: "images-flags",
              assetName: (countryCode.charAt(0).toUpperCase() +
                countryCode.slice(1)) as T.FlagAsset["assetName"],
            }
          }
          alt={ariaLabel || ""}
          onError={() => setImageNotFound(true)}
        />
      );
    }

    if (icon)
      return (
        <Icon
          svg={icon}
          attributes={{ role: "img", "aria-label": ariaLabel }}
          size={iconSize()}
        />
      );

    if (text) return <span aria-label={ariaLabel}>{text}</span>;

    return null;
  };

  return (
    <Box
      padding={0}
      attributes={attributes}
      className={rootClassName}
      borderRadius="circle"
      overflow="hidden"
      mixin={mixin}
    >
      {renderContent()}
    </Box>
  );
};

export default Avatar;
