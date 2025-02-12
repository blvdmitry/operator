import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box, {} from "../Box/index.js";
import AspectRatio from "../AspectRatio/index.js";
import Text from "../Text/index.js";
import Stack from "../Stack/index.js";
import DismissibleContainer from "../DismissibleContainer/index.js";
import Scrim from "../Scrim/index.js";
import Button from "../Button/index.js";
import Icon from "../Icon/index.js";
import Image from "../Image/index.js";
import useId from "../../hooks/useId.js";
import styles from "@bookingcom/bui-core/css/Banner.module.css";
const colorMap = {
    neutral: {
        borderColor: "neutral_alt",
        backgroundColor: "elevation_one",
    },
    hint: {
        borderColor: "neutral",
        backgroundColor: "neutral_alt",
    },
    callout: {
        borderColor: "callout",
        backgroundColor: "callout_alt",
    },
    highlighted: {
        borderColor: "action",
        backgroundColor: "action_alt",
    },
};
const Banner = (props) => {
    const { title, text, titleTagName = "h3", actions, startIcon, startIconColor, variant = "neutral", bleed, children, dismissible = true, onClose, closeAriaLabel, startImage, topImage, className, attributes, mixin, } = props;
    const rootClassName = classNames(className, bleed !== undefined && globalStyles[`bleed--${bleed}`]);
    const tagName = variant === "callout" ? "aside" : "section";
    const isMedia = topImage;
    const colorSet = variant ? colorMap[variant] : colorMap.neutral;
    const titleId = useId();
    const boxAttributes = {
        ...attributes,
        ...(title ? { "aria-labelledby": titleId } : {}),
    };
    const dismissibleProps = {
        closeAriaLabel,
        hideClose: !dismissible,
        onClose,
        buttonColor: isMedia ? "inherit" : undefined,
    };
    const renderTopImage = (img) => {
        return (React.createElement(AspectRatio, { ratio: "16:9" },
            React.createElement(Image, { src: img.src, alt: img.alt, contentMode: img.contentMode })));
    };
    const renderDismissibleTopImage = (img) => {
        return (React.createElement(Scrim, { backgroundSlot: renderTopImage(img), position: "top" },
            React.createElement(DismissibleContainer, { ...dismissibleProps })));
    };
    const renderStartImage = (img) => {
        return (React.createElement(AspectRatio, { className: styles.imageContainer },
            React.createElement(Image, { borderRadius: 100, src: img.src, alt: img.alt, contentMode: img.contentMode })));
    };
    const renderStartIcon = (icon) => {
        const iconClassNames = classNames(styles.icon, !title && !!text && styles["icon--no-title"]);
        return (React.createElement("span", { className: iconClassNames },
            React.createElement(Icon, { svg: icon, size: "medium", color: startIconColor, scale: true })));
    };
    const renderTitleTextAndActions = () => {
        const titleSlot = title && (React.createElement(Text, { variant: "strong_1", key: "title", attributes: { id: titleId }, tagName: titleTagName, className: styles.title }, title));
        const textSlot = (text || children) && (React.createElement(React.Fragment, { key: "text" },
            text && (React.createElement(Text, { tagName: "p", variant: "body_2", className: styles.text }, text)),
            children && React.createElement(Text, null, children)));
        return (React.createElement(Stack, { gap: 2 },
            isMedia
                ? [titleSlot, textSlot]
                : [
                    // @ts-ignore
                    React.createElement(DismissibleContainer, { ...dismissibleProps, key: "dismissible-container" }, titleSlot || textSlot),
                    titleSlot && textSlot,
                ],
            actions && (React.createElement(Stack, { direction: "row", gap: 3 }, actions.map((action, index) => (React.createElement(Button.Aligner, { alignment: ["start", "bottom"], key: action.text || index },
                React.createElement(Button, { ...action, variant: "tertiary" }))))))));
    };
    const renderBannerContent = () => {
        const titleTextAndActions = renderTitleTextAndActions();
        const renderTopImageLayout = (img) => {
            return (React.createElement(React.Fragment, null,
                dismissible ? renderDismissibleTopImage(img) : renderTopImage(img),
                React.createElement(Box, null, titleTextAndActions)));
        };
        const renderStartImageLayout = (args) => {
            const { image, icon } = args;
            return (React.createElement(Stack, { direction: "row", gap: 4 },
                image ? renderStartImage(image) : undefined,
                !image && icon ? renderStartIcon(icon) : undefined,
                React.createElement(Stack.Item, { grow: true }, titleTextAndActions)));
        };
        if (topImage) {
            return renderTopImageLayout(topImage);
        }
        if (startImage) {
            return renderStartImageLayout({ image: startImage });
        }
        if (startIcon) {
            return renderStartImageLayout({ icon: startIcon });
        }
        return titleTextAndActions;
    };
    return (React.createElement(Box, { tagName: tagName, attributes: boxAttributes, className: rootClassName, borderColor: colorSet.borderColor, backgroundColor: colorSet.backgroundColor, borderRadius: 200, overflow: "hidden", padding: isMedia ? 0 : 4, mixin: mixin }, renderBannerContent()));
};
export default Banner;
