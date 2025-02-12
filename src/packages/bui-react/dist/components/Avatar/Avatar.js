import React from "react";
import { classNames, responsiveClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import Icon from "../Icon/index.js";
import Image from "../Image/index.js";
import Box from "../Box/index.js";
import styles from "@bookingcom/bui-core/css/Avatar.module.css";
const Avatar = (props) => {
    const { src, countryCode, text, icon, backgroundPosition, backgroundSize, className, attributes, color, outline, ariaLabel, size = "medium", mixin, } = props;
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
        if (!isMounted)
            return;
        setImageNotFound(false);
    }, [src, countryCode]);
    const rootClassName = classNames(styles.root, className, responsiveClassNames(styles, "root--size", size), color && styles[`root--color-${color}`], outline && styles[`root--outline-${outline}`], outline && countryCode
        ? styles["root--border-thin"]
        : styles["root--border-thick"]);
    const iconSize = () => {
        return mapResponsiveProps(size, {
            small: "smaller",
            medium: "small",
            large: "large",
            larger: "larger",
            largest: "largest",
        });
    };
    const renderContent = () => {
        if ((src || countryCode) && !isImageNotFound) {
            const isBackground = !countryCode && (backgroundPosition || backgroundSize);
            if (isBackground) {
                return (React.createElement("span", { className: styles.imageWrapper, "aria-label": ariaLabel, role: ariaLabel ? "img" : undefined, style: {
                        backgroundImage: `url(${src})`,
                        backgroundPosition,
                        backgroundSize,
                    } }));
            }
            return (React.createElement(Image, { className: styles.imageWrapper, imgClassName: styles.image, src: src, asset: countryCode && {
                    setName: "images-flags",
                    assetName: (countryCode.charAt(0).toUpperCase() +
                        countryCode.slice(1)),
                }, alt: ariaLabel || "", onError: () => setImageNotFound(true) }));
        }
        if (icon)
            return (React.createElement(Icon, { svg: icon, attributes: { role: "img", "aria-label": ariaLabel }, size: iconSize() }));
        if (text)
            return React.createElement("span", { "aria-label": ariaLabel }, text);
        return null;
    };
    return (React.createElement(Box, { padding: 0, attributes: attributes, className: rootClassName, borderRadius: "circle", overflow: "hidden", mixin: mixin }, renderContent()));
};
export default Avatar;
