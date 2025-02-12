import env from "@bookingcom/bui-env-react";
import { InboxIcon } from "@bookingcom/bui-assets-react/streamline";
import Timeline from "components/Timeline";
import Placeholder from "components/Placeholder";
import React from "react";

env.test.vrt({
  default: (
    <Timeline>
      <Placeholder />
      <Timeline.Item>
        <Placeholder />
      </Timeline.Item>
    </Timeline>
  ),
  marker: (
    <Timeline>
      <Timeline.Item marker={InboxIcon}>
        <Placeholder />
      </Timeline.Item>
      <Timeline.Item>
        <Placeholder />
      </Timeline.Item>
    </Timeline>
  ),
  markerColor: (
    <Timeline>
      <Timeline.Item marker={InboxIcon} markerColor="constructive">
        <Placeholder />
      </Timeline.Item>
      <Timeline.Item markerColor="constructive">
        <Placeholder />
      </Timeline.Item>
    </Timeline>
  ),
  lineVariant: (
    <Timeline>
      <Timeline.Item marker={InboxIcon} lineVariant="dashed">
        <Placeholder />
      </Timeline.Item>
      <Timeline.Item>
        <Placeholder />
      </Timeline.Item>
    </Timeline>
  ),
});
