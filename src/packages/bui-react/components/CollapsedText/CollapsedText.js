import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { debounce } from "@bookingcom/bui-core/utilities/helpers";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import Button, {} from "../Button/index.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import styles from "@bookingcom/bui-core/css/CollapsedText.module.css";
const CollapsedText = (props) => {
    const { text, readMoreLabel, readLessLabel, variant = "body_2", visibleLines = 4, className, attributes, mixin, } = props;
    const rootClassName = classNames(className);
    const [textIsCollapsed, setTextIsCollapsed] = React.useState(true);
    const [textIsCollapsable, setTextIsCollapsable] = React.useState(true);
    const textEndRef = React.useRef(null);
    const resizerListenerIsSet = React.useRef(false);
    const textClassName = classNames(styles.text, textIsCollapsed ? styles["text--collapsed"] : null, !textIsCollapsable ? styles["text--non-collapsable"] : null);
    const buttonSize = {
        body_1: "large",
        body_2: "medium",
    }[variant];
    const rootStyle = textIsCollapsed
        ? { "--bui_collapsed_text_visible_lines": visibleLines }
        : {};
    const style = {
        ...rootStyle,
        ...(attributes?.style || {}),
    };
    const updateTextIsCollapsable = () => {
        if (!textEndRef.current?.offsetTop)
            return;
        const textEndOffsetTop = textEndRef.current.offsetTop;
        const lineHeight = parseFloat(window.getComputedStyle(textEndRef.current).lineHeight);
        const isCollapsableThreshold = lineHeight * visibleLines;
        setTextIsCollapsable(textEndOffsetTop > isCollapsableThreshold);
    };
    const onResizeHandler = debounce(updateTextIsCollapsable, 100);
    const setupWindowResize = () => {
        if (resizerListenerIsSet.current)
            return;
        window.addEventListener("resize", onResizeHandler, true);
        resizerListenerIsSet.current = true;
    };
    const removeWindowResize = () => {
        if (!resizerListenerIsSet.current)
            return;
        window.removeEventListener("resize", onResizeHandler);
        resizerListenerIsSet.current = false;
    };
    useIsomorphicLayoutEffect(() => {
        updateTextIsCollapsable();
        setupWindowResize();
        return removeWindowResize;
    }, [text, visibleLines, textIsCollapsed]);
    return (React.createElement(Stack, { direction: "column", alignItems: "start", gap: 0, className: rootClassName, attributes: {
            ...attributes,
            style,
        }, mixin: mixin },
        React.createElement(Text, { variant: variant, className: textClassName },
            text,
            React.createElement("span", { ref: textEndRef })),
        textIsCollapsable && (React.createElement(Button.Aligner, { alignment: ["start", "bottom"] },
            React.createElement(Button, { size: buttonSize, text: textIsCollapsed ? readMoreLabel : readLessLabel, variant: "tertiary", className: styles.button, onClick: () => setTextIsCollapsed(!textIsCollapsed), attributes: {
                    "aria-label": textIsCollapsed ? readLessLabel : readMoreLabel,
                } })))));
};
export default CollapsedText;
