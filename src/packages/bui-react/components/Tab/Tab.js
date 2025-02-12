import React from "react";
import TabControlled from "./TabControlled.js";
import TabTriggerList from "./TabTriggerList.js";
import TabTrigger from "./TabTrigger.js";
import TabPanel from "./TabPanel.js";
import TabUncontrolled from "./TabUncontrolled.js";
const Tab = (props) => {
    const { activeTabId } = props;
    if (activeTabId !== undefined)
        return React.createElement(TabControlled, { ...props });
    return React.createElement(TabUncontrolled, { ...props });
};
Tab.Trigger = TabTrigger;
Tab.TriggerList = TabTriggerList;
Tab.Panel = TabPanel;
export default Tab;
