import React from "react";
import type * as T from "./Tab.types";
declare const Tab: {
    (props: T.Props): React.JSX.Element;
    Trigger: (_: T.Trigger) => null;
    TriggerList: (props: T.TriggerList) => React.JSX.Element;
    Panel: (props: T.Panel) => React.JSX.Element;
};
export default Tab;
