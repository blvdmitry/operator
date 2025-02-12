import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { useFlyoutContext } from "./Flyout.context.js";
import styles from "@bookingcom/bui-core/css/_base/Flyout.module.css";
const FlyoutArrow = (props) => {
    const { flyout, flyoutArrowElRef } = useFlyoutContext();
    const { position } = flyout;
    const { className, offset, size, background, shadow } = props;
    const arrowClassName = classNames(styles.arrow, position && styles[`arrow--position-${position}`], className);
    const arrowStyles = {
        "--bui-flyout-arrow-offset": `var(--bui_spacing_${offset}x)`,
        "--bui-flyout-arrow-size": `${size}px`,
        "--bui-flyout-arrow-background": `var(--bui_color_background_${background})`,
        ...(shadow
            ? {
                "--bui-flyout-arrow-shadow": `var(--bui_shadow_${shadow})`,
            }
            : {}),
    };
    return (React.createElement("span", { className: arrowClassName, style: arrowStyles },
        React.createElement("span", { ref: flyoutArrowElRef }),
        React.createElement("span", null)));
};
export default FlyoutArrow;
