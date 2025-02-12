import React from "react";
import mixinClassNames from "utilities/mixinClassNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import type * as T from "./Placeholder.types";

const Placeholder = (props: T.Props) => {
  const style: any = {
    height: !props.children ? props.height || 100 : "auto",
    width: props.width,
    border: "var(--bui_border_width_200) dashed var(--bui_color_border)",
    backgroundColor: "var(--bui_color_background_alt)",
    boxSizing: "border-box",
    ...mixinStyles(props.mixin),
  };

  return (
    <div className={mixinClassNames(props.mixin)} style={style}>
      {props.children}
    </div>
  );
};

export default Placeholder;
