import env from "@bookingcom/bui-env-react";
import BubbleContainer from "components/BubbleContainer";
import Placeholder from "components/Placeholder";
import React from "react";

env.test.vrt({
  empty: (
    <BubbleContainer value="">
      <Placeholder width="24px" height="24px" />
    </BubbleContainer>
  ),
  withValue: (
    <BubbleContainer value="18">
      <Placeholder width="24px" height="24px" />
    </BubbleContainer>
  ),
});
