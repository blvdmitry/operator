import React from "react";
import { mixinClassNames } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
const Placeholder = (props) => {
    const style = {
        height: !props.children ? props.height || 100 : "auto",
        width: props.width,
        border: "var(--bui_border_width_200) dashed var(--bui_color_border)",
        backgroundColor: "var(--bui_color_background_alt)",
        boxSizing: "border-box",
        ...mixinStyles(props.mixin),
    };
    return (React.createElement("div", { className: mixinClassNames(props.mixin), style: style }, props.children));
};
export default Placeholder;
