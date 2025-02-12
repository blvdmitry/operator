import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { responsiveStyles, mixinStyles, } from "@bookingcom/bui-core/utilities/styles";
import { getImageAssetUrl } from "@bookingcom/bui-assets-react";
import LandscapeIcon from "@bookingcom/bui-assets-react/streamline/LandscapeIcon";
import useThemeMode from "../../hooks/useThemeMode.js";
import useImageLoadingStatus from "../../hooks/useImageLoadingStatus.js";
import Icon from "../Icon/index.js";
import Stack from "../Stack/index.js";
import styles from "@bookingcom/bui-core/css/Image.module.css";
const ImageFallback = (props) => {
    const { fallback, fallbackIcon, fallbackImage, fallbackImagePadding, fallbackImageBackgroundColor, } = props;
    if (fallback === "icon" && fallbackIcon) {
        return (React.createElement(Stack, { className: styles.fallback, alignItems: "center", justifyContent: "center" },
            React.createElement(Icon, { size: "largest", svg: fallbackIcon, color: "neutral_alt" })));
    }
    if (fallback === "background") {
        return React.createElement("div", { className: styles.fallback });
    }
    if (fallback === "image" && fallbackImage) {
        const fallbackImageClassNames = classNames(styles.fallback, fallbackImagePadding &&
            styles[`fallback-image-padding--${fallbackImagePadding}`], fallbackImageBackgroundColor &&
            styles[`fallback-image-background-color--${fallbackImageBackgroundColor}`]);
        return (React.createElement(Stack, { className: fallbackImageClassNames, alignItems: "center", justifyContent: "center" }, fallbackImage));
    }
    return null;
};
const Image = (props) => {
    const { src, asset, alt, width, height, borderRadius, contentMode = "fill", fallback = null, fallbackImage, fallbackImageSrc, fallbackImagePadding = "large", fallbackImageBackgroundColor = "neutral", fallbackIcon = LandscapeIcon, priority, onError: passedOnError, className, attributes, imgClassName, imgAttributes, mixin, } = props;
    const { mode } = useThemeMode();
    const { status, handleError, handleLoad, handleReset, imageRef } = useImageLoadingStatus({ onError: passedOnError });
    const imageUrl = asset
        ? getImageAssetUrl({ ...asset, dark: mode === "dark" })
        : src;
    const imageUrlx2 = asset && getImageAssetUrl({ ...asset, dark: mode === "dark", density: 2 });
    const rootStyle = {
        ...attributes?.style,
        ...responsiveStyles(width, "image", "width"),
        ...responsiveStyles(height, "image", "height"),
        ...mixinStyles(mixin),
    };
    const rootClassNames = classNames(styles.root, borderRadius && styles[`root--border-radius-${borderRadius}`], className, mixinClassNames(mixin));
    const imageClassNames = classNames(styles.image, styles[`image--content-mode-${contentMode}`], status === "error" && !fallbackImageSrc && styles["image--error"], !!width && styles["image--fill-width"], !!height && styles["image--fill-height"], imgClassName);
    const showFallback = !imageUrl || status === "error";
    const showSrcFallback = showFallback && fallbackImageSrc && fallback === "image";
    React.useEffect(() => {
        handleReset();
    }, [src, asset?.assetName, asset?.setName, handleReset]);
    return (React.createElement("picture", { ...attributes, className: rootClassNames, style: rootStyle }, showFallback && !showSrcFallback ? (React.createElement(ImageFallback, { fallback: fallback, fallbackIcon: fallbackIcon, fallbackImage: fallbackImage, fallbackImagePadding: fallbackImagePadding, fallbackImageBackgroundColor: fallbackImageBackgroundColor })) : (React.createElement("img", { ...imgAttributes, ref: imageRef, className: imageClassNames, src: showSrcFallback ? fallbackImageSrc : imageUrl, srcSet: imgAttributes?.srcSet || (imageUrlx2 && `${imageUrlx2} 2x`), alt: alt, role: !alt ? "presentation" : undefined, loading: priority ? "eager" : "lazy", onError: handleError, onLoad: handleLoad }))));
};
export default Image;
