import React from "react";
import env from "@bookingcom/bui-env-react";
import PaginationIndicator from "components/PaginationIndicator";

env.test.vrt({
  primaryShortStart: <PaginationIndicator total={5} />,
  primaryShortMiddle: <PaginationIndicator total={5} activeIndex={2} />,
  primaryShortEnd: <PaginationIndicator total={5} activeIndex={4} />,
  primaryLongStart: <PaginationIndicator total={9} />,
  primaryLongMiddle: <PaginationIndicator total={9} activeIndex={4} />,
  primaryLongEnd: <PaginationIndicator total={9} activeIndex={8} />,
  white: (
    <div style={{ background: "#333", padding: 20 }}>
      <PaginationIndicator variant="white" total={7} activeIndex={3} />
    </div>
  ),
});
