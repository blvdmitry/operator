import React from "react";
import { KettleIcon } from "@bookingcom/bui-assets-react/streamline";
import env from "@bookingcom/bui-env-react";
import Avatar from "components/Avatar";
import Bubble from "components/Bubble";
import ListItem from "components/ListItem";

env.test.vrt({
  spacing: (
    <>
      <ListItem icon={KettleIcon} spacing="small" onClick={() => {}}>
        Small
      </ListItem>
      <ListItem icon={KettleIcon} onClick={() => {}}>
        Medium
      </ListItem>
      <ListItem icon={KettleIcon} spacing="large" onClick={() => {}}>
        Large
      </ListItem>
    </>
  ),
  active: (
    <>
      <ListItem icon={KettleIcon} spacing="small" active onClick={() => {}}>
        Small
      </ListItem>
      <ListItem icon={KettleIcon} active onClick={() => {}}>
        Medium
      </ListItem>
      <ListItem icon={KettleIcon} spacing="large" active onClick={() => {}}>
        Large
      </ListItem>
    </>
  ),
  disabled: (
    <>
      <ListItem icon={KettleIcon} spacing="small" disabled onClick={() => {}}>
        Small
      </ListItem>
      <ListItem icon={KettleIcon} disabled onClick={() => {}}>
        Medium
      </ListItem>
      <ListItem icon={KettleIcon} spacing="large" disabled onClick={() => {}}>
        Large
      </ListItem>
    </>
  ),
  noRoundedCorners: (
    <>
      <ListItem
        icon={KettleIcon}
        spacing="small"
        roundedCorners={false}
        active
        onClick={() => {}}
      >
        Small
      </ListItem>
      <ListItem
        icon={KettleIcon}
        roundedCorners={false}
        active
        onClick={() => {}}
      >
        Medium
      </ListItem>
      <ListItem
        icon={KettleIcon}
        spacing="large"
        roundedCorners={false}
        active
        onClick={() => {}}
      >
        Large
      </ListItem>
    </>
  ),
  nonInteractive: (
    <>
      <ListItem icon={KettleIcon} spacing="small">
        Small
      </ListItem>
      <ListItem icon={KettleIcon} spacing="medium">
        Medium
      </ListItem>
      <ListItem icon={KettleIcon} spacing="large">
        Large
      </ListItem>
    </>
  ),
  nonInteractiveEdgeSpacing: (
    <>
      <ListItem icon={KettleIcon} spacing="small" edgeSpacing>
        Small
      </ListItem>
      <ListItem icon={KettleIcon} spacing="medium" edgeSpacing>
        Medium
      </ListItem>
      <ListItem icon={KettleIcon} spacing="large" edgeSpacing>
        Large
      </ListItem>
    </>
  ),
  withSlots: {
    component: (
      <ListItem
        startSlot={<Avatar src="/mock.png" />}
        endSlot={<Bubble />}
        onClick={() => {}}
      >
        Your booking for CitizenM London Shoreditch is confirmed
      </ListItem>
    ),
    imageMocks: true,
  },
  overflow: (
    <ListItem endSlot="End">
      LongTextWithoutAnySpacesAddedToTheTextLongTextWithoutAnySpacesAddedToTheText
      Second line
    </ListItem>
  ),
});
