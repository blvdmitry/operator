import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import Button from "../Button/index.js";
import styles from "@bookingcom/bui-core/css/DismissibleContainer.module.css";
const DismissibleContainer = (props) => {
    const { hideClose, children, fill, onClose, buttonColor, className, attributes, closeAriaLabel, closeClassName, closeAttributes, } = props;
    const rootClassNames = classNames(styles.root, className, fill && styles["root--fill"], hideClose && styles["root--hide-close"]);
    const closeClassNames = classNames(styles.close, closeClassName);
    const handleClose = () => onClose && onClose();
    return (React.createElement("div", { ...attributes, className: rootClassNames },
        !hideClose && (React.createElement(Button.Aligner, { alignment: ["top", "end"], className: closeClassNames },
            React.createElement(Button, { variant: buttonColor === "inherit"
                    ? "tertiary-inherit"
                    : "tertiary-neutral", onClick: handleClose, attributes: { ...closeAttributes, "aria-label": closeAriaLabel }, icon: CloseIcon }))),
        children));
};
export default DismissibleContainer;
