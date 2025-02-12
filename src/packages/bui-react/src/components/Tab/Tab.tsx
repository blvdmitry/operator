import React from "react";
import TabControlled from "./TabControlled";
import TabTriggerList from "./TabTriggerList";
import TabTrigger from "./TabTrigger";
import TabPanel from "./TabPanel";
import TabUncontrolled from "./TabUncontrolled";
import type * as T from "./Tab.types";

const Tab = (props: T.Props) => {
  const { activeTabId } = props;

  if (activeTabId !== undefined)
    return <TabControlled {...(props as T.ControlledProps)} />;
  return <TabUncontrolled {...(props as T.UncontrolledProps)} />;
};

Tab.Trigger = TabTrigger;
Tab.TriggerList = TabTriggerList;
Tab.Panel = TabPanel;
export default Tab;
