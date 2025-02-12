import React from "react";
import env from "@bookingcom/bui-env-react";
import Hidden from "components/Hidden";

env.test.vrt({
  renderPropsAboveSmall: (
    <Hidden above="small">
      {({ className }) => <div className={className}>Content</div>}
    </Hidden>
  ),
  aboveSmall: <Hidden above="small">Content</Hidden>,
  aboveMedium: <Hidden above="medium">Content</Hidden>,
  aboveLarge: <Hidden above="medium">Content</Hidden>,
  belowMedium: <Hidden below="medium">Content</Hidden>,
  belowLarge: <Hidden below="large">Content</Hidden>,
  belowXLarge: <Hidden below="xlarge">Content</Hidden>,
});
