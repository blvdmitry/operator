import React from "react";
import styles from "@bookingcom/bui-core/css/SliderContainer.module.css";
const SliderContainerItem = (props) => {
    const { src, children } = props;
    return (React.createElement("div", { className: styles.content, style: src ? { backgroundImage: `url(${src})` } : undefined }, children));
};
export default SliderContainerItem;
