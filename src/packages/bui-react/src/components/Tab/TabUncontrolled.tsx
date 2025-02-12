import React from "react";
import TabControlled from "./TabControlled";
import type * as T from "./Tab.types";

const TabUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultActiveTabId, onTabChange } = props;
  const [activeTabId, setActiveTabId] = React.useState(defaultActiveTabId);

  const handleTabChange: T.Props["onTabChange"] = (id) => {
    // The onTabChange callback gets suppressed in the case when there is no activeTabId provided by default
    let silent = false;
    if (!activeTabId) silent = true;
    setActiveTabId(id);
    if (onTabChange && !silent) onTabChange(id);
  };

  return (
    <TabControlled
      {...props}
      activeTabId={activeTabId}
      defaultActiveTabId={undefined}
      onTabChange={handleTabChange}
    />
  );
};

export default TabUncontrolled;
