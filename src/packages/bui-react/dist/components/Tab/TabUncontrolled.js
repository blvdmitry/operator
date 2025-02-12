import React from "react";
import TabControlled from "./TabControlled.js";
const TabUncontrolled = (props) => {
    const { defaultActiveTabId, onTabChange } = props;
    const [activeTabId, setActiveTabId] = React.useState(defaultActiveTabId);
    const handleTabChange = (id) => {
        // The onTabChange callback gets suppressed in the case when there is no activeTabId provided by default
        let silent = false;
        if (!activeTabId)
            silent = true;
        setActiveTabId(id);
        if (onTabChange && !silent)
            onTabChange(id);
    };
    return (React.createElement(TabControlled, { ...props, activeTabId: activeTabId, defaultActiveTabId: undefined, onTabChange: handleTabChange }));
};
export default TabUncontrolled;
