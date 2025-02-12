import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Button from "../Button/index.js";
import Stack from "../Stack/index.js";
import Slider, { SliderControlType, } from "../_base/Slider/index.js";
import styles from "@bookingcom/bui-core/css/Carousel.module.css";
const PrivateCarouselItem = (props) => {
    const { children, className, attributes, index } = props;
    const itemClassNames = classNames(styles.item, className);
    return (React.createElement(Slider.Item, { className: itemClassNames, key: index, index: index, realIndex: index, attributes: {
            role: "group",
            ...attributes,
        } }, children));
};
// This is a public component developers will use which we then replace with a private one and extending the passed props
const CarouselItem = (_) => null;
const CarouselBase = (props, ref) => {
    const { title, action, children, size, onAfterNavigate, attributes, className, ariaLabel, previousButtonAriaLabel, nextButtonAriaLabel, topNavigationOffset, mixin, } = props;
    const rootClassName = classNames(styles.root, className, size && styles[`root--size-${size}`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const renderHeader = () => {
        return (React.createElement("div", { className: styles.header },
            React.createElement(Stack, { direction: "row", alignItems: "end" },
                React.createElement(Stack.Item, { grow: true }, title),
                action && (React.createElement(Stack.Item, null,
                    React.createElement(Button.Aligner, { alignment: ["bottom", "end"] },
                        React.createElement(Button, { ...action, variant: "tertiary" })))))));
    };
    const hasChildren = React.Children.count(React.Children.toArray(children)) > 0;
    return (React.createElement(React.Fragment, null,
        title && renderHeader(),
        hasChildren && (React.createElement(Slider, { ref: ref },
            React.createElement("div", { ...rootAttributes, className: rootClassName },
                React.createElement(Slider.Container, { className: styles.inner, ariaLabel: ariaLabel, onAfterNavigate: onAfterNavigate }, React.Children.map(children, (child, index) => {
                    if (!child)
                        return null;
                    if (child.type === CarouselItem) {
                        return React.createElement(PrivateCarouselItem, { index: index, ...child.props });
                    }
                    return (React.createElement(PrivateCarouselItem, { key: child.key || index, index: index }, child));
                })),
                React.createElement("div", { className: styles.nav, style: { top: topNavigationOffset } },
                    React.createElement(Slider.Control, { className: styles.control, type: SliderControlType.previous, attributes: {
                            "aria-label": previousButtonAriaLabel,
                            "aria-hidden": true,
                        } }),
                    React.createElement(Slider.Control, { className: styles.control, type: SliderControlType.next, attributes: {
                            "aria-label": nextButtonAriaLabel,
                            "aria-hidden": true,
                        } })))))));
};
const Carousel = React.forwardRef(CarouselBase);
Carousel.Item = CarouselItem;
export default Carousel;
