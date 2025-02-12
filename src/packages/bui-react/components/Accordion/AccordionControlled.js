import React from "react";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import ArrowNavDownIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavDownIcon";
import useId from "../../hooks/useId.js";
import Icon from "../Icon/index.js";
import usePrevious from "../../hooks/usePrevious.js";
import styles from "@bookingcom/bui-core/css/Accordion.module.css";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
const AccordionControlled = (props) => {
    const { active = false, titleContent, children, id: passedId, className, attributes, onOpen, onClose, mixin, } = props;
    const rootClassNames = classNames(active && styles["root--active"], !children && styles["root--static"], mixinClassNames(mixin), className);
    const [collapserStyleHeight, setCollapserStyleHeight] = React.useState(active ? "auto" : "");
    const [animationState, setAnimationState] = React.useState(active ? "opened" : "closed");
    const previousActive = usePrevious(active);
    const collapserRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const id = useId(passedId);
    const labelId = children ? id : undefined;
    const panelId = useId();
    const handleClick = () => {
        if (!children)
            return;
        if (active && onClose)
            onClose();
        if (!active && onOpen)
            onOpen();
    };
    const onTransitionEnd = () => {
        setAnimationState(active ? "opened" : "closed");
    };
    useIsomorphicLayoutEffect(() => {
        if (active === previousActive)
            return;
        setAnimationState(active ? "pre-opening" : "pre-closing");
    }, [active, previousActive]);
    useIsomorphicLayoutEffect(() => {
        const contentEl = contentRef.current;
        if (!contentEl)
            return;
        nextFrame(() => {
            if (animationState === "pre-opening") {
                // We don't relay on opening state anywhere,
                // it's here for overall alingment with other states of animations
                setAnimationState("opening");
                setCollapserStyleHeight(`${contentEl.getBoundingClientRect().height}px`);
            }
            else if (animationState === "pre-closing") {
                setAnimationState("closing");
                setCollapserStyleHeight(`${contentEl.getBoundingClientRect().height}px`);
            }
            else if (animationState === "closing") {
                setCollapserStyleHeight("");
            }
        });
    }, [animationState]);
    return (React.createElement("div", { className: rootClassNames, style: mixinStyles(mixin) },
        titleContent && (React.createElement("button", { ...attributes, className: styles.button, onClick: handleClick, type: "button", "aria-expanded": active, "aria-controls": panelId, id: labelId },
            React.createElement("span", { className: styles.label }, titleContent),
            React.createElement(Icon, { svg: ArrowNavDownIcon, className: styles.icon, size: "large", color: "neutral_alt" }))),
        children && (React.createElement("div", { ref: collapserRef, className: styles.collapser, style: {
                height: animationState === "opened" ? "auto" : collapserStyleHeight,
                overflow: animationState === "opened" ? "initial" : "hidden",
            }, onTransitionEnd: onTransitionEnd },
            React.createElement("div", { ref: contentRef, "aria-labelledby": labelId, role: "region", className: styles.content, hidden: animationState === "closed", id: panelId }, children)))));
};
export default AccordionControlled;
