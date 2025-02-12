import React from "react";
import env from "@bookingcom/bui-env-react";
import Print from "components/Print";

env.test.vrt({
  default: <Print>This content is hidden visually</Print>,
  hidden: (
    <Print hidden>This content is hidden visible and hidden from print</Print>
  ),
  renderProps: (
    <Print>
      {({ className }) => (
        <div className={className}>
          This content is visible in print, render props
        </div>
      )}
    </Print>
  ),
});
