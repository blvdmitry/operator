import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import mixinClassNames from "utilities/mixinClassNames";
import {
  responsiveStyles,
  mixinStyles,
} from "@bookingcom/bui-core/utilities/styles";
import { getImageAssetUrl } from "@bookingcom/bui-assets-react";
import LandscapeIcon from "@bookingcom/bui-assets-react/streamline/LandscapeIcon";
import useThemeMode from "hooks/useThemeMode";
import useImageLoadingStatus from "hooks/useImageLoadingStatus";
import Icon from "components/Icon";
import Stack from "components/Stack";
import type * as T from "./Image.types";
import styles from "@bookingcom/bui-core/css/Image.module.css";

const ImageFallback = (
  props: Pick<
    T.Props,
    "fallback" | "fallbackIcon" | "fallbackImage" | "fallbackImagePadding"
  >
) => {
  const { fallback, fallbackIcon, fallbackImage, fallbackImagePadding } = props;

  if (fallback === "icon" && fallbackIcon) {
    return (
      <Stack
        className={styles.fallback}
        alignItems="center"
        justifyContent="center"
      >
        <Icon size="largest" svg={fallbackIcon} color="neutral_alt" />
      </Stack>
    );
  }

  if (fallback === "background") {
    return <div className={styles.fallback} />;
  }

  if (fallback === "image" && fallbackImage) {
    const fallbackImageClassNames = classNames(
      styles.fallback,
      fallbackImagePadding &&
        styles[`fallback-image-padding--${fallbackImagePadding}`]
    );

    return (
      <Stack
        className={fallbackImageClassNames}
        alignItems="center"
        justifyContent="center"
      >
        {fallbackImage}
      </Stack>
    );
  }

  return null;
};

const Image = (props: T.Props) => {
  const {
    src,
    asset,
    alt,
    width,
    height,
    borderRadius,
    contentMode = "fill",
    fallback = null,
    fallbackImage,
    fallbackImageSrc,
    fallbackImagePadding = "large",
    fallbackIcon = LandscapeIcon,
    priority,
    onError: passedOnError,
    className,
    attributes,
    imgClassName,
    imgAttributes,
    mixin,
  } = props;
  const { mode } = useThemeMode();
  const { status, handleError, handleLoad, handleReset, imageRef } =
    useImageLoadingStatus({ onError: passedOnError });
  const imageUrl = asset
    ? getImageAssetUrl({ ...asset, dark: mode === "dark" })
    : src;
  const imageUrlx2 =
    asset && getImageAssetUrl({ ...asset, dark: mode === "dark", density: 2 });
  const convertNumberToPx = (value?: string | number) =>
    typeof value === "number" ? `${value}px` : value;
  const rootStyle = {
    ...(attributes?.style as React.CSSProperties),
    ...responsiveStyles(width, "image", "width", convertNumberToPx),
    ...responsiveStyles(height, "image", "height", convertNumberToPx),
    ...mixinStyles(mixin),
  };
  const rootClassNames = classNames(
    styles.root,
    borderRadius && styles[`root--border-radius-${borderRadius}`],
    className,
    mixinClassNames(mixin)
  );
  const imageClassNames = classNames(
    styles.image,
    styles[`image--content-mode-${contentMode}`],
    status === "error" && !fallbackImageSrc && styles["image--error"],
    !!width && styles["image--fill-width"],
    !!height && styles["image--fill-height"],
    imgClassName
  );
  const showFallback = !imageUrl || status === "error";
  const showSrcFallback =
    showFallback && fallbackImageSrc && fallback === "image";
  React.useEffect(() => {
    handleReset();
  }, [src, asset?.assetName, asset?.setName, handleReset]);

  return (
    <picture {...attributes} className={rootClassNames} style={rootStyle}>
      {showFallback && !showSrcFallback ? (
        <ImageFallback
          fallback={fallback}
          fallbackIcon={fallbackIcon}
          fallbackImage={fallbackImage}
          fallbackImagePadding={fallbackImagePadding}
        />
      ) : (
        <img
          {...imgAttributes}
          ref={imageRef}
          className={imageClassNames}
          src={showSrcFallback ? fallbackImageSrc : imageUrl}
          srcSet={imgAttributes?.srcSet || (imageUrlx2 && `${imageUrlx2} 2x`)}
          alt={alt}
          role={!alt ? "presentation" : undefined}
          loading={priority ? "eager" : "lazy"}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </picture>
  );
};

export default Image;
