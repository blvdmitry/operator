import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { getTabsTransforms } from "@bookingcom/bui-core/utilities/rendering";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import Text from "../Text/index.js";
import useId from "../../hooks/useId.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import styles from "@bookingcom/bui-core/css/SegmentedControl.module.css";
const SegmentedControlControlled = (props) => {
    const { id, name, options, className, attributes, onChange, value, label, fillEqually, mixin, } = props;
    const controlId = useId(id);
    const prevValueRef = React.useRef(value);
    const navRef = React.useRef(null);
    const listAttributes = label ? { "aria-labelledby": controlId } : {};
    const [animated, setAnimated] = React.useState(false);
    const [navStyle, setNavStyle] = React.useState({});
    const buttonRefs = React.useRef([]);
    const rootClassName = classNames(styles.root, className, fillEqually && styles[`root--fill-equally`], animated && styles["root--animated"], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const activeIndex = options.findIndex((option) => option.value === value);
    const resizeObserver = React.useRef(null);
    const handleChange = (e) => {
        if (onChange)
            onChange({ name, value: e.target.value });
    };
    const getButtonRef = (el, index) => {
        if (el)
            buttonRefs.current[index] = el;
    };
    const handleTransitionEnd = (event) => {
        if (event.propertyName === "transform" && event.target === navRef.current) {
            setAnimated(false);
        }
    };
    const updateStyle = React.useCallback(() => {
        /**
         * offsetHeight=0 means that a component is located in a node that is hidden
         * with display: none or hidden attribute, e.g. in Accordion content
         * For that case exit before setting animated state.
         */
        if (navRef.current?.offsetHeight === 0)
            return;
        const activeButton = buttonRefs.current?.[activeIndex];
        const style = getTabsTransforms(activeButton);
        const prevValue = prevValueRef.current;
        prevValueRef.current = value;
        if (value !== prevValue && prevValue) {
            setAnimated(true);
        }
        nextFrame(() => {
            setNavStyle({ width: style.width, left: style.left });
        });
    }, [activeIndex, value]);
    // Observe nav element when it appears from a hidden state
    // and update style when it happens
    React.useEffect(() => {
        const element = navRef?.current;
        if (!element)
            return;
        resizeObserver.current = new ResizeObserver(updateStyle);
        resizeObserver.current.observe(element);
        return () => {
            // Cleanup the observer by unobserving all elements
            resizeObserver.current?.disconnect();
            resizeObserver.current = null;
        };
    }, [updateStyle]);
    useIsomorphicLayoutEffect(updateStyle, [updateStyle]);
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        label && (React.createElement("label", { id: controlId, className: styles.label }, label)),
        React.createElement("span", { ref: navRef, className: styles.list, style: {
                "--bui-segmented-control-active-scale-x": navStyle.width,
                "--bui-segmented-control-active-transform-x": navStyle.left,
            }, onTransitionEnd: handleTransitionEnd, ...listAttributes }, options.map((option, index) => {
            const id = `${controlId}-${option.value}`;
            return (React.createElement(React.Fragment, { key: option.value },
                React.createElement("input", { id: id, className: styles.trigger, type: "radio", name: name, value: option.value, checked: option.value === value, onChange: handleChange }),
                React.createElement(Text, { tagName: "label", className: styles.button, variant: "body_2", attributes: {
                        htmlFor: id,
                        ref: (el) => getButtonRef(el, index),
                    } }, option.text)));
        }))));
};
export default SegmentedControlControlled;
