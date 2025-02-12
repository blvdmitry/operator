import React from "react";
import env from "@bookingcom/bui-env-react";
import Placeholder from "components/Placeholder";
import DismissibleContainer from "components/DismissibleContainer";
import Scrim from "components/Scrim";

env.test.vrt({
  default: (
    <DismissibleContainer closeAriaLabel="Close" onClose={() => {}}>
      <Placeholder />
    </DismissibleContainer>
  ),
  hideCloseButton: (
    <DismissibleContainer hideClose>
      <Placeholder />
    </DismissibleContainer>
  ),
  fill: (
    <DismissibleContainer closeAriaLabel="Close" fill>
      <Placeholder />
    </DismissibleContainer>
  ),
  buttonTint: (
    <Scrim position="top" backgroundSlot={<Placeholder />}>
      <DismissibleContainer closeAriaLabel="Close" buttonColor="inherit" />
    </Scrim>
  ),
});
